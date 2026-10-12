/**
 * Deterministic, accessible financial teaching figures. No DOM or network dependencies.
 * Diagram Design: Sankey, waterfall, bar and line grammars; 1280 × 720 slide preset.
 * Intent skin: locally available Syne/Inter/Geist Mono, with system fallbacks.
 * Values are caller-supplied educational assumptions, never prices or private arrangements.
 * All dollar arithmetic is performed in integer cents; chart geometry uses a shared scale.
 */
const C = Object.freeze({ paper:'#0f1117', surface:'#161b22', ink:'#eef3f8', muted:'#b0bdcb', soft:'#a7b4c2', rule:'#343e49', accent:'#ffad70' });
const SANS = 'Inter,system-ui,Arial,sans-serif';
const MONO = '"Geist Mono",ui-monospace,monospace';
const DISPLAY = 'Syne,Inter,system-ui,sans-serif';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num = n => Number(Number(n).toFixed(3));
const sum = ns => ns.reduce((a,b) => a+b,0);
const cents = (n,name='Amount') => {
  if (typeof n !== 'number' || !Number.isFinite(n)) throw new TypeError(`${name} must be finite`);
  const v = Math.round(n*100);
  if (!Number.isSafeInteger(v)) throw new RangeError(`${name} exceeds the safe monetary range`);
  return v;
};
const nonnegative = (n,name) => { const v=cents(n,name); if(v<0) throw new RangeError(`${name} must be nonnegative`); return v; };
const dollars = v => v/100;
const fmt = v => `${v<0?'−':''}$${Math.abs(v/100).toLocaleString('en-US',{maximumFractionDigits:2})}`;
const raw = v => String(Number((v/100).toFixed(2)));
const axisAmount = v => { const a=Math.abs(v/100); return `${v<0?'−':''}${a>=1000 ? `${Number((a/1000).toFixed(2))}k` : Number(a.toFixed(2))}`; };
const attr = obj => Object.entries(obj).map(([k,v])=>`${k}="${esc(v)}"`).join(' ');
const text = (x,y,s,size=16,fill=C.ink,anchor='start',extra={}) => `<text ${attr({x:num(x),y:num(y),fill,'font-size':size,'font-family':SANS,'text-anchor':anchor,...extra})}>${esc(s)}</text>`;
const line = (x1,y1,x2,y2,extra={}) => `<line ${attr({x1:num(x1),y1:num(y1),x2:num(x2),y2:num(y2),stroke:C.rule,'stroke-width':1,...extra})}/>`;
const rect = (x,y,w,h,extra={}) => `<rect ${attr({x:num(x),y:num(y),width:num(w),height:num(h),fill:C.surface,...extra})}/>`;
function lines(s,max=22,cap=3) {
  const out=[]; let row='';
  for (const word of String(s).split(/\s+/)) {
    if(row && `${row} ${word}`.length>max){out.push(row);row='';}
    if(word.length>max){if(row)out.push(row);for(let i=0;i<word.length;i+=max)out.push(word.slice(i,i+max));row='';}
    else row += `${row?' ':''}${word}`;
  }
  if(row)out.push(row);
  if(out.length>cap){out.length=cap;out[cap-1]=`${out[cap-1].slice(0,max-1)}…`;}
  return out;
}
function multiline(x,y,s,max=22,cap=3,size=16,fill=C.ink,anchor='start',step=20) {
  return lines(s,max,cap).map((t,i)=>text(x,y+i*step,t,size,fill,anchor,{'font-weight':600})).join('');
}
function identity(id,title) {
  if(typeof id!=='string'||!id.match(/^[a-zA-Z][a-zA-Z0-9_-]*$/)) throw new TypeError('Provide a unique, safe diagram id');
  if(typeof title!=='string'||!title.trim()) throw new TypeError('Provide a diagram title');
  return {id,title};
}
function shell(id,title,desc,body,{eyebrow='ILLUSTRATIVE ECONOMICS',subtitle='',footnote='Hypothetical teaching model. Not a quote, compensation offer or forecast.'}={}) {
  identity(id,title);
  return `<svg xmlns="http://www.w3.org/2000/svg" class="economics-chart" viewBox="0 0 1280 720" role="img" aria-labelledby="${id}-title ${id}-desc" data-chart-id="${id}"><title id="${id}-title">${esc(title.slice(0,60))}</title><desc id="${id}-desc">${esc(desc)}</desc><rect width="100%" height="100%" fill="${C.paper}"/>${text(40,36,eyebrow,12,C.muted,'start',{'letter-spacing':'1.4'})}${text(40,88,title,40,C.ink,'start',{'font-family':DISPLAY,'font-weight':600})}${subtitle?text(40,120,subtitle,16,C.muted):''}${body}${line(40,648,1240,648)}${text(40,680,footnote,16,C.muted)}</svg>`;
}
function cleanRows(rows,max=6) {
  if(!Array.isArray(rows))throw new TypeError('Rows must be an array');
  let out=rows.map((r,i)=>({name:String(r.name??r.label??`Category ${i+1}`),value:nonnegative(r.value,`Cost ${i+1}`)})).filter(r=>r.value>0);
  if(out.length>max)out=[...out.slice(0,max-1),{name:'Other obligations',value:sum(out.slice(max-1).map(r=>r.value)),members:out.slice(max-1).map(r=>r.name)}];
  return out;
}
function niceDomain(values) {
  let lo=Math.min(0,...values),hi=Math.max(0,...values);
  const range=hi-lo || 100;
  const magnitude=10**Math.floor(Math.log10(range/4));
  const guess=range/4/magnitude;
  const step=(guess<=1?1:guess<=2?2:guess<=2.5?2.5:guess<=5?5:10)*magnitude;
  lo=Math.floor(lo/step)*step;hi=Math.ceil(hi/step)*step;
  if(hi===lo)hi=lo+step;
  const ticks=[];for(let i=0;i<=Math.round((hi-lo)/step);i++)ticks.push(lo+i*step);
  return {lo,hi,ticks};
}
function axes(domain,{x=112,y=172,w=1128,h=340}={}) {
  const py=v=>y+h-(v-domain.lo)/(domain.hi-domain.lo)*h;
  let svg=text(40,152,'USD',12,C.muted,'start',{'font-family':MONO});
  for(const tick of domain.ticks){const at=py(tick);svg+=line(x,at,x+w,at,{stroke:tick===0?C.muted:C.rule,'stroke-width':tick===0?1.5:1});svg+=text(x-16,at+5,axisAmount(tick),16,C.muted,'end',{'font-family':MONO});}
  return {svg,py};
}

