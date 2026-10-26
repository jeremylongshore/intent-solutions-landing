/**
 * Public research context for fictional teaching examples.
 * Findings describe the cited evidence. Applications are proposed design choices.
 * No source establishes Intent demand, provider status, participant terms or rates.
 */

export const researchBoundary =
  'These selected studies and historical cases explain mechanisms to test. They are ' +
  'not a systematic review, industry earnings survey or validation of this network. ' +
  'The teaching applications are our proposed responses, not conclusions that the ' +
  'sources tested for Intent. Scenario prices and volumes remain explicit assumptions.';

export const researchLessons = [
  {
    id: 'labor-cost-context',
    title: 'A salary benchmark is not a supplier quote',
    chapters: ['roles', 'project'],
    evidenceType: 'Official US occupational wage statistics; contextual benchmark only',
    finding: 'The US Bureau of Labor Statistics reports May 2025 median annual wages of $135,980 for software developers and $104,300 for software QA analysts and testers.',
    teachingApplication: 'Use wage data as a reasonableness check, then obtain actual supplier quotes. A contracting business must also fund nonbillable time, benefits, tools, overhead and risk. Specialist scope and local conditions can change the rate substantially.',
    limits: 'US employee wages are not international contractor prices, an AI-specialist rate survey or validation of these fictional rates. The project sensitivity changes the supplier rate without claiming any value is a market median.',
    sources: [{title:'BLS Occupational Outlook Handbook — software developers and QA, May 2025 wages',url:'https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm'}],
    checkedAt:'2026-10-12',
  },
  {
    id: 'complementary-investment',
    title: 'The tool is only part of the investment',
    chapters: ['customer-value', 'sustainability'],
    evidenceType: 'Peer-reviewed economic model with a macroeconomic application',
    finding: 'The 2021 Productivity J-Curve paper explains how complementary intangible investment can initially lower measured productivity before later benefits appear.',
    teachingApplication: 'Budget workflow redesign, integration, learning and review. Compare the complete change with an existing product or a simpler process improvement; test whether anyone captures enough value to fund it.',
    limits: 'An aggregate measurement framework does not predict a particular project’s payback, justify indefinite losses or supply a percentage to add to these examples.',
    sources: [{ title: 'The Productivity J-Curve — American Economic Journal: Macroeconomics, 2021', url: 'https://www.aeaweb.org/articles?id=10.1257/mac.20180386' }],
    checkedAt: '2026-10-12',
  },
  {
    id: 'ai-task-gains',
    title: 'A measured task gain is not a revenue forecast',
    chapters: ['customer-value', 'sustainability'],
    evidenceType: 'Empirical study of a staggered workplace AI rollout',
    finding: 'Generative AI at Work, revised November 2024, studies 5,172 support agents and reports 15% more issues resolved per hour on average. Effects differed substantially by experience and skill.',
    teachingApplication: 'Measure accepted work, quality, operator time and actual cash effects separately. Keep adoption and cash realization as assumptions to test, rather than multiplying revenue by a published productivity result.',
    limits: 'This is one customer-support setting. The result does not establish engineering savings, this customer’s ROI, a contractor rate or a universal AI uplift.',
    sources: [{ title: 'Generative AI at Work — revised research paper, version 2', url: 'https://arxiv.org/abs/2304.11771v2' }],
    checkedAt: '2026-10-12',
  },
  {
    id: 'ai-measurement-limits',
    title: 'Even the productivity estimate needs scrutiny',
    chapters: ['customer-value', 'sustainability'],
    evidenceType: 'Research organization’s experimental-method update',
    finding: 'METR’s February 2026 update says its later developer experiment gives an unreliable signal of the current effect: participant and task selection changed, and concurrent-agent work complicated time measurement.',
    teachingApplication: 'Track end-to-end delivery, review and rework on comparable tasks. Change price, engineering effort and assurance effort independently; faster generation need not increase retained margin.',
    limits: 'Neither the earlier slowdown nor the later estimates establish today’s universal engineering effect. Self-reported value, measured task speed and collected revenue are different outcomes.',
    sources: [{ title: 'METR — We are Changing our Developer Productivity Experiment Design, February 2026', url: 'https://metr.org/blog/2026-02-24-uplift-update/' }],
    checkedAt: '2026-10-12',
  },
  {
    id: 'services-demand-risk',
    title: 'Technical reputation does not remove demand risk',
    chapters: ['pursuit', 'cash', 'sustainability'],
    evidenceType: 'Historical SEC filing with audited financial statements and management discussion',
    finding: 'Thoughtworks reported a 13.1% revenue decline and a $68.661 million net loss in 2023. Management described cautious client budgets, shorter contracts and lower headcount among the factors affecting revenue.',
    teachingApplication: 'Include lost pursuits, delays, unfilled capacity and cancellation. Require evidence of funded demand before committing shared capacity; a technically capable network can still lack paying work.',
    limits: 'A large firm’s historical downturn is neither an industry failure rate nor an Intent forecast. Management’s explanation does not isolate causation, and net loss is not cash burn.',
    sources: [{ title: 'Thoughtworks — 2023 Form 10-K, operational metrics and results', url: 'https://www.sec.gov/Archives/edgar/data/1866550/000186655024000022/twks-20231231.htm' }],
    checkedAt: '2026-10-12',
  },
  {
    id: 'community-trust',
    title: 'Monetization changes can damage the bargain',
    chapters: ['opportunities', 'recurring', 'sustainability'],
    evidenceType: 'Primary company announcement of a policy reversal',
    finding: 'In March 2023, Docker reversed its announced Free Team sunset after community feedback and offered refunds to affected customers who had upgraded.',
    teachingApplication: 'Keep public-use rights, optional paid services and membership expectations clear. Make proposed changes, decision authority, objections and participant exit visible; community trust cannot be treated as automatic demand.',
    limits: 'This documents a policy reversal, not Docker’s business failure or a measured loss caused by the announcement. It supplies no optimal price or governance formula.',
    sources: [{ title: 'Docker — We’re No Longer Sunsetting the Free Team Plan, March 2023', url: 'https://www.docker.com/blog/no-longer-sunsetting-the-free-team-plan/' }],
    checkedAt: '2026-10-12',
  },
  {
    id: 'distribution-fragility',
    title: 'A growing content library is not a cash entitlement',
    chapters: ['opportunities', 'other-plays', 'sustainability'],
    evidenceType: 'Historical SEC filing with audited financial statements and management discussion',
    finding: 'Demand Media’s Content & Media revenue fell from $137.038 million in 2014 to $73.814 million in 2015. Reported visits and revenue per thousand visits both declined.',
    teachingApplication: 'Track audience access, qualified conversations, paid conversion and monetization separately. Budget publishing as an expense unless a sponsor or buyer actually funds it; do not count the same downstream sale twice.',
    limits: 'The filing describes multiple contributing factors, while its marketplace business grew. This is not evidence that all creator businesses fail or an estimate of a solo creator’s earnings.',
    sources: [{ title: 'Demand Media — 2015 Form 10-K, Content & Media metrics and segment revenue', url: 'https://www.sec.gov/Archives/edgar/data/1365038/000155837016003739/dmd-20151231x10k.htm' }],
    checkedAt: '2026-10-12',
  },
];

