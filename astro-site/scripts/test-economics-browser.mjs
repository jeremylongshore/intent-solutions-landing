import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {chapters,chapterPath} from '../src/data/economics-teaching.mjs';
const base=process.argv[2]||'http://127.0.0.1:49742';
const output=process.env.ECONOMICS_SCREENSHOTS||'/tmp/estate-finance-browser';
mkdirSync(output,{recursive:true});
const browser=await chromium.launch(process.env.ECONOMICS_CHROME?{executablePath:process.env.ECONOMICS_CHROME}:{});
const receipt={routes:[],screenshots:[],checks:[]};
try{
 for(const width of [1440,768,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.route('**/api/forms/**',r=>r.abort());
  for(const id of ['',...chapters.map(c=>c.id)]){
   const path=id?chapterPath(id):'/estate/economics/';
   const response=await page.goto(base+path,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,path);
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1,path);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${path} page overflow at ${width}`);
   const ids=await page.locator('[id]').evaluateAll(els=>els.map(e=>e.id));
   assert.equal(new Set(ids).size,ids.length,`${path} duplicate IDs`);
   assert.equal(await page.locator('.example-note').count(),1);
   for(const svg of await page.locator('.econ-figure:visible svg').all()){
    assert.equal(await svg.getAttribute('role'),'img');
    const labels=(await svg.getAttribute('aria-labelledby')).split(' ');
    for(const id of labels)assert.equal(await page.locator(`[id="${id}"]`).count(),1);
   }
   const select=page.locator('[data-select-case]');
   if(await select.count()){
    for(const value of await select.locator('option').evaluateAll(els=>els.map(e=>e.value))){
     await select.selectOption(value);
     assert.equal(await page.locator('[data-case]:visible').count(),1);
     await page.locator('[data-downside]').check();
     assert.equal(await page.locator('[data-case]:visible [data-mode="downside"]:visible').count(),1);
     await page.locator('[data-downside]').uncheck();
    }
    await page.locator('[data-reset]').click();
   }
   receipt.routes.push({path,width,status:200});
   if((width===1440||width===390)&&['network-economy','project','cash','roles','recurring','customer-value',''].includes(id)){
    const file=`${output}/${id||'index'}-${width}.png`;await page.screenshot({path:file,fullPage:true});receipt.screenshots.push(file);
   }
  }
  assert.deepEqual(errors,[],`Browser errors at ${width}`);
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto(base+chapterPath('customer-value'));
 const adoption=page.locator('[name=adoption]');await adoption.fill('0');await adoption.dispatchEvent('input');
 assert.equal(await page.locator('[data-customer-net]').innerText(),'-$39,400');
 assert.ok((await page.locator('[data-payback]').innerText()).includes('No payback'));
 await page.locator('[data-customer-reset]').click();assert.equal(await adoption.inputValue(),'75');
 await page.locator('[data-present]').click();assert.equal(await page.locator('[data-present]').getAttribute('aria-pressed'),'true');
 await page.locator('h1').click();await page.keyboard.press('ArrowRight');await page.waitForURL('**/opportunities/?present=1');
 await page.goto(base+chapterPath('recurring')+'?case=vendor-operating-costs&downside=1');
 assert.equal(await page.locator('[data-select-case]').inputValue(),'vendor-operating-costs');
 assert.ok(await page.locator('[data-downside]').isChecked());
 const visible=page.locator('[data-case]:visible');await visible.locator('summary:visible').filter({hasText:'full fee and cost ledger'}).click();
 assert.ok((await visible.innerText()).includes('$0.02'));
 await page.goto(base+chapterPath('project'));
 const download=page.waitForEvent('download');await page.locator('[data-svg-download]').first().click();assert.ok((await download).suggestedFilename().endsWith('.svg'));
 await page.locator('[data-expand]').first().click();assert.ok(await page.evaluate(()=>Boolean(document.fullscreenElement)));await page.locator('[data-expand]').first().click();
 await page.setViewportSize({width:390,height:844});
 await page.goto(base+chapterPath('network-economy'));
 await page.locator('[data-expand]').first().click();
 assert.ok(await page.evaluate(()=>Boolean(document.fullscreenElement)));
 assert.ok(await page.locator('figure:fullscreen svg').evaluate(el=>el.getBoundingClientRect().width>=1280));
 assert.ok(await page.locator('figure:fullscreen .figure-scroll').evaluate(el=>el.scrollWidth>el.clientWidth));
 await page.locator('[data-expand]').first().click();
 await page.close();
 const plain=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:1000}});
 await plain.goto(base+chapterPath('contracts'));assert.equal(await plain.locator('[data-case]:visible').count(),3);assert.equal(await plain.locator('[data-mode]:visible').count(),6);
 assert.ok(await plain.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await plain.close();
 receipt.checks=['All chapter routes at four widths','All baseline/downside cases and reset','Unique heading and accessible SVG IDs','Customer zero-adoption and reset','Presentation and keyboard navigation','Shareable scenario state','Fractional vendor unit-rate rendering','SVG download and full-screen controls','No-JavaScript complete examples','No real form submissions'];
 writeFileSync(`${output}/receipt.json`,JSON.stringify(receipt,null,2)+'\n');
 console.log(`PASS: ${receipt.routes.length} route/viewport visits; scenario, input, presentation, download, accessibility and no-JS checks. Receipt: ${output}/receipt.json`);
} finally {await browser.close();}