/** 3 columns, <=8 nodes. Negative remainder deliberately rejected: use waterfall. */
export function allocationSankey({id,title='Where the contract dollars go',revenue,categories=[],reserve=0}) {
  const total=nonnegative(revenue,'Revenue'),buffer=nonnegative(reserve,'Reserve');
  if(total<=0)throw new RangeError('Sankey requires positive revenue');
  let groups=cleanRows(categories,3);
  const expense=sum(groups.map(r=>r.value)),retained=total-expense,remaining=retained-buffer;
  if(remaining<0)throw new RangeError('Negative remainder: show the contribution waterfall instead of a Sankey');
  // Fold tiny cost categories into another paid-cost band; reserve is never folded into expense.
  const tiny=groups.filter(r=>256*r.value/total<4),major=groups.filter(r=>256*r.value/total>=4);
  if(tiny.length){const combined=sum(tiny.map(r=>r.value));if(major.length){const last=major.pop();major.push({name:'Other obligations',value:last.value+combined,members:[last.name,...tiny.map(r=>r.name)]});groups=major;}else groups=[{name:'Project obligations',value:expense}];}
  const leaves=[...groups.map(r=>({...r,kind:'cost'})),...(buffer?[{name:'Designated reserve',value:buffer,kind:'reserve'}]:[]),...(remaining?[{name:'Unallocated remainder',value:remaining,kind:'remainder'}]:[])];
  if(leaves.some(r=>256*r.value/total<4))throw new RangeError('A retained allocation is too small to draw honestly; use the waterfall and numeric detail');
  const allocations=leaves.map(r=>({r,base:Math.floor(64*r.value/total),fraction:64*r.value/total%1}));
  let left=64-sum(allocations.map(r=>r.base));
  for(const a of [...allocations].sort((a,b)=>b.fraction-a.fraction)){if(left--<=0)break;a.base++;}
  leaves.forEach((r,i)=>{r.h=allocations[i].base*4;});
  const paidHeight=sum(leaves.filter(r=>r.kind==='cost').map(r=>r.h)),keptHeight=256-paidHeight;
  let nextY=184;leaves.forEach((r,i)=>{r.x=992;r.y=nextY;r.id=`leaf-${i}`;nextY+=r.h+40;});
  const source={id:'revenue',x:276,y:184,h:256,value:total,name:'Contract fee'};
  const middle=[...(expense?[{id:'obligations',x:608,y:184,h:paidHeight,value:expense,name:'Project obligations',kind:'cost'}]:[]),...(retained?[{id:'retained',x:608,y:184+paidHeight+(expense?88:0),h:keptHeight,value:retained,name:'Contribution',kind:'retained'}]:[])];
  const band=(a,b,y0,y1,h,value,focal=false)=>{const x0=a.x+12,x1=b.x,m=(x0+x1)/2;return `<path d="M ${x0} ${y0} C ${m} ${y0} ${m} ${y1} ${x1} ${y1} L ${x1} ${y1+h} C ${m} ${y1+h} ${m} ${y0+h} ${x0} ${y0+h} Z" fill="${focal?C.accent:C.muted}" fill-opacity="${focal?.28:.18}" data-from="${a.id}" data-to="${b.id}" data-value="${raw(value)}"/>`;};
  let body=[text(276,124,'CUSTOMER CONTRACT',12,C.muted,'middle'),text(614,124,'COSTS / CONTRIBUTION',12,C.muted,'middle'),text(998,124,'ALLOCATIONS',12,C.muted,'middle')].join('');
  let sourceOffset=0;for(const m of middle){body+=band(source,m,source.y+sourceOffset,m.y,m.h,m.value,m.kind==='retained');sourceOffset+=m.h;}
  for(const m of middle){let offset=0;for(const leaf of leaves.filter(r=>m.kind==='cost'?r.kind==='cost':r.kind!=='cost')){body+=band(m,leaf,m.y+offset,leaf.y,leaf.h,leaf.value,leaf.kind==='remainder');offset+=leaf.h;}}
  for(const n of [source,...middle,...leaves])body+=rect(n.x,n.y,12,n.h,{fill:n.kind==='remainder'?C.accent:C.ink,'data-node-id':n.id,'data-value':raw(n.value)});
  body+=text(252,280,'Contract fee',16,C.ink,'end',{'font-weight':600})+text(252,324,fmt(total),40,C.ink,'end',{'font-family':DISPLAY,'font-weight':600})+text(252,348,'Full collection assumed',12,C.muted,'end');
  for(const m of middle){const labelY=m.y-36;body+=text(m.x+6,labelY,m.name,16,C.ink,'middle',{'font-weight':600})+text(m.x+6,labelY+24,fmt(m.value),16,C.muted,'middle',{'font-family':MONO});}
  for(const l of leaves){body+=multiline(l.x+28,l.y+8,l.name==='Vendors and administration'?'Vendors / admin':l.name,24,1,16,l.kind==='remainder'?C.accent:C.ink);body+=text(l.x+28,l.y+32,fmt(l.value),16,l.kind==='remainder'?C.accent:C.muted,'start',{'font-family':MONO});}
  const disclosure=groups.filter(r=>r.members).map(r=>`${r.name} includes ${r.members.join(', ')}`).join('; ');
  const desc=`The illustrative ${fmt(total)} contracted fee funds ${fmt(expense)} of project obligations (${groups.map(r=>`${r.name}: ${fmt(r.value)}`).join("; ")}), leaving ${fmt(retained)} contribution of which ${fmt(buffer)} is designated reserve and ${fmt(remaining)} remains unallocated${disclosure?`; ${disclosure}`:''}.`;
  return shell(id,title,desc,body,{footnote:'Reserve designates part of contribution. It is not a project expense or distributable profit.'});
}

