import assert from 'node:assert/strict';
import {economicsCases,summarizeEconomicsCase} from '../src/data/estate-economics-cases.mjs';
import {chapters,customerModel,projectCash,money} from '../src/data/economics-teaching.mjs';
import {allocationSankey,contributionWaterfall,cashTimingChart} from '../src/diagrams/economics-charts.mjs';
import {networkEconomy} from '../src/data/network-economy.mjs';
let checks=0; const eq=(a,b,label)=>{assert.deepEqual(a,b,label);checks++;};
for(const c of economicsCases){
 const original=JSON.stringify(c);
 for(const downside of [false,true]){
  const m=summarizeEconomicsCase(c,{downside});
  eq(Math.round(m.revenue*100)-Math.round(m.costs*100),Math.round(m.contribution*100),`${c.id}: fees less costs`);
  eq(Math.round(m.contribution*100)-Math.round(m.reserve*100),Math.round(m.remainder*100),`${c.id}: reserve is not an expense`);
  eq(m.costGroups.reduce((n,r)=>n+Math.round(r.value*100),0),Math.round(m.costs*100),'Groups reconcile');
  const svg=contributionWaterfall({id:`test-${c.id}-${downside}`,revenue:m.revenue,costs:m.costGroups});
  assert.ok(svg.includes('role="img"')&&svg.includes('data-carry='));checks++;
 }
 eq(JSON.stringify(c),original,'Scenario calculations must not mutate baseline');
}
const base=economicsCases.find(c=>c.id==='relationship-led-project');
const model=summarizeEconomicsCase(base);
eq([model.revenue,model.costs,model.contribution,model.reserve,model.remainder],[80000,59760,20240,4000,16240],'Project teaching baseline');
eq(projectCash().costs,model.costs,'Cash and project use the same cost budget');
eq(projectCash().collected,model.revenue,'Cash and fee use the same contract');
eq(projectCash().final,model.contribution,'Fully collected baseline reconciles');
eq(projectCash().ledger.filter(e=>e.kind==='Receipt').map(e=>e.amount),[32000,24000,24000],'Customer milestones 40/30/30');
eq(projectCash().minimum,-8000,'Costs before same-day receipts creates explicit intraday gap');
eq(projectCash({delay:30}).minimum,-40000,'Delayed collection funding requirement');
eq(projectCash({delay:30}).final,20240,'Timing delay does not itself reduce fee');
eq(projectCash({missFinal:true}).final,-3760,'Permanent final nonpayment reduces retained cash');
assert.throws(()=>projectCash({delay:-1}));checks++;
eq(money(.02),'$0.02','Small vendor unit rates cannot round to zero');
eq(money(2339.10),'$2,339.1','Preserve non-whole aggregate dollars');
eq(customerModel().firstYearCashNet,3800,'Customer cash case');
eq(customerModel(0,0).firstYearCashNet,-39400,'Zero adoption still incurs setup and operation costs');
eq(customerModel(1,0).cashBenefit,0,'Capacity does not automatically become cash');
eq(customerModel(0,1).paybackMonths,null,'No positive contribution means no payback');
for(const v of [-1,2,NaN,Infinity,'0.5']){assert.throws(()=>customerModel(v,0.5));checks++;}
assert.throws(()=>allocationSankey({id:'loss',revenue:100,categories:[{name:'Costs',value:150}]}));checks++;
assert.throws(()=>cashTimingChart({id:'bad-dates',series:[{name:'Out of order',points:[{day:2,balance:0},{day:1,balance:1}]}]}));checks++;
eq(new Set(chapters.map(c=>c.id)).size,chapters.length,'Unique routes');
for(const chapter of chapters)for(const id of chapter.cases){assert.ok(economicsCases.some(c=>c.id===id));checks++;}
eq(networkEconomy.dimensions.map(d=>d.id),['contribution','authority','earning','rights','risk','exit'],'Do not silently collapse governance into pay');
console.log(`PASS: ${checks} financial, scenario, cash-timing and public teaching contract checks.`);
