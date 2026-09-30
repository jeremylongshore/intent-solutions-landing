(async()=>{
 const P=document.documentElement.dataset.format==='portrait',W=P?1080:1920,H=P?1920:1080;
 const stage=document.getElementById('film'),selected=document.documentElement.dataset.scene;
 const el=(tag,a={},parent=stage)=>{const n=document.createElement(tag);for(const[k,v]of Object.entries(a)){if(k==='style'){for(const[s,x]of Object.entries(v))n.style[s]=typeof x==='number'&&!['opacity','zIndex','fontWeight','lineHeight','flex','order'].includes(s)?x+'px':x;}else if(k==='text')n.textContent=v;else if(k==='className')n.className=v;else if(k==='innerHTML')n.innerHTML=v;else n.setAttribute(k,v);}parent.appendChild(n);return n;};
 const svg=(viewBox,inner,style={},parent=stage)=>{const n=document.createElementNS('http://www.w3.org/2000/svg','svg');n.setAttribute('viewBox',viewBox);n.innerHTML=inner;for(const[k,v]of Object.entries(style))n.style[k]=typeof v==='number'&&!['opacity','zIndex'].includes(k)?v+'px':v;parent.appendChild(n);return n;};
 const logo=(size,parent=stage,style={})=>svg('0 0 64 64','<g fill="none" stroke="#f97316" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16h36v36M14 48 50 16M10 34h22"/></g><g fill="#f97316"><circle cx="14" cy="16" r="5"/><circle cx="10" cy="34" r="5"/><circle cx="14" cy="48" r="5"/></g>',{width:size,height:size,...style},parent);
 const raw=P?[[230,420,620,620],[110,580,860,700],[110,730,860,630],[110,630,860,700],[110,560,860,850],[110,610,860,750],[110,620,860,720],[190,660,700,700],[90,430,900,1050],[290,780,500,300],[230,610,620,620],[430,380,220,220]]:[[1240,320,430,430],[230,350,1460,450],[950,330,700,560],[260,360,1400,530],[270,300,1380,640],[650,290,1030,650],[230,330,1460,570],[680,260,850,680],[110,170,1700,780],[740,400,440,300],[690,240,550,550],[200,320,220,220]];
 const frame=raw.map(([x,y,w,h])=>({x,y,w,h}));
 stage.style.width=W+'px';stage.style.height=H+'px';stage.classList.toggle('portrait',P);
 const facts=window.INTENT_FACTS;
 await document.fonts.ready;
 const background=el('div',{id:'background'});
 const thread=svg(`0 0 ${W} ${H}`,`<path id="rail" d="M -100 ${H*.7} C ${W*.2} ${H*.7},${W*.25} ${H*.4},${W*.5} ${H*.4} S ${W*.7} ${H*.8},${W+100} ${H*.25}" fill="none" stroke="#f97316" stroke-opacity=".14" stroke-width="3"/><path id="pulse" d="M -100 ${H*.7} C ${W*.2} ${H*.7},${W*.25} ${H*.4},${W*.5} ${H*.4} S ${W*.7} ${H*.8},${W+100} ${H*.25}" fill="none" stroke="#f97316" stroke-opacity=".38" stroke-width="6" stroke-dasharray="180 2700"/>`,{position:'absolute',width:W,height:H,zIndex:0});
 const scene=id=>el('section',{className:'scene',id:'scene-'+id,'data-scene':String(id)});
 const ctx={W,H,P,gsap,stage,el,svg,logo,frame,facts,copy:facts.copy,scene,animate:(...args)=>gsap.fromTo(...args)};
 const scenes=[...window.buildA(ctx),...window.buildB(ctx)].sort((a,b)=>a.id-b.id);
 for(const s of scenes){s.copyLayers=[];for(const n of [...s.node.querySelectorAll('*')]){if(n.closest('.title')||![...n.childNodes].some(c=>c.nodeType===3&&c.textContent.trim()))continue;const layer=el('div',{className:'copy-layer',style:{position:'absolute',inset:0}},n.parentElement);layer.appendChild(n);s.copyLayers.push(layer);}}
 const actor=el('div',{id:'actor'});
 const artifact=el('div',{className:'artifact'});
 svg('0 0 300 180','<path d="M15 25H285M15 90H225M15 155H285" fill="none" stroke="#f97316" stroke-width="25" stroke-linecap="round"/>',{width:'100%',height:'100%'},artifact);
 const artifactPoses=P?[[665,1100,185,112],[347,1250,385,102],[445,968,150,90],[645,873,190,114],[443,950,160,96]]:[[1190,535,324,190],[1420,590,190,114],[1100,590,135,81],[790,565,195,115],[1035,537,140,84]];
 // Same evidence artifact survives scene changes instead of being recreated.
 document.querySelectorAll('#scene-3 svg .reveal,#scene-4 svg .output').forEach(n=>n.style.visibility='hidden');
 const signature=logo(P?115:106,stage,{position:'absolute',zIndex:20});
 const signaturePoses=P?[[483,818,115],[294,674,492],[459,409,162]]:[[907,430,106],[750,300,430],[229,349,162]];
 document.querySelectorAll('#scene-9 .content>svg,#scene-10>svg:first-child,#scene-11>svg:first-child').forEach(n=>n.style.visibility='hidden');
 const mergeMark=svg(`0 0 ${W} ${H}`,'<path/><path/><path/><circle/><circle/><circle/>',{position:'absolute',inset:0,width:W,height:H,zIndex:21,opacity:0});
 const startBranches=P?[[288,696,540,932,793,696],[281,1200,540,932],[540,1421,540,932]]:[[400,446,960,550,1455,446],[400,761,960,550],[969,856,960,550]];
 const [mx,my,ms]=signaturePoses[1];const targetBranches=[[14,16,50,16,50,52],[10,34,32,34],[14,48,50,16]].map(a=>a.map((n,i)=>(i%2?my:mx)+n*ms/64));
 const pathD=a=>a.reduce((d,n,i)=>d+(i%2?' '+n:(i===0?'M':' L')+n),'');
 [...mergeMark.querySelectorAll('path')].forEach((n,i)=>{n.setAttribute('d',pathD(startBranches[i]));n.setAttribute('fill','none');n.setAttribute('stroke','#f97316');n.setAttribute('stroke-width','5');n.setAttribute('stroke-linecap','round');n.setAttribute('stroke-linejoin','round')});
 [...mergeMark.querySelectorAll('circle')].forEach((n,i)=>{n.setAttribute('cx',startBranches[i][0]);n.setAttribute('cy',startBranches[i][1]);n.setAttribute('r','5');n.setAttribute('fill','#f97316')});
 const lock=el('div'  ,{id:'brandlock',style:{left:P?88:100,top:P?190:65}});logo(43,lock);el('span',{className:'wordmark',text:'Intent Solutions'},lock);
 const concept=el('div',{id:'concept',text:'Illustrated workflow',style:{left:P?88:100,top:P?1670:1000}});
 const tl=gsap.timeline({paused:true});const isLab=selected!==undefined;const start=isLab?Number(selected):0;const duration=isLab?2.5:30;
 const applyPose=(i,t)=>{const f=frame[i];tl.set(actor,{left:f.x,top:f.y,width:f.w,height:f.h,opacity:i===11?0:1},t);};
 if(isLab){const sc=scenes.find(s=>s.id===start);for(const s of scenes)if(s!==sc)s.node.remove();tl.set(sc.node,{autoAlpha:1},0);tl.add(sc.timeline,0);applyPose(start,0);tl.to(sc.node,{scale:1.07,x:16,duration,ease:t=>.65*t+.35*(1-Math.cos(Math.PI*t))/2},0);}
 else{
  applyPose(0,0);
  for(const s of scenes){const at=s.id*2.5;tl.set(s.node,{autoAlpha:1},at);tl.add(s.timeline,at);
   tl.fromTo(s.node,{scale:1},{scale:1.07,x:16,duration:2.5,ease:t=>.65*t+.35*(1-Math.cos(Math.PI*t))/2,immediateRender:true},at);
   if(s.id>0)tl.fromTo(s.node.querySelectorAll('.title'),{y:50,opacity:0},{y:0,opacity:1,duration:.25,ease:'power3.out',immediateRender:true},at+.34);
   if(s.id>0)tl.fromTo(s.copyLayers,{opacity:0},{opacity:1,duration:.25,ease:'power3.out',immediateRender:true},at+.34);
   if(s.id<11)tl.to(s.copyLayers,{opacity:0,duration:.12,ease:'power2.in'},at+2.07);
   if(s.id<11)tl.to(s.node.querySelectorAll('.title'),{y:-50,opacity:0,duration:.12,ease:'power2.in'},at+2.07);
   tl.set(s.node,{autoAlpha:0},at+2.5);
   if(s.id>0){const f=frame[s.id];tl.to(actor,{left:f.x,top:f.y,width:f.w,height:f.h,duration:.62,ease:'expo.inOut'},at-.31);}
  }
  tl.set('#scene-11',{autoAlpha:1},29.9999);
  tl.to(actor,{opacity:0,duration:.3,ease:'power2.out'},27.5);
 }
 tl.set(signature,{opacity:0},0);
 if(isLab && start>=9){const [x,y,size]=signaturePoses[start-9];tl.set(signature,{left:x,top:y,width:size,height:size,opacity:1},0);tl.to(signature,{scale:1.04,duration:2.5,ease:'sine.inOut'},0);}
 if(!isLab){const [x,y,size]=signaturePoses[0];tl.set(signature,{left:x,top:y,width:size,height:size,opacity:1,scale:1.8},22.19);tl.to(signature,{scale:1,duration:.62,ease:'power3.out'},22.19);for(let i=1;i<3;i++){const[x,y,size]=signaturePoses[i];tl.to(signature,{left:x,top:y,width:size,height:size,duration:.62,ease:'expo.inOut'},22.5+i*2.5-.31);}tl.to(signature,{scale:1.04,duration:2.2,ease:'sine.inOut'},27.8);}
 if(!isLab){tl.to(signature,{opacity:0,duration:.08,ease:'power2.in'},24.69);tl.to(mergeMark,{opacity:1,duration:.08,ease:'power2.out'},24.69);
 [...mergeMark.querySelectorAll('path')].forEach((n,i)=>tl.to(n,{attr:{d:pathD(targetBranches[i]),'stroke-width':7*ms/64},duration:.62,ease:'power3.inOut'},24.7));
 [...mergeMark.querySelectorAll('circle')].forEach((n,i)=>tl.to(n,{attr:{cx:targetBranches[i][0],cy:targetBranches[i][1],r:5*ms/64},duration:.62,ease:'power3.inOut'},24.7));
 tl.set(signature,{opacity:1},25.32);tl.set(mergeMark,{opacity:0},25.32);}
 tl.set(artifact,{opacity:0},0);
 if(isLab && start>=3 && start<=7){const [x,y,w,h]=artifactPoses[start-3];tl.set(artifact,{left:x,top:y,width:w,height:h,opacity:1},0);tl.to(artifact,{y:-12,duration:2.5,ease:'sine.inOut'},0);}
 if(!isLab){for(let i=0;i<artifactPoses.length;i++){const [x,y,w,h]=artifactPoses[i],at=7.5+i*2.5;if(i===0)tl.set(artifact,{left:x,top:y,width:w,height:h,opacity:1},at);else tl.to(artifact,{left:x,top:y,width:w,height:h,duration:.62,ease:'expo.inOut'},at-.31);}tl.set(artifact.querySelector('svg'),{attr:{preserveAspectRatio:'none'}},19.76);tl.to(artifact,{left:P?134:158,top:P?746:445,width:P?710:1490,height:8,duration:.70,ease:'power3.inOut'},19.76);tl.to(artifact,{opacity:0,duration:.25,ease:'power2.out'},20.55);}
 tl.fromTo(background,{x:0,y:0},{x:50,y:35,duration,ease:'sine.inOut',immediateRender:true},0);
 tl.fromTo('#pulse',{strokeDashoffset:2880},{strokeDashoffset:0,duration,ease:'sine.inOut',immediateRender:true},0);
 tl.set(concept,{opacity:isLab?(start>0&&start<10?1:0):0},0);
 if(!isLab){tl.set(concept,{opacity:1},2.5);tl.set(concept,{opacity:0},25);}
 tl.to({}, {duration:.0001},duration-.0001);
 window.__timelines={film:tl};window.__film={timeline:tl,scenes,frame,P,W,H,facts};tl.pause(0);
 window.__hf=window.__hf||{};window.__hf.buildReady=window.__hf.buildReady||{};window.__hf.buildReady.film=Promise.resolve();
})();