/** Signed start-costs=end walk. Reserve is deliberately excluded from expenses. */
export function contributionWaterfall({id,title='Revenue is not what you keep',revenue,costs=[],startLabel='Contract fee',endLabel,subtitle='Contracted-fee budget · full collection assumed · USD',footnote='Contribution is before central overhead and tax. A positive budget does not guarantee available cash.'}) {
  const start=nonnegative(revenue,'Revenue'),rows=cleanRows(costs,6),end=start-sum(rows.map(r=>r.value));
  let running=start;const bars=[{name:startLabel,value:start,role:'total',before:0,after:start}];
  for(const r of rows){bars.push({name:r.name,value:-r.value,role:'delta',before:running,after:running-r.value});running-=r.value;}
  bars.push({name:endLabel??(end<0?'Contribution loss':'Contribution'),value:end,role:'total',before:0,after:end});
  const domain=niceDomain(bars.flatMap(b=>[b.before,b.after]));
  const {svg:axis,py}=axes(domain);let body=axis;
  const pitch=Math.floor(1088/bars.length/4)*4,width=Math.floor(pitch*.64/4)*4,origin=132;
  bars.forEach((b,i)=>{b.x=origin+i*pitch;b.w=width;});
  for(let i=0;i<bars.length-1;i++)body+=line(bars[i].x+width,py(bars[i].after),bars[i+1].x,py(bars[i].after),{stroke:C.muted,'data-carry':raw(bars[i].after)});
  bars.forEach((b,i)=>{
    const y=Math.min(py(b.before),py(b.after)),height=Math.abs(py(b.before)-py(b.after)),focal=i===bars.length-1;
    // A zero total is an explicit baseline tick, never a fake positive-height bar.
    if(height>0)body+=rect(b.x,y,width,height,{fill:b.role==='delta'?C.paper:C.surface,stroke:focal?C.accent:C.ink,'stroke-width':focal?2:1.2,'data-role':b.role,'data-value':b.role==='delta'?`-${raw(-b.value)}`:raw(b.value),'data-name':b.name,'data-before':raw(b.before),'data-after':raw(b.after)});
    else body+=line(b.x,py(0),b.x+width,py(0),{stroke:C.accent,'stroke-width':3,'data-zero-total':b.name});
    const label=b.role==='delta'?`−${raw(-b.value)}`:raw(b.value).replace('-','−');
    body+=text(b.x+width/2,b.role==='delta'?y+height+12:y-8,label,16,focal?C.accent:C.ink,'middle',{'font-family':MONO});
    body+=multiline(b.x+width/2,556,b.name,Math.max(12,Math.floor(pitch/9)),3,16,focal?C.accent:C.ink,'middle',20);
  });
  const desc=`Illustrative ${startLabel.toLowerCase()} of ${fmt(start)} less ${rows.map(r=>`${r.name} ${fmt(r.value)}`).join(', ')} produces ${end<0?'a loss of':(endLabel??'contribution')+' of'} ${fmt(Math.abs(end))}; ${footnote}`;
  return shell(id,title,desc,body,{subtitle,footnote});
}