export const lifecycleBoundary =
  'A proposed state model for a specific opportunity, not a compulsory funnel or an ' +
  'existing agreement. Several opportunities can coexist within one relationship. ' +
  'The customer keeps its choice of supplier. A transition records a decision; it ' +
  'creates payment rights only where the parties have actually agreed them.';

export const lifecycleStates = [
  { id: 'relationship', title: 'Relationship and permission', evidence: 'Current contacts, customer consent, independent business boundaries and any overlapping claims.', fundingBoundary: 'Historical access alone creates no invoice or permanent ownership of the account.' },
  { id: 'discovery', title: 'Discovery and qualification', evidence: 'Problem, buyer, decision process, options, constraints and baseline.', fundingBoundary: 'Name the funder and cap for current work; distinguish paid discovery from speculative pursuit.' },
  { id: 'qualified', title: 'A qualified opportunity', evidence: 'A credible budget path, useful scope, available capability and a next customer decision.', fundingBoundary: 'Qualification does not create a purchase order, guaranteed work or earned success fee.' },
  { id: 'contracting', title: 'Contracting and procurement', evidence: 'Selected prime, scopes, acceptance, authority, role schedules, rights and due dates.', fundingBoundary: 'Provider status or proposal approval cannot substitute for the actual payer’s authorization.' },
  { id: 'delivery', title: 'Authorized delivery', evidence: 'Accepted work orders, milestones, capacity and recorded changes.', fundingBoundary: 'Each role earns under its scope. Prime collection risk does not silently rewrite supplier obligations.' },
  { id: 'acceptance', title: 'Evidence and acceptance', evidence: 'Delivered results, independent review, customer decisions and unresolved exceptions.', fundingBoundary: 'Separate performed work, acceptance, invoicing, due date and bank settlement.' },
  { id: 'operating', title: 'Adoption and operation', evidence: 'Use, support demand, service coverage, observed value and maintenance needs.', fundingBoundary: 'Ongoing earnings follow the current service or rights agreement, not historic attribution alone.' },
  { id: 'paused', title: 'Paused or dormant', evidence: 'Why work stopped, obligations preserved, next review and conditions for restarting.', fundingBoundary: 'Pause new commitments within the agreed terms; keep already earned amounts and committed costs visible.' },
  { id: 'disputed', title: 'Exception or dispute', evidence: 'Contested scope or result, undisputed obligations, decision authority and a resolution record.', fundingBoundary: 'A dispute is not permission to erase all earned work or bill the same remediation twice.' },
  { id: 'closed', title: 'Closed, stopped or handed over', evidence: 'No-award/no-build reason, settled and pending obligations, access handoff and continuing rights.', fundingBoundary: 'End future commitments as agreed; preserve earned obligations and any expressly continuing duties.' },
];

