const puppeteer=require('puppeteer-core');const fs=require('fs');
(async()=>{const browser=await puppeteer.launch({executablePath:require('./browser-path.cjs')(),headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
const server=require('http').createServer((req,res)=>{const path=require('path').join(process.cwd(),decodeURIComponent(req.url.split('?')[0]));try{const data=fs.readFileSync(path);res.setHeader('Content-Type',path.endsWith('.js')?'text/javascript':path.endsWith('.css')?'text/css':path.endsWith('.html')?'text/html':'application/octet-stream');res.end(data)}catch{res.writeHead(404);res.end()}});await new Promise(r=>server.listen(8769,'127.0.0.1',r));
const result=[];
for(const fmt of ['landscape','portrait']){
const page=await browser.newPage();await page.setViewport({width:fmt==='portrait'?1080:1920,height:fmt==='portrait'?1920:1080,deviceScaleFactor:1});
page.on('pageerror',e=>console.error(e.message));
for(let i=0;i<12;i++){
await page.goto(`http://127.0.0.1:8769/film/lab-${i}-${fmt}.html`);await page.waitForFunction(()=>window.__film,{polling:100});await page.evaluate(async()=>{await document.fonts.ready;return true});
await page.evaluate(()=>{__film.timeline.pause().seek(1.3);return true});const cdp=await page.createCDPSession();const shot=await cdp.send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});fs.writeFileSync(`qa/components/${fmt}-${i}.png`,Buffer.from(shot.data,"base64"));await cdp.detach();console.log(fmt,i);
const check=await page.evaluate(()=>{const allowed=new Set(__film.facts.copy.map(x=>x.replace(/\s+/g,' ').trim()));return [...document.querySelectorAll('#film .title,#film .label,#brandlock .wordmark,#concept')].filter(n=>n.closest('.scene')?getComputedStyle(n.closest('.scene')).visibility!=='hidden':true).map(n=>{let r=n.getBoundingClientRect(),s=getComputedStyle(n),t=n.textContent.replace(/\s+/g,' ').trim();return {text:t,x:r.x,y:r.y,w:r.width,h:r.height,color:s.color,font:s.fontSize,authorized:allowed.has(t),offscreen:r.x<0||r.y<0||r.right>__film.W||r.bottom>__film.H}})});
result.push({fmt,scene:i,text:check});
}await page.close();}fs.writeFileSync('qa/components/dom.json',JSON.stringify(result,null,2));await browser.close();server.close();})();