/** Comparable caller-supplied amounts only; does not infer ROI or cash savings. */
export function customerValueBars({id,title='Compare the stated assumptions',items=[],unit='USD',footnote='These are stated assumptions. Released capacity is not automatically cash savings or realized customer value.'}) {
  if(!Array.isArray(items)||items.length<1||items.length>8)throw new RangeError('Provide one to eight comparable items');
  const rows=items.map((r,i)=>({name:String(r.name??r.label??`Item ${i+1}`),value:cents(r.value)}));
  const domain=niceDomain(rows.map(r=>r.value)),x=376,w=752,y=188,pitch=Math.min(64,Math.floor(400/rows.length/4)*4),barH=Math.max(24,Math.floor(pitch*.6/4)*4);
  const px=v=>x+(v-domain.lo)/(domain.hi-domain.lo)*w;let body='';
  for(const tick of domain.ticks){body+=line(px(tick),168,px(tick),y+rows.length*pitch,{stroke:tick===0?C.muted:C.rule});body+=text(px(tick),y+rows.length*pitch+32,unit==='USD'?axisAmount(tick):raw(tick),16,C.muted,'middle',{'font-family':MONO});}
  rows.forEach((r,i)=>{const yy=y+i*pitch,focal=i===rows.length-1,left=Math.min(px(0),px(r.value)),width=Math.abs(px(r.value)-px(0));body+=multiline(352,yy+20,r.name,30,2,16,C.ink,'end',20);body+=rect(left,yy,width,barH,{fill:focal?C.accent:C.surface,stroke:focal?C.accent:C.muted,'data-value':raw(r.value),'data-name':r.name});body+=text(r.value>=0?px(r.value)+12:px(r.value)-12,yy+20,unit==='USD'?fmt(r.value):`${raw(r.value)}`,16,focal?C.accent:C.ink,r.value>=0?'start':'end',{'font-family':MONO});});
  body+=text(752,612,unit,12,C.muted,'middle',{'font-family':MONO});
  return shell(id,title,`${rows.map(r=>`${r.name}: ${unit==='USD'?fmt(r.value):`${raw(r.value)} ${unit}`}`).join('; ')} are illustrative assumptions on one shared scale, not measured customer results.`,body,{footnote});
}

