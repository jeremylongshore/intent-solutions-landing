/* The opening is one work surface, seen at six different scales. */
(function () {
  'use strict';

  window.buildA = function buildA(ctx) {
    const { P, gsap, el, svg } = ctx;
    const ORANGE = '#f97316';
    const WHITE = '#fafafa';
    const GRAY = '#71717a';
    const DARK = '#18181b';
    const px = n => `${n}px`;

    function box(parent, x, y, w, h, extra) {
      return el('div', {style: Object.assign({position:'absolute', left:px(x), top:px(y), width:px(w), height:px(h)}, extra || {})}, parent);
    }
    function text(parent, value, x, y, w, size, extra, cls) {
      return el('div', {text:value, className:cls || '', style:Object.assign({position:'absolute', left:px(x), top:px(y), width:px(w), fontSize:px(size), lineHeight:'1', fontWeight:600}, extra || {})}, parent);
    }
    function title(parent, value, x, y, w, size) {
      return text(parent, value, x, y, w, size, {whiteSpace:'pre-line', lineHeight:'.98'}, 'title');
    }
    function vector(parent, body, x, y, w, h, viewW, viewH) {
      return svg(`0 0 ${viewW || w} ${viewH || h}`, body, {position:'absolute',left:px(x),top:px(y),width:px(w),height:px(h)}, parent);
    }
    function line(path, color, width, extra) {
      return `<path d="${path}" fill="none" stroke="${color || ORANGE}" stroke-width="${width || 6}" stroke-linecap="round" stroke-linejoin="round" ${extra || ''}/>`;
    }
    function trace(tl, target, at, duration) {
      const length = target.getTotalLength();
      target.style.strokeDasharray = length;
      target.style.strokeDashoffset = length;
      tl.fromTo(target, {strokeDashoffset:length}, {strokeDashoffset:0, duration:duration || .8, ease:'power2.inOut', immediateRender:true}, at);
    }
    function create(id) {
      return {id, node:ctx.scene(id), timeline:gsap.timeline({paused:false})};
    }
    function sustained(tl, node, from, to) {
      tl.fromTo(node, {opacity:from}, {opacity:to, duration:2.5, ease:'sine.inOut', immediateRender:true}, 0);
    }

    function opening() {
      const s = create(0), n = s.node, tl = s.timeline;
      title(n, 'Applied AI\nengineering.', P ? 88 : 120, P ? 1120 : 330, P ? 904 : 1080, P ? 106 : 104);
      const mark = ctx.logo(P ? 390 : 294, n, {position:'absolute',left:px(P ? 345 : 1310),top:px(P ? 535 : 387)});
      const field = vector(n,
        `<circle cx="310" cy="310" r="284" fill="none" stroke="#ffffff0b" stroke-width="2"/>` +
        `<circle cx="310" cy="310" r="240" fill="none" stroke="#ffffff10" stroke-width="2"/>` +
        line('M 8 310 H 89 M 531 310 H 612 M 310 8 V 89 M 310 531 V 612', '#a1a1aa', 2),
        P ? 230 : 1160, P ? 420 : 235, P ? 620 : 600, P ? 620 : 600, 620, 620);
      field.style.zIndex = '-1';
      const hairline = box(n, P ? 91 : 124, P ? 1420 : 687, P ? 645 : 690, 3, {background:'#fafafa30',transformOrigin:'left center'});
      tl.fromTo(mark,{scale:1},{scale:1.035,duration:2.5,ease:'sine.inOut',immediateRender:true},0);
      sustained(tl, field, .4, .78);
      tl.fromTo(hairline,{scaleX:.72},{scaleX:1,duration:2.5,ease:'power1.inOut',immediateRender:true},0);
      return s;
    }

    function usefulTechnology() {
      const s = create(1), n = s.node, tl = s.timeline;
      title(n, P ? 'Build useful\ntechnology.' : 'Build useful technology.', P ? 88 : 120, P ? 300 : 172, P ? 904 : 1700, P ? 103 : 84);
      const graphic = P ? vector(n,
        line('M 140 100 H 345 Q 415 100 415 175 V 260', '#52525b', 5) +
        line('M 690 100 H 485 Q 415 100 415 175', '#52525b', 5) +
        line('M 140 100 H 345 Q 415 100 415 175 V 260', ORANGE, 7, 'class="signal"') +
        line('M 415 420 V 480 Q 415 530 475 530 H 680', '#52525b', 5) +
        line('M 415 420 V 480 Q 415 530 355 530 H 150', '#52525b', 5) +
        line('M 415 420 V 480 Q 415 530 475 530 H 680', ORANGE, 7, 'class="signal"') +
        `<circle cx="140" cy="100" r="34" fill="${ORANGE}"/><circle cx="690" cy="100" r="34" fill="${DARK}" stroke="${GRAY}" stroke-width="4"/>` +
        `<rect class="work-core" x="325" y="260" width="180" height="160" rx="15" fill="${WHITE}"/>` +
        line('M 390 300 L 350 340 L 390 380 M 440 300 L 480 340 L 440 380', '#09090b', 10) +
        `<rect class="result" x="642" y="492" width="76" height="76" rx="5" fill="${ORANGE}"/>` +
        `<rect x="112" y="492" width="76" height="76" rx="5" fill="${DARK}" stroke="${GRAY}" stroke-width="4"/>`,
        125, 635, 830, 640, 830, 640)
        : vector(n,
          line('M 80 80 H 275 Q 330 80 330 140 V 225 H 580', '#52525b', 5) +
          line('M 80 370 H 275 Q 330 370 330 310 V 225', '#52525b', 5) +
          line('M 80 80 H 275 Q 330 80 330 140 V 225 H 580', ORANGE, 7, 'class="signal"') +
          line('M 780 225 H 960 Q 1020 225 1020 155 V 80 H 1270', '#52525b', 5) +
          line('M 780 225 H 960 Q 1020 225 1020 295 V 370 H 1270', '#52525b', 5) +
          line('M 780 225 H 960 Q 1020 225 1020 155 V 80 H 1270', ORANGE, 7, 'class="signal"') +
          `<circle cx="80" cy="80" r="31" fill="${ORANGE}"/><circle cx="80" cy="370" r="31" fill="${DARK}" stroke="${GRAY}" stroke-width="4"/>` +
          `<rect class="work-core" x="580" y="145" width="200" height="160" rx="15" fill="${WHITE}"/>` +
          line('M 650 185 L 610 225 L 650 265 M 710 185 L 750 225 L 710 265', '#09090b', 10) +
          `<rect class="result" x="1232" y="42" width="76" height="76" rx="5" fill="${ORANGE}"/>` +
          `<rect x="1232" y="332" width="76" height="76" rx="5" fill="${DARK}" stroke="${GRAY}" stroke-width="4"/>`,
          285, 350, 1350, 450, 1350, 450);
      text(n, 'Inputs', P ? 168 : 332, P ? 800 : 528, 240, P ? 37 : 35, {color:'#d4d4d8'});
      text(n, 'Work', P ? 640 : 870, P ? 938 : 702, 220, P ? 37 : 35, {color:'#d4d4d8'});
      text(n, 'Result', P ? 704 : 1424, P ? 1208 : 528, 230, P ? 37 : 35, {color:'#d4d4d8'});
      graphic.querySelectorAll('.signal').forEach((path, i) => trace(tl, path, .08+i*.38, .75));
      tl.fromTo(graphic.querySelector('.work-core'),{scale:.72,transformOrigin:'center'},{scale:1,duration:.65,ease:'back.out(1.5)',immediateRender:true},.34);
      tl.fromTo(graphic.querySelector('.result'),{scale:.15,transformOrigin:'center'},{scale:1,duration:.62,ease:'back.out(1.4)',immediateRender:true},.99);
      sustained(tl, graphic, .72, 1);
      return s;
    }

    function defineDone() {
      const s = create(2), n = s.node, tl = s.timeline;
      title(n, P ? 'Define done.' : 'Define\ndone.', P ? 88 : 120, P ? 326 : 260, P ? 904 : 740, P ? 109 : 137);
      const x = P ? 110 : 950, y = P ? 730 : 330, w = P ? 860 : 700, h = P ? 630 : 560;
      const scope = box(n, x+28, y+28, w-56, h-56, {background:'#141416',borderRadius:'12px'});
      const regionW = w-142;
      const ghostA = box(n, x+70, y+75, regionW, 108, {border:'2px solid #71717a',borderRadius:'7px',background:'#202023'});
      const ghostB = box(n, x+70, y+216, regionW, 108, {border:'2px solid #71717a',borderRadius:'7px',background:'#202023'});
      const selected = box(n, x+70, y+357, regionW, 108, {background:ORANGE,borderRadius:'7px',overflow:'hidden',transformOrigin:'center'});
      text(selected, 'Outcome', 36, 34, regionW-72, P ? 42 : 40, {color:'#09090b',fontWeight:700});
      const pattern = vector(n,
        line(`M 0 0 H ${regionW-95} M 0 22 H ${regionW-205}`, '#71717a', 9) +
        line(`M 0 142 H ${regionW-170} M 0 164 H ${regionW-95}`, '#71717a', 9),
        x+110,y+112,regionW-95,186,regionW-95,186);
      const selection = vector(n,
        line('M 15 70 V 15 H 70 M 485 15 H 540 V 70 M 540 340 V 395 H 485 M 70 395 H 15 V 340', WHITE, 5),
        x+51,y+62,w-102,h-120,555,410);
      tl.fromTo([ghostA,ghostB,pattern],{opacity:1},{opacity:.14,duration:.54,ease:'power2.inOut',immediateRender:true},.35);
      tl.fromTo(selected,{y:0,height:108},{y:-140,height:P ? 265 : 235,duration:.8,ease:'power3.inOut',immediateRender:true},.42);
      tl.fromTo(selected.firstElementChild,{y:0},{y:P ? 69 : 56,duration:.8,ease:'power3.inOut',immediateRender:true},.42);
      tl.fromTo(selection,{scale:1.07,opacity:.3},{scale:1,opacity:.85,duration:.7,ease:'power3.out',immediateRender:true},.38);
      sustained(tl, scope, .55, .95);
      return s;
    }

    function evidence() {
      const s = create(3), n = s.node, tl = s.timeline;
      title(n, 'Test the claim.', P ? 88 : 120, P ? 325 : 168, P ? 904 : 1450, P ? 107 : 112);
      const x = P ? 110 : 260, y = P ? 630 : 360, w = P ? 860 : 1400, h = P ? 700 : 530;
      const substrate = box(n,x+12,y+12,w-24,h-24,{background:'#141416',borderRadius:'17px'});
      const regions = [];
      if (P) {
        ['Outcome','Constraints','Evidence'].forEach((label,i) => {
          text(n,label,164,687+i*194,360,i === 1 ? 37 : 42,{color:i === 2 ? WHITE : '#d4d4d8',fontWeight:i===2 ? 700 : 500});
          const row = vector(n,
            i===0 ? line('M 20 90 H 235 M 175 30 L 235 90 L 175 150',WHITE,9) :
            i===1 ? `<rect x="20" y="25" width="230" height="130" rx="5" fill="none" stroke="${GRAY}" stroke-width="4"/><rect class="reveal" x="58" y="50" width="155" height="80" rx="3" fill="none" stroke="${WHITE}" stroke-width="5"/>` :
            line('M 20 30 H 245 M 20 90 H 185 M 20 150 H 245',ORANGE,19,'class="reveal"'),
            615,647+i*194,280,180,280,180);
          regions.push(row);
          if(i<2) box(n,164,837+i*194,748,2,{background:'#ffffff20'});
        });
        text(n,'Labs / Evals',164,1260,400,31,{color:'#a1a1aa',fontWeight:500});
      } else {
        const offsets=[326,765,1191];
        ['Outcome','Constraints','Evidence'].forEach((label,i)=>{
          text(n,label,offsets[i],413,370,i===1 ? 38 : 42,{color:i===2 ? WHITE : '#d4d4d8',fontWeight:i===2 ? 700 : 500});
          const diagram = vector(n,
            i===0 ? line('M 5 125 H 283 M 198 40 L 283 125 L 198 210',WHITE,11) :
            i===1 ? `<rect x="0" y="35" width="285" height="180" rx="5" fill="none" stroke="${GRAY}" stroke-width="4"/><rect class="reveal" x="43" y="76" width="199" height="98" rx="3" fill="none" stroke="${WHITE}" stroke-width="5"/>` :
            line('M 5 48 H 314 M 5 125 H 239 M 5 202 H 314',ORANGE,22,'class="reveal"'),
            offsets[i],494,324,260,324,260);
          regions.push(diagram);
          if(i<2) box(n,offsets[i]+380,415,2,330,{background:'#ffffff20'});
        });
        text(n,'Labs / Evals',326,804,400,31,{color:'#a1a1aa',fontWeight:500});
      }
      regions.forEach((region,i)=>tl.fromTo(region,{y:25,opacity:.18},{y:0,opacity:1,duration:.75,ease:'power3.out',immediateRender:true},.08+i*.22));
      const rule=box(n,P ? 164 : 326,P ? 1230 : 776,P ? 748 : 1260,4,{background:ORANGE,transformOrigin:'left center'});
      tl.fromTo(rule,{scaleX:.015},{scaleX:1,duration:1.1,ease:'power3.inOut',immediateRender:true},.3);
      sustained(tl,substrate,.55,1);
      return s;
    }

    function showWork() {
      const s=create(4), n=s.node, tl=s.timeline;
      title(n,'Show the work.',P ? 88 : 120,P ? 320 : 160,P ? 904 : 1550,P ? 101 : 112);
      const x=P ? 110 : 270,y=P ? 560 : 300,w=P ? 860 : 1380,h=P ? 850 : 640;
      const surface=box(n,x+12,y+12,w-24,h-24,{background:'#141416',borderRadius:'17px',overflow:'hidden'});
      text(n,'Demos',x+52,y+44,300,P ? 35 : 32,{color:'#d4d4d8',fontWeight:500});
      box(n,x+52,y+103,w-104,2,{background:'#ffffff22'});
      let image;
      if(P){
        image=vector(n,
          line('M 425 55 V 183 M 425 403 V 540', '#52525b',6) +
          line('M 425 55 V 183 M 425 403 V 540',ORANGE,7,'class="route"') +
          `<path d="M 390 30 L 425 65 L 460 30" fill="none" stroke="${WHITE}" stroke-width="8"/>` +
          `<rect class="aperture" x="105" y="183" width="640" height="220" rx="11" fill="#222225"/>` +
          line('M 316 221 L 243 293 L 316 365 M 534 221 L 607 293 L 534 365 M 457 214 L 393 372',WHITE,15) +
          `<rect class="output" x="232" y="540" width="385" height="24" rx="3" fill="${ORANGE}"/><rect class="output" x="232" y="590" width="285" height="24" rx="3" fill="${ORANGE}"/>`,
          115,710,850,640,850,640);
      }else{
        image=vector(n,
          line('M 40 220 H 325 M 855 220 H 1170','#52525b',6) +
          line('M 40 220 H 325 M 855 220 H 1170',ORANGE,7,'class="route"') +
          `<path d="M 62 183 L 99 220 L 62 257" fill="none" stroke="${WHITE}" stroke-width="8"/>` +
          `<rect class="aperture" x="325" y="65" width="530" height="310" rx="11" fill="#222225"/>` +
          line('M 470 119 L 370 220 L 470 321 M 710 119 L 810 220 L 710 321 M 635 104 L 545 336',WHITE,16) +
          `<rect class="output" x="1095" y="135" width="30" height="170" rx="3" fill="${ORANGE}"/><rect class="output" x="1155" y="135" width="30" height="128" rx="3" fill="${ORANGE}"/><rect class="output" x="1215" y="135" width="30" height="170" rx="3" fill="${ORANGE}"/>`,
          325,442,1265,425,1265,425);
      }
      const aperture=image.querySelector('.aperture');
      tl.fromTo(aperture,{scaleX:.03,transformOrigin:'center'},{scaleX:1,duration:.8,ease:'power3.inOut',immediateRender:true},.05);
      image.querySelectorAll('.route').forEach(path=>trace(tl,path,.28,.85));
      tl.fromTo(image.querySelectorAll('.output'),{opacity:.18,y:20},{opacity:1,y:0,duration:.7,stagger:.08,ease:'power3.out',immediateRender:true},.65);
      sustained(tl,surface,.7,1);
      return s;
    }

    function shareMethod() {
      const s=create(5),n=s.node,tl=s.timeline;
      title(n,'Share the\nmethod.',P ? 88 : 112,P ? 292 : 220,P ? 904 : 535,P ? 106 : 88);
      const x=P ? 110 : 650,y=P ? 610 : 290,w=P ? 860 : 1030,h=P ? 750 : 650;
      const surface=box(n,x+12,y+12,w-24,h-24,{background:'#141416',borderRadius:'17px'});
      text(n,'Learn',x+48,y+42,250,P ? 36 : 32,{color:'#d4d4d8',fontWeight:500});
      const diagram=vector(n,
        line('M 190 145 C 190 65 560 65 605 245 C 650 440 360 537 190 397 C 127 346 115 234 190 145','#52525b',7) +
        line('M 190 145 C 190 65 560 65 605 245 C 650 440 360 537 190 397 C 127 346 115 234 190 145',ORANGE,8,'class="loop"') +
        `<path d="M 556 227 L 609 259 L 636 204" fill="none" stroke="${ORANGE}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>` +
        `<circle class="anchor" cx="190" cy="145" r="29" fill="${WHITE}"/><circle class="anchor" cx="607" cy="263" r="29" fill="${WHITE}"/><circle class="anchor" cx="238" cy="428" r="29" fill="${ORANGE}"/>` +
        line('M 355 214 V 334 M 295 274 H 415','#52525b',5),
        P ? 133 : 747,P ? 735 : 377,P ? 790 : 830,P ? 550 : 480,760,520);
      text(n,'Define',P ? 166 : 778,P ? 758 : 406,240,P ? 43 : 40,{fontWeight:600});
      text(n,'Test',P ? 744 : 1449,P ? 1150 : 700,180,P ? 43 : 40,{fontWeight:600});
      text(n,'Evidence',P ? 307 : 955,P ? 1281 : 868,350,P ? 43 : 40,{fontWeight:600});
      trace(tl,diagram.querySelector('.loop'),.05,1.4);
      tl.fromTo(diagram.querySelectorAll('.anchor'),{scale:.25,transformOrigin:'center'},{scale:1,duration:.65,stagger:.24,ease:'back.out(1.3)',immediateRender:true},.08);
      sustained(tl,surface,.65,1);
      return s;
    }

    return [opening(),usefulTechnology(),defineDone(),evidence(),showWork(),shareMethod()];
  };
})();
