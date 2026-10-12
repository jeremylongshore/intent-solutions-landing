// Public teaching material: synthetic examples, not offers or compensation policy.
export const disclaimer = 'Illustrative examples only. These are possible commercial arrangements, not current offers, agreed pay, promised work, forecasts, or evidence of customer results. All amounts are USD, before tax.';
export const chapters = [
 {id:'network-economy',title:'The proposed network economy',question:'How can independent businesses create and earn together without giving up their independence?',summary:'See the institution: participation, delegated authority, shared assets, project teams, earning rights and exit.',cases:[]},
 {id:'customer-value',title:'Why a customer pays',question:'The customer needs a better outcome. Where does the value actually come from?',summary:'Separate measurable business benefit, freed capacity and the costs of adopting a system.',cases:[]},
 {id:'opportunities',title:'Where work starts',question:'Who brought the opportunity—and what did they actually contribute?',summary:'Follow existing, new and rekindled relationships, public work, independent firms and provider routes.',cases:[]},
 {id:'pursuit',title:'Who funds the pursuit',question:'What happens to everyone’s work before there is a signed project?',summary:'Price discovery, presales and the possibility that the right answer is not to build.',cases:['paid-discovery-no-build','referral-only']},
 {id:'contracts',title:'Who contracts and owes',question:'Which business owns the customer promise, the invoice and the risk?',summary:'Compare Intent as prime, an independent keeping the prime, and an integrator buying a scoped package.',cases:['relationship-led-project','independent-prime','integrator-prime']},
 {id:'roles',title:'How each role earns',question:'What exactly is this person being paid to do, and when is it earned?',summary:'Connect the master relationship to an opportunity, project, individual scope and any renewal.',cases:[]},
 {id:'project',title:'Inside one project fee',question:'An $80,000 project is signed. Where could that money go?',summary:'Follow commercial work, delivery and operating costs into contribution and a cash reserve.',cases:['relationship-led-project']},
 {id:'cash',title:'When the cash arrives',question:'Can a profitable project still run out of money?',summary:'Compare promised receipts with supplier payment dates and the funding gap between them.',cases:[]},
 {id:'recurring',title:'What repeats',question:'What remains to be done—and paid for—after the first deployment?',summary:'Explore ongoing assurance, maintained skills and software with support and startup costs included.',cases:['recurring-assurance','maintained-skills','software-subscription','vendor-operating-costs']},
 {id:'other-plays',title:'More ways to contribute',question:'What else can someone create, sell, teach, maintain or fund?',summary:'Explore education, shared components and outcome-linked experiments without a universal revenue split.',cases:['employer-workshop','shared-component','outcome-hybrid']},
 {id:'sustainability',title:'Can the whole system earn?',question:'Do project margins survive the costs of running the company?',summary:'Account for pursuit, bench, owner work, maintenance, demand and the next experiment.',cases:[]},
];
export const chapterPath = id => `/estate/economics/${id}/`;
export const money = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:0,maximumFractionDigits:2}).format(value);
export function customerModel(adoption=0.75,cashShare=0.5) {
 for(const value of [adoption,cashShare]) if(!Number.isFinite(value)||value<0||value>1) throw new RangeError('Use a fraction from 0 to 1.');
 const hours=20*8*12*adoption, capacityValue=hours*60, cashBenefit=capacityValue*cashShare, setup=20000+5000, annualOperating=12*1200;
 return {hours,capacityValue,cashBenefit,setup,annualOperating,firstYearCost:setup+annualOperating,firstYearCashNet:cashBenefit-setup-annualOperating,ongoingMonthlyCash:cashBenefit/12-1200,paybackMonths:cashBenefit/12>1200?setup/(cashBenefit/12-1200):null};
}
export function projectCash({delay=0,missFinal=false}={}) {
 if(!Number.isFinite(delay)||delay<0) throw new RangeError('Delay must be nonnegative.');
 const costs=[{day:0,amount:4000},{day:15,amount:18000},{day:30,amount:18000},{day:45,amount:16000},{day:60,amount:3760}];
 const receipts=[{day:0,amount:32000},{day:30,amount:24000},{day:60,amount:24000}].filter((_,i)=>!missFinal||i!==2).map(x=>({...x,day:x.day+delay}));
 const events=[...costs.map(x=>({...x,kind:'Payment',delta:-x.amount})),...receipts.map(x=>({...x,kind:'Receipt',delta:x.amount}))].sort((a,b)=>a.day-b.day||a.delta-b.delta);
 let balance=0; const points=[{day:0,balance:0}];
 const ledger=events.map(e=>{balance+=e.delta; points.push({day:e.day,balance}); return {...e,balance};});
 return {points,ledger,minimum:Math.min(0,...points.map(p=>p.balance)),final:balance,costs:costs.reduce((s,x)=>s+x.amount,0),collected:receipts.reduce((s,x)=>s+x.amount,0)};
}
export const relationshipRoutes = [
 ['Existing customer','An independent already holds the relationship.','Keep the customer contract; ask Intent for a bounded specialist package.','The independent earns on its own engagement. Intent and specialists earn on the purchased scope.'],
 ['Rekindled contact','A previous contact has a new problem or sponsor.','Record who reopened access, developed the need and is doing current work.','Negotiate current contributions; a historical contact does not create a perpetual account fee.'],
 ['New relationship','Someone introduces a buyer or develops a new account.','Separate introduction, discovery, domain expertise, proposal and negotiation.','A fixed referral fee, funded presales or a bounded success term could each fit different work.'],
 ['Two overlapping relationships','Several people know the same customer.','Resolve consent, roles and attribution before proposing obligations.','Pay distinct approved contributions from one affordable budget; do not stack duplicate commissions.'],
 ['Public work creates inbound','A demo, article, class or repository prompts a real buyer conversation.','Qualify a problem, decision-maker, constraints and willingness to pay.','Content and maintenance may have funded budgets; audience attention alone creates no project payment.'],
 ['Provider or integrator introduces work','A vendor or larger firm requests a capability.','Confirm whether this is a lead, an authorized subcontract or an approved funded program.','The named contracting payer owes only the signed scope; no provider pipeline is promised.'],
 ['Customer asks several firms to collaborate','Different firms hold trust, domain knowledge and capacity.','Choose a prime or clearly separate contracts and interfaces.','Each firm prices its responsibility, assets and work; network membership creates no tax on other business.'],
];
export const roles = [
 ['Relationship steward / reactivator','Current trust, access and account development','A scoped retainer, milestone fee or bounded success term','A named opportunity and contribution; no lifetime ownership of a buyer.'],
 ['Introducer','A permissioned, qualified introduction','A fixed referral fee or negotiated contingent fee','Define qualification, fee base, term, exclusions and cancellation treatment.'],
 ['Presales / domain specialist','Discovery, feasibility, proposal and industry judgment','Funded hours, a fixed discovery package or an expressly contingent portion','Identify who funds authorized work even when no project is won.'],
 ['Commercial lead','Negotiation, scope, pricing and handover','Project budget or agreed success term','No authority to promise delivery or discounts beyond delegation.'],
 ['Architect / engagement lead','A workable design and coordinated delivery','Bounded package, time budget or retainer','Define acceptance, dependencies, change authority and escalation.'],
 ['Engineer / specialist / boutique firm','A specified implementation or integration','Milestone invoice or time-based approved scope','A supplier receipt is business income before its own staff, tools and taxes.'],
 ['Evaluator / QA / security reviewer','Independent evidence, including unfavorable findings','Assessment package or authorized review hours','Pay for a sound review, not for a predetermined pass.'],
 ['Customer operator / adoption lead','Data access, adoption, oversight and day-to-day ownership','Customer-funded time or a contracted change-management scope','Count customer effort in the buyer’s economics; adoption is not free.'],
 ['Maintainer / support operator','Updates, incidents, reliability and runbooks','Recurring fee tied to service boundaries','Specify coverage, usage limits, escalation and additional work.'],
 ['Educator / creator / IP owner','Teaching, documentation or rights to reusable assets','Preparation and delivery fees, license, support or sponsorship','Permission, maintenance and distinct deliverables govern payment; avoid double-selling rights.'],
 ['Intent / accountable prime','Customer contract, orchestration, collection and delivery risk','The contribution left after approved project costs','That contribution must also fund company overhead, losses and reinvestment.'],
 ['Platform / model / cloud vendor','Metered infrastructure, models or licensed capability','Usage charges or license fees from the actual account holder','Credits may offset eligible bills; they cannot be treated as cash for wages.'],
];
export const authorityLayers = [
 ['Master relationship','Background IP, confidentiality, legal framework and who may negotiate.','Does not promise a project, a salary or a share of unrelated business.'],
 ['Specific opportunity','Customer permission, contribution record, pursuit funder and prime selection.','Does not authorize unlimited unpaid presales or lock the buyer to one person.'],
 ['Customer project','Price, scope, acceptance, change control, responsibility and payment dates.','Does not automatically award every participant the same percentage.'],
 ['Individual role / firm scope','Deliverable, budget, earn event, invoice event and due date.','One person can hold several roles only for distinct authorized contributions.'],
 ['Renewal / expansion / reuse','New work, continuing stewardship, IP rights and fresh economics.','No automatic recurring commission, perpetual exclusivity or shared IP rights.'],
];
export const adjacentPlays = [
 ['Independent evaluation','A buyer pays for a benchmark, review or acceptance test.','Evaluator and domain expert earn for valid evidence; an unfavorable result can still be a successful paid engagement.','Separate reviewer incentives from implementation sales.'],
 ['Open-source + paid operations','A team adopts a free tool and buys installation, integration or support.','Maintainers and operators earn for contracted services or authorized licenses.','A public license and download count do not create automatic rights to revenue.'],
 ['Reserved delivery capacity','A buyer reserves an explicitly limited team window.','A scoped monthly fee funds named capacity, coordination and response coverage.','Unused capacity, staff absence and unlimited requests can consume the margin.'],
 ['Rights-cleared asset licensing','A buyer licenses a reusable connector, template or component.','The rights holder earns a license fee; customization and maintenance have separate scopes.','Exclude customer-confidential work and IP the seller does not own.'],
 ['Documented media / sponsorship','A sponsor commissions an independently useful article, demo or event.','Creators and editors receive an agreed production budget.','Disclose sponsorship; audience size is not a forecast of paid conversions.'],
 ['Customer-funded extension','A current customer buys a new workflow or a new region.','Current account work and new delivery earn under the extension’s budget.','Reuse does not remove testing, support, consent or ownership questions.'],
];