/** Event staircase; repeated days preserve same-day event order, with no interpolated earnings. */
export function cashTimingChart({id,title='Profit on paper. Cash on a clock.',series=[]}) {
  if(!Array.isArray(series)||series.length<1||series.length>3)throw new RangeError('Provide one to three cash series');
  const data=series.map((s,i)=>{
    if(!Array.isArray(s.points)||s.points.length<2)throw new RangeError('Each cash series needs at least two events');
    let prior=-Infinity;
    return {name:String(s.name??`Scenario ${i+1}`),points:s.points.map(p=>{if(typeof p.day!=='number'||!Number.isFinite(p.day)||p.day<prior)throw new RangeError('Cash events must have finite, nondecreasing days');prior=p.day;return {day:p.day,balance:cents(p.balance,'Cash balance')};})};
  });
  const points=data.flatMap(s=>s.points),domain=niceDomain(points.map(p=>p.balance));
  const {svg:axis,py}=axes(domain,{x:128,y:208,w:1088,h:316});
  let minDay=Math.min(...points.map(p=>p.day)),maxDay=Math.max(...points.map(p=>p.day));if(minDay===maxDay)maxDay=minDay+1;
  const px=d=>128+(d-minDay)/(maxDay-minDay)*1088;
  let body=axis;
  for(let i=0;i<=4;i++){const day=minDay+(maxDay-minDay)*i/4;body+=text(px(day),556,`Day ${Number(day.toFixed(1))}`,16,C.muted,'middle',{'font-family':MONO});}
  const focal=data.at(-1),low=Math.min(0,...focal.points.map(p=>p.balance)),end=focal.points.at(-1).balance;
  body+=text(128,174,`Working-capital gap: ${fmt(-low)}`,16,C.accent,'start',{'font-weight':600})+text(1216,174,`Ending balance: ${fmt(end)}`,16,C.ink,'end',{'font-weight':600});
  data.forEach((s,i)=>{
    const isFocal=i===data.length-1,color=isFocal?C.accent:C.muted,dash=!isFocal&&(data.length<3||i>0)?'8 6':'';
    let d=`M ${num(px(s.points[0].day))} ${num(py(s.points[0].balance))}`;
    s.points.slice(1).forEach(p=>{d+=` H ${num(px(p.day))} V ${num(py(p.balance))}`;});
    if(s.points.at(-1).day<maxDay)d+=` H ${num(px(maxDay))}`;
    body+=`<path d="${d}" fill="none" stroke="${color}" stroke-width="${isFocal?3:2}" ${dash?`stroke-dasharray="${dash}"`:''} data-series="${esc(s.name)}" data-points="${esc(JSON.stringify(s.points.map(p=>({day:p.day,balance:dollars(p.balance)}))))}"/>`;
    if(isFocal)s.points.forEach(p=>{body+=`<circle cx="${num(px(p.day))}" cy="${num(py(p.balance))}" r="4" fill="${C.paper}" stroke="${color}" stroke-width="2"/>`;});
    const lx=128+i*364;body+=line(lx,604,lx+32,604,{stroke:color,'stroke-width':isFocal?3:2,...(dash?{'stroke-dasharray':dash}:{})});body+=multiline(lx+44,602,s.name,30,2,16,color,'start',20);
  });
  const desc=`Cash changes only on modeled receipt and payment dates; ${data.map(s=>`${s.name} starts at ${fmt(s.points[0].balance)}, reaches a low of ${fmt(Math.min(...s.points.map(p=>p.balance)))}, and ends at ${fmt(s.points.at(-1).balance)}`).join('; ')}.`;
  return shell(id,title,desc,body,{subtitle:`Highlighted: ${focal.name} · receipts minus payments on shared scales`,footnote:'Below zero means outside funding is needed to pay on time. Earned fees and invoices are not bank cash.'});
}

