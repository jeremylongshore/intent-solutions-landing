import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import {
  allocationSankey, contributionWaterfall, customerValueBars, cashTimingChart,
  earningAuthority, opportunityMap, networkEconomy,
} from '../src/diagrams/economics-charts.mjs';
import {
  economicsCases, summarizeEconomicsCase, economicsDisclaimer,
} from '../src/data/estate-economics-cases.mjs';
import { customerModel, projectCash } from '../src/data/economics-teaching.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'public/financial-diagrams');
mkdirSync(output, { recursive: true });
const estateBar = readFileSync(join(root, '../estate-bar/fragments/estate-bar.company.html'), 'utf8').trim();
const estateStyle = readFileSync(join(root, '../estate-bar/estate-bar.css'), 'utf8').replace(
  'url("fonts/JetBrainsMono-Medium.woff2")',
  `url("data:font/woff2;base64,${readFileSync(join(root, '../estate-bar/fonts/JetBrainsMono-Medium.woff2')).toString('base64')}")`,
);
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;',
}[ch]));
const money = value => new Intl.NumberFormat('en-US', {
  style:'currency', currency:'USD', maximumFractionDigits:2,
}).format(value);
const css = `
*{box-sizing:border-box}body{margin:0;background:#0f1117;color:#eef3f8;font:16px/1.6 Inter,system-ui,Arial,sans-serif}
main{max-width:1440px;margin:auto;padding:32px 32px 64px;min-width:0}a{color:#ffad70;text-underline-offset:3px}
a:focus-visible,summary:focus-visible,.diagram-container:focus-visible{outline:3px solid #ffad70;outline-offset:5px}
h1{font:600 clamp(28px,3vw,40px)/1.2 Syne,Inter,system-ui,sans-serif;margin:12px 0 20px;max-width:1120px}
h2{font-size:24px;line-height:1.3;margin:32px 0 16px}p{max-width:1120px;color:#b0bdcb}.kicker{font-size:12px;letter-spacing:.12em;text-transform:uppercase}
nav.artifact-links{display:flex;gap:24px;flex-wrap:wrap}figure{margin:32px 0}.diagram-container{width:100%;max-width:100%;min-width:0;overflow-x:auto;overscroll-behavior-x:contain}
.economics-chart{width:100%;min-width:1280px;display:block}figcaption{margin-top:16px;color:#b0bdcb;max-width:1120px}
.scope{border-left:3px solid #ffad70;padding-left:20px}.table-scroll{overflow-x:auto;max-width:100%}table{border-collapse:collapse;min-width:720px;width:100%;text-align:left;font-size:16px}
caption{text-align:left;margin:16px 0;color:#b0bdcb}th,td{padding:16px 12px;border-bottom:1px solid #343e49;vertical-align:top}th{font-weight:600}td{color:#b0bdcb}
thead th{color:#ffad70}footer{margin-top:40px;border-top:1px solid #343e49;padding-top:20px;color:#b0bdcb}.figure-note{font-size:14px}
@media print{body{background:#0f1117;print-color-adjust:exact;-webkit-print-color-adjust:exact}main{padding:0;max-width:none}.is-estate-bar,.artifact-links{display:none!important}.diagram-container,.table-scroll{overflow:visible}.economics-chart{min-width:0;width:100%}figure{break-inside:avoid}table{min-width:0}h1{font-size:26px}h2{break-after:avoid}a{color:inherit}thead{display:table-header-group}tr{break-inside:avoid}@page{size:A4 landscape;margin:12mm}}
`;
const records=[];
function table(headers, rows, caption) {
  return `<div class="table-scroll"><table><caption>${esc(caption)}</caption><thead><tr>${headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((v,i)=>i?`<td>${esc(v)}</td>`:`<th scope="row">${esc(v)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function save({id,title,type,svg,caption,chapter='network-economy',detail='',caseId=null,downside=false}) {
  if(!/^[a-z][a-z0-9-]*$/.test(id)) throw new Error(`Invalid artifact id: ${id}`);
  if(!svg.includes(`data-chart-id="${id}"`)) throw new Error(`Chart id does not match artifact id: ${id}`);
  const url=`/financial-diagrams/${id}.html`;
  const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta name="theme-color" content="#0f1117"><title>${esc(title)} | Intent Solutions Financial Teaching</title><style>${estateStyle}\n${css}</style></head>
<body>${estateBar}
<main><header><p class="kicker">Intent Solutions · Financial Teaching · V1</p><h1>${esc(title)}</h1><nav class="artifact-links" aria-label="Return to the financial atlas"><a href="https://intentsolutions.io/estate/economics/${esc(chapter)}/">Read this chapter</a><a href="https://intentsolutions.io/estate/economics/">Explore the financial atlas</a></nav></header>
<figure><div class="diagram-container" tabindex="0" role="region" aria-label="${esc(title)}. Scroll horizontally for the full diagram.">${svg}</div><figcaption>${esc(caption)}</figcaption></figure>
<section aria-label="Scope of this teaching model"><p class="scope">${esc(economicsDisclaimer)}</p>${detail}</section>
<footer><p>Diagram grammar: <a href="https://github.com/cathrynlavery/diagram-design">Cathryn Lavery’s Diagram Design</a>, v2.6. This self-contained copy uses the same SVG renderer as the website. It loads no external fonts, scripts or images. Syne, Inter and Geist Mono use system fallbacks when unavailable; the network banner font is embedded.</p><p class="figure-note">Print from your browser for a complete scaled figure and its explanatory notes. On a narrow screen, scroll the figure locally instead of reducing its labels.</p></footer></main></body></html>\n`;
  writeFileSync(join(output, `${id}.html`), html);
  records.push({id,url,title,type,caseId,downside,sha256:createHash('sha256').update(html).digest('hex')});
}
const networkCaption='A proposed network of independent participants, accountable delivery and permitted reuse. Money arrows describe agreed obligations; neither membership nor contribution alone creates ownership, voting power or universal earnings.';
for(const id of ['proposed-network-economy','financial-atlas-entry'])save({id,title:'The proposed network economy',type:'architecture',svg:networkEconomy({id}),caption:networkCaption});
save({id:'opportunity-routes',title:'Relationships become qualified work',type:'architecture',svg:opportunityMap({id:'opportunity-routes'}),chapter:'opportunities',caption:'Existing, new, reactivated, public and provider routes can overlap, pause or end without an award. A qualified scope, prime selection and written role award remain separate gates.'});
save({id:'earning-authority',title:'Where earning rights are defined',type:'layers',svg:earningAuthority({id:'earning-authority'}),chapter:'roles',caption:'Relationship rules narrow into a specific opportunity, customer contract, role scope and separately reviewed renewal. This is proposed governance, not a set of executed agreements.'});
const customer=customerModel();
save({id:'customer-value',title:'Benefit is an assumption to test',type:'bar',chapter:'customer-value',svg:customerValueBars({id:'customer-value',title:'Benefit is an assumption to test',items:[{name:'Freed capacity value',value:customer.capacityValue},{name:'Realizable cash benefit',value:customer.cashBenefit},{name:'Year-one total costs',value:customer.firstYearCost}],unit:'USD'}),caption:'Default teaching assumptions: 75% adoption and 50% of freed capacity converted to cash benefit. Capacity value and cash benefit overlap; never add them together. Year-one cost includes supplier fees, customer adoption and ongoing operation.'});
save({id:'pursuit-cost',title:'Unsuccessful pursuits still cost money',type:'bar',chapter:'pursuit',svg:customerValueBars({id:'pursuit-cost',title:'Unsuccessful pursuits still cost money',items:[{name:'20% win assumption',value:4000},{name:'40% win assumption',value:2000},{name:'60% win assumption',value:800/0.6}],unit:'USD',footnote:'Expected pursuit cost per win = cost per attempt ÷ assumed win probability. These are sensitivity inputs.'}),caption:'Each attempt costs an illustrative $800. The plotted quantity is expected pursuit cost per won project across many attempts, not industry conversion data or a guaranteed outcome.'});
const schedules=[{name:'On time',...projectCash()},{name:'30 days late',...projectCash({delay:30})},{name:'Final receipt lost',...projectCash({missFinal:true})}];
save({id:'cash-comparison',title:'Cash is a schedule, not a margin',type:'line',chapter:'cash',svg:cashTimingChart({id:'cash-comparison',title:'Cash is a schedule, not a margin',series:schedules.map(({name,points})=>({name,points}))}),caption:'The same project budget uses separate customer receipt and supplier payment dates. Cash begins at zero. Same-day costs precede receipts to disclose an intraday funding need. The final-receipt-loss scenario is highlighted.',detail:table(['Schedule','Collected','Funding gap','Final cash'],schedules.map(s=>[s.name,money(s.collected),money(-s.minimum),money(s.final)]),'Modeled schedule totals, excluding central overhead and tax.')});
save({id:'company-bridge',title:'What survives beyond the project?',type:'waterfall',chapter:'sustainability',svg:contributionWaterfall({id:'company-bridge',title:'What survives beyond the project?',revenue:20240,costs:[{name:'Other pursuit costs',value:4000},{name:'Central operations',value:5000},{name:'Bench / upkeep',value:4500},{name:'Owner work',value:3000}],startLabel:'Project contribution',endLabel:'Before-tax remainder',subtitle:'Company-cost bridge · same eight-week period · USD',footnote:'Remainder is before tax and reserve. Do not count project administration or owner work twice.'}),caption:'A constructed company-level bridge deducts $16,500 of costs outside the project ledger from its $20,240 contribution. The $3,740 remainder is $260 short of a proposed $4,000 reserve; reserve is not another expense.'});
for(const c of economicsCases){
  for(const downside of [false,true]){
    const model=summarizeEconomicsCase(c,{downside});
    const id=`${c.id}-${downside?'downside':'base'}-bridge`;
    const detail=table(['Cost / contribution','Amount','Recipient','Earned when','Payment condition'],model.costRows.map(r=>[r.label,money(r.amount),r.recipient,r.earnTrigger,r.paymentTrigger]),'The cost ledger that produces the figure. Supplier receipts are gross business invoices, not personal take-home pay.');
    save({id,title:`${c.title} — ${downside?'downside':'baseline'}`,type:'waterfall',caseId:c.id,downside,chapter:c.id==='relationship-led-project'?'project':['independent-prime','integrator-prime'].includes(c.id)?'contracts':['recurring-assurance','maintained-skills','software-subscription','vendor-operating-costs'].includes(c.id)?'recurring':['paid-discovery-no-build','referral-only'].includes(c.id)?'pursuit':'other-plays',svg:contributionWaterfall({id,title:downside?'What happens when the plan breaks':'Fees become contribution, not take-home pay',revenue:model.revenue,costs:model.costGroups}),caption:`${money(model.revenue)} of illustrative fees less ${money(model.costs)} of listed costs leaves ${money(model.contribution)} before central overhead and tax. ${downside?c.downside.explanation:c.summary}`,detail});
  }
}
const project=economicsCases.find(c=>c.id==='relationship-led-project');
const model=summarizeEconomicsCase(project);
const allocationId=`${project.id}-allocation`;
save({id:allocationId,title:'Follow the $80,000 project fee',type:'sankey',caseId:project.id,chapter:'project',svg:allocationSankey({id:allocationId,title:'Follow the $80,000 project fee',revenue:model.revenue,categories:model.costGroups,reserve:model.reserve}),caption:'An illustrative contracted-fee budget with full collection assumed. Bands conserve the fee; a designated reserve remains inside contribution. The unallocated remainder still faces company costs and tax.'});
const manifest={schemaVersion:1,scope:'Fictional financial teaching models and proposed network governance; not agreed compensation or customer results',diagramAuthority:{repository:'https://github.com/cathrynlavery/diagram-design',version:'2.6',commit:'7a2e22170ee838e859d8142ba825d83f8b6375e6'},count:records.length,diagrams:records,byChartId:Object.fromEntries(records.map(record=>[record.id,record]))};
writeFileSync(join(output,'manifest.json'),`${JSON.stringify(manifest,null,2)}\n`);
console.log(`financial-diagrams: ${records.length} self-contained teaching diagrams and manifest`);