export const lifecycleTransitions = [
  { from: 'relationship', to: 'discovery', event: 'A current need and permission to explore', decision: 'Choose the pursuit owner, funder and bounded work.', earningBoundary: 'No automatic referral award merely because a contact exists.' },
  { from: 'discovery', to: 'qualified', event: 'Evidence supports a funded next step', decision: 'Confirm buyer, decision process, fit and capacity.', earningBoundary: 'Accepted discovery may earn independently of the later sale.' },
  { from: 'discovery', to: 'closed', event: 'The useful answer is no build', decision: 'Deliver the decision evidence and close the scope.', earningBoundary: 'Paid evidence work can be successful without an implementation fee.' },
  { from: 'qualified', to: 'contracting', event: 'The customer chooses a contracting route', decision: 'Select independent prime, Intent prime, provider prime or separate scopes.', earningBoundary: 'Only the chosen business boundary enters each fee ledger.' },
  { from: 'contracting', to: 'discovery', event: 'A new stakeholder or constraint changes the need', decision: 'Requalify, amend or stop; approve any extra investigation.', earningBoundary: 'Repeated presales must have a funder; do not infer unlimited free revisions.' },
  { from: 'contracting', to: 'delivery', event: 'The payer authorizes scope and contributors accept their roles', decision: 'Confirm responsibilities, dependencies and available funding.', earningBoundary: 'A written award starts agreed obligations; it is not already collected cash.' },
  { from: 'contracting', to: 'closed', event: 'The award is lost or the customer declines', decision: 'Close the opportunity while preserving the relationship if appropriate.', earningBoundary: 'Unmet success conditions earn nothing; authorized work and costs still need their agreed treatment.' },
  { from: 'qualified', to: 'paused', event: 'Budget, timing or sponsorship disappears', decision: 'Record the reason and a review condition.', earningBoundary: 'A forecast disappears; already incurred pursuit cost does not.' },
  { from: 'delivery', to: 'paused', event: 'An agreed stop gate or dependency blocks work', decision: 'Use the agreed change or stop process and protect the customer handoff.', earningBoundary: 'Identify committed capacity, cancellation costs and amounts already earned.' },
  { from: 'paused', to: 'discovery', event: 'A sponsor or problem returns', decision: 'Reconfirm permission, scope, current contributions and terms.', earningBoundary: 'Reactivation can merit new scoped work; it does not revive expired payment rights automatically.' },
  { from: 'delivery', to: 'acceptance', event: 'A milestone and its evidence are ready', decision: 'The authorized reviewer applies the agreed acceptance criteria.', earningBoundary: 'An independent evaluator earns for sound review, including unfavorable findings.' },
  { from: 'acceptance', to: 'disputed', event: 'Scope, acceptance or attribution is contested', decision: 'Separate undisputed work from the exception and name the resolver.', earningBoundary: 'Track the disputed amount and funding exposure without deleting obligations.' },
  { from: 'disputed', to: 'delivery', event: 'The parties agree remediation or changed scope', decision: 'Identify whether this is owed correction or separately authorized work.', earningBoundary: 'Use the agreed remedy or new budget; avoid a second payment for the same duty.' },
  { from: 'acceptance', to: 'operating', event: 'The customer accepts and buys continuing service', decision: 'Authorize service coverage, current account work and maintenance.', earningBoundary: 'A new service period has its own contributors and earning bases.' },
  { from: 'operating', to: 'discovery', event: 'Renewal, another department or a new workflow is considered', decision: 'Review actual value, customer preference, new scope and capacity.', earningBoundary: 'Prior attribution alone does not create a perpetual renewal or expansion commission.' },
  { from: 'operating', to: 'closed', event: 'The customer self-operates, changes supplier or ends service', decision: 'Agree handover, access removal, retained rights and remaining duties.', earningBoundary: 'Exit ends future work as agreed; it does not erase unpaid earned fees.' },
  { from: 'acceptance', to: 'closed', event: 'The bounded project is complete with no continuing service', decision: 'Finish handover and reconcile the remaining record.', earningBoundary: 'Final acceptance, final invoice and final collection remain separate events.' },
];

export const lessonsForChapter = id => researchLessons.filter(lesson => lesson.chapters.includes(id));