export const economicsChartPalette = C;

/** Commercial hierarchy: wider relationship never silently creates narrower pay rights. */
export function earningAuthority({id,title='Where earning rights are defined'}={}) {
  const rows=[
    ['Master relationship','Shared rules: confidentiality, IP and conduct.','Joining does not create an automatic fee.'],
    ['Opportunity','Name the relationship, pursuit and contributions.','Record who is funding discovery or presales.'],
    ['Customer project','Choose the prime, scope, acceptance and budget.','The paying contract defines the revenue base.'],
    ['Role scope','Assign the deliverable, rate or fee, and evidence.','Separate when a fee is earned from when it is paid.'],
    ['Renewal / expansion','Agree the next scope and continuing contribution.','Do not assume the first award pays forever.']
  ];
  let body=`<defs><marker id="${id}-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="${C.muted}"/></marker></defs>`;
  body+=line(72,184,72,568,{stroke:C.muted,'marker-end':`url(#${id}-arrow)`});
  rows.forEach((r,i)=>{const y=176+i*80,focal=i===3;body+=rect(112,y,1088,72,{fill:i%2?C.surface:C.paper,stroke:focal?C.accent:C.rule,'stroke-width':focal?2:1,'data-node-id':`authority-${i+1}`});body+=text(136,y+42,`0${i+1}`,16,C.muted,'start',{'font-family':MONO});body+=text(208,y+42,r[0],16,focal?C.accent:C.ink,'start',{'font-weight':600});body+=text(536,y+28,r[1],16,C.ink)+text(536,y+52,r[2],16,C.muted);});
  return shell(id,title,'Master terms establish the relationship, while opportunity records, the customer project, a named role scope and a separately reviewed renewal define specific contributions and payment conditions.',body,{eyebrow:'PROPOSED COMMERCIAL GOVERNANCE',subtitle:'Move from broad relationship rules to a specific, evidenced contribution.',footnote:'A person may hold several roles. Each payment still needs a defined basis and an agreed trigger.'});
}

/** Opportunity ingress topology; arrows are possible paths, never promised customer work. */
export function opportunityMap({id,title='Relationships become qualified work'}={}) {
  const entries=[
    ['Existing relationship','Independent brings a live customer'],
    ['New relationship','A new introduction or outbound lead'],
    ['Reactivated relationship','An old contact with a new need'],
    ['Public work / community','Content, demos, tools or an event'],
    ['Provider / ecosystem','Referral, subcontract or co-sell lead']
  ];
  const scope={id:'scope',x:496,y:288,w:280,h:160};
  const prime={id:'prime',x:912,y:312,w:280,h:112};
  const award={id:'award',x:912,y:520,w:280,h:96};
  let body=`<defs><marker id="${id}-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="${C.muted}"/></marker><marker id="${id}-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="${C.accent}"/></marker></defs>`;
  entries.forEach((e,i)=>{
    const y1=192+i*88,y2=312+i*28,m=[460,432,404,432,460][i],s=y2>y1?1:-1;
    const d=y1===y2?`M 312 ${y1} H 496`:`M 312 ${y1} H ${m-8} Q ${m} ${y1} ${m} ${y1+8*s} V ${y2-8*s} Q ${m} ${y2} ${m+8} ${y2} H 496`;
    body+=`<path d="${d}" fill="none" stroke="${C.muted}" stroke-width="1.5" marker-end="url(#${id}-arrow)" data-from="entry-${i}" data-to="scope"/>`;
  });
  body+=line(776,368,912,368,{stroke:C.muted,'marker-end':`url(#${id}-arrow)`,'data-from':'scope','data-to':'prime'});
  body+=line(1052,424,1052,520,{stroke:C.accent,'marker-end':`url(#${id}-accent)`,'data-from':'prime','data-to':'award'});
  entries.forEach((e,i)=>{const y=160+i*88;body+=rect(40,y,272,64,{fill:C.surface,stroke:C.rule,rx:6,'data-node-id':`entry-${i}`});body+=text(56,y+25,e[0],16,C.ink,'start',{'font-weight':600});body+=text(56,y+47,e[1],12,C.muted);});
  for(const n of [scope,prime,award])body+=rect(n.x,n.y,n.w,n.h,{fill:C.surface,stroke:n.id==='award'?C.accent:C.muted,rx:6,'data-node-id':n.id});
  body+=text(516,320,'Customer-qualified scope',16,C.ink,'start',{'font-weight':600});
  ['Need + sponsor + decision path','Budget + capacity + evidence','May pause or end without a sale'].forEach((t,i)=>{body+=text(516,356+i*28,t,16,C.muted);});
  body+=text(932,344,'Choose the accountable prime',16,C.ink,'start',{'font-weight':600});
  body+=text(932,376,'Independent · Intent · provider',16,C.muted)+text(932,404,'Contract names payer + payee.',16,C.muted);
  body+=text(932,554,'Written award + role scope',16,C.accent,'start',{'font-weight':600})+text(932,584,'Then: scoped, paid obligations.',16,C.muted);
  body+=text(496,528,'A relationship is an entry point.',16,C.ink,'start',{'font-weight':600})+text(496,556,'It is not a claim on all future revenue.',16,C.muted);
  return shell(id,title,'Existing, new, reactivated, public and provider relationships can lead to a qualified customer scope, followed by a prime selection and a written project award with named paid roles; none guarantees work.',body,{eyebrow:'OPPORTUNITY PATHWAYS',subtitle:'Preserve who brought the relationship. Validate the work before allocating earnings.',footnote:'Provider affiliation does not guarantee referrals, customer work, a payment or a subcontract.'});
}

/** Proposed network architecture. No centralized token, automatic share, or pooled customer ownership. */
export function networkEconomy({id,title='Independent capability. Accountable delivery.'}={}) {
  const nodes=[
    {id:'participants',x:40,y:168,w:312,h:152,title:'Autonomous participants',lines:['Relationships, specialist firms,','Expertise and permitted reusable IP.','Keep their independent businesses.']},
    {id:'operating',x:480,y:168,w:320,h:192,title:'Accountable operating layer',lines:['Qualify the opportunity and capacity.','Select the prime and delivery team.','Agree scope, standards and fees.','Intent coordinates where authorized.']},
    {id:'customer',x:928,y:168,w:312,h:152,title:'Customer',lines:['Defines the problem and outcome.','Accepts the work and evidence.','Pays the named contracting party.']},
    {id:'evidence',x:40,y:456,w:312,h:136,title:'Shared evidence + permitted IP',lines:['Tests, demos, teaching and tooling.','Reuse only with permission.','Fund maintenance by agreement.']},
    {id:'team',x:480,y:464,w:320,h:128,title:'Project-specific team',lines:['Independent roles, one scoped result.','Deliver, test, hand over and operate.','Record each accepted contribution.']},
    {id:'earnings',x:928,y:456,w:312,h:136,title:'Agreed earnings',lines:['Fees for distinct, authorized work.','Each payer owes its agreed scope.','Residual funds risk and operations.']}
  ];
  let body=`<defs><marker id="${id}-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="${C.muted}"/></marker><marker id="${id}-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="${C.accent}"/></marker></defs>`;
  const edge=(from,to,d,money=false,dashed=false)=>`<path d="${d}" fill="none" stroke="${money?C.accent:C.muted}" stroke-width="${money?2:1.5}" ${dashed?'stroke-dasharray="5 4"':''} marker-end="url(#${id}-${money?'accent':'arrow'})" data-from="${from}" data-to="${to}"/>`;
  body+=edge('participants','operating','M 352 232 H 480');
  body+=edge('operating','customer','M 800 216 H 928');
  body+=edge('customer','operating','M 928 288 H 800',true);
  body+=edge('operating','team','M 640 360 V 464');
  body+=edge('operating','earnings','M 800 344 H 1076 Q 1084 344 1084 352 V 456',true);
  body+=edge('team','evidence','M 480 536 H 352');
  body+=edge('evidence','participants','M 196 456 V 320',false,true);
  body+=edge('earnings','evidence','M 1084 592 V 616 Q 1084 624 1076 624 H 204 Q 196 624 196 616 V 592',false,true);
  const label=(x,y,s,w=112)=>rect(x-w/2,y-14,w,18,{fill:C.paper})+text(x,y,s,12,C.muted,'middle',{'font-family':MONO});
  body+=label(416,220,'AGREE ROLES')+label(864,204,'DELIVERY',88)+label(864,276,'CONTRACT FEES',120);
  body+=rect(648,396,128,20,{fill:C.paper})+text(656,410,'SCOPED WORK',12,C.muted,'start',{'font-family':MONO});
  body+=label(864,332,'SCOPED FEES',112)+label(416,524,'PERMITTED IP',120)+label(640,612,'REINVEST',96);
  body+=rect(204,376,112,20,{fill:C.paper})+text(212,390,'NEW CAPABILITY',12,C.muted,'start',{'font-family':MONO});
  for(const n of nodes){const focal=n.id==='operating';body+=rect(n.x,n.y,n.w,n.h,{fill:C.surface,stroke:focal?C.accent:C.muted,'stroke-width':focal?2:1,rx:6,'data-node-id':n.id});body+=text(n.x+20,n.y+30,n.title,16,focal?C.accent:C.ink,'start',{'font-weight':600});n.lines.forEach((s,i)=>{body+=text(n.x+20,n.y+62+i*24,s,16,C.muted);});}
  return shell(id,title,'A proposed network brings autonomous relationships, capability and assets into customer-specific delivery agreements, pays distinct agreed contributions, and reinvests permitted evidence and intellectual property into future capability without automatic shares or ownership of unrelated business.',body,{eyebrow:'PROPOSED NETWORK ECONOMY',subtitle:'Independent participants coordinate around real work. Agreements make responsibility and earnings specific.',footnote:'Orange = contracted money obligations. Dashed = potential reuse or agreed reinvestment, not a universal levy.'});
}
