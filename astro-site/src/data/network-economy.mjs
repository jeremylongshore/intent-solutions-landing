/** Public educational proposal. No adopted constitution, compensation plan or entity change. */

export const networkEconomySources = [
  {
    id: 'enspiral-decisions',
    title: 'Enspiral Handbook: Decisions Agreement',
    url: 'https://handbook.enspiral.com/agreements/decisions.html',
    evidenceRole: 'Primary example of autonomy with explicit collective and delegated mandates.',
    claim: 'Enspiral documents autonomous participants, collective agreements and delegated decisions. Its formal process distinguishes a mandate from an informal proposal.',
    limits: 'A published governance mechanism, not evidence that Intent has adopted it or that consensus guarantees commercial performance.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'enspiral-foundation',
    title: 'Enspiral Handbook: Foundation purpose and structure',
    url: 'https://handbook.enspiral.com/foundation/',
    evidenceRole: 'Primary distinction between network stewardship, ownership and financial return.',
    claim: 'The foundation describes a charitable-purpose structure, decision-oriented shareholding without dividends and a purpose that excludes holding venture financial risk.',
    limits: 'Its ownership and reinvestment rules are specific to Enspiral. They are not an Intent ownership or profit-sharing model.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'enspiral-finance',
    title: 'Enspiral Handbook: Financial Agreement',
    url: 'https://handbook.enspiral.com/agreements/financial.html',
    evidenceRole: 'Primary example of separating operating resources from collaborative funding.',
    claim: 'Enspiral separates a board-controlled core fund from collaborative funds governed through approved processes.',
    limits: 'The agreement describes governance, not audited profitability or a transferable contribution rate.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'open-collective-hosting',
    title: 'Open Collective: Fiscal hosting',
    url: 'https://opencollective.com/fiscal-hosting',
    evidenceRole: 'Primary example of shared legal and financial administration with a named responsible entity.',
    claim: 'A fiscal host can provide an unincorporated group with a legal entity, money handling, accounting and payment infrastructure.',
    limits: 'Intent is not claiming fiscal-host status, charitable treatment or authority to hold other parties’ funds. A commercial network needs its own structure.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'open-collective-host-closure',
    title: 'Open Collective: Statement on the Foundation’s dissolution',
    url: 'https://blog.opencollective.com/open-collective-official-statement-ocf-dissolution/',
    evidenceRole: 'Primary documentation of a host failure and the boundary between host and platform.',
    claim: 'In February 2024 the platform described the Foundation’s announced dissolution and explained that the host organizations were legally independent from the platform and each other.',
    limits: 'The platform said it did not know the exact reasons for the host’s decision. This is not evidence that every host or the software platform failed.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'cotech-network',
    title: 'CoTech: Cooperative Technologists',
    url: 'https://www.coops.tech/',
    evidenceRole: 'Primary example of a federation presenting complementary technology capabilities.',
    claim: 'CoTech publicly presents a UK network of worker-owned technology businesses offering discovery, development, hosting and support.',
    limits: 'Its public service presence demonstrates a federation mechanism, not a guaranteed source of projects or an audited margin for each member.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'cotech-membership',
    title: 'CoTech: Membership',
    url: 'https://www.coops.tech/join',
    evidenceRole: 'Primary evidence of a defined membership boundary and shared peer infrastructure.',
    claim: 'CoTech’s current membership route is for UK worker cooperatives through the workers.coop federation; it also describes peer mentoring, gatherings and a work-sharing forum.',
    limits: 'Intent’s proposed international mix of individuals and independent firms is different. These eligibility and ownership rules are not being imported.',
    checkedAt: '2026-10-12',
  },
];

export const networkEconomyStateLabels = [
  { id: 'existing', label: 'Evidenced today', meaning: 'Use only for an identifiable current artifact, operating service or executed arrangement.' },
  { id: 'underway', label: 'Under development', meaning: 'Work has started, but the required agreement, capacity or operating evidence is incomplete.' },
  { id: 'proposed', label: 'V1 proposal', meaning: 'A design to discuss and test; it grants no authority, ownership, payment or delivery rights.' },
  { id: 'unproven', label: 'Commercially unproven', meaning: 'Demand, repeatability, incentives, margin or resilience still need evidence.' },
];

export const networkEconomy = {
  id: 'network-economy',
  title: 'Independent businesses. Shared operating power.',
  kicker: 'The proposed network economy',
  lead: 'Intent’s wider ambition is a production network where independent people and firms combine relationships, expertise and reusable systems to deliver work that none needs to own alone.',
  status: 'proposed',
  definition: 'A proposed federation of independent businesses, temporary delivery teams and maintained common assets, coordinated through explicit agreements and accountable roles.',
  disclaimer: 'This is a V1 institutional design for discussion and bounded experiments. It is not an adopted constitution, investment offer, compensation plan or claim of an operating marketplace. “DAO-type” describes the ambition for distributed coordination here; it does not assume blockchain, tokens, pooled ownership or autonomous legal authority.',
  stateLabels: networkEconomyStateLabels,
  guidingQuestion: 'What can we coordinate together while keeping each participant’s business, judgment and customer obligations clear?',
  dimensions: [
    {
      id: 'contribution', title: 'Contribution', question: 'What did this participant actually bring?',
      record: 'Consented relationships, discovery, selling, domain judgment, engineering, assurance, operation, teaching, IP or infrastructure.',
      rule: 'Record distinct contributions and their evidence. Relationship value may extend beyond logged hours; the earning method is still agreed explicitly.',
      boundary: 'A referral, ongoing account stewardship and delivery are different contributions, even when one participant performs all three.',
    },
    {
      id: 'authority', title: 'Authority', question: 'What may this participant decide or commit?',
      record: 'A role mandate naming scope, budget, decision limits, escalation, expiry and who can revoke it.',
      rule: 'Delegate decisions close to the work. Reserve customer commitments, shared expenditure and brand use for the actors actually authorized to make them.',
      boundary: 'Reputation, community status and technical skill do not automatically authorize spending, contracting or speaking for every participant.',
    },
    {
      id: 'earning', title: 'Earning', question: 'What event creates an obligation to pay?',
      record: 'The payer, recipient business, work or success event, calculation basis, cap, acceptance, cancellation treatment and payment date.',
      rule: 'Choose fixed work fees, time-based fees, retainers, specific success fees or negotiated role participation to match the actual contribution and risk.',
      boundary: 'Attribution is not a payable invoice. Company receipts are not personal take-home pay, and a shared opportunity is not guaranteed revenue.',
    },
    {
      id: 'rights', title: 'Rights', question: 'What remains independent, and what is permitted to be shared?',
      record: 'Pre-existing customers and IP, newly created work, data permissions, licenses, brand permission and publication consent.',
      rule: 'Each participant keeps its unrelated business and reserved assets. A project or common asset receives only the rights the parties deliberately grant.',
      boundary: 'Participation does not transfer an entire customer book, create automatic equity or authorize publishing a customer’s confidential work.',
    },
    {
      id: 'risk', title: 'Risk', question: 'Who must act when the work, money or relationship fails?',
      record: 'Named contracting entities, delivery owners, acceptance duties, funding gaps, remediation, insurance and liability boundaries.',
      rule: 'Attach responsibility to a real actor at each boundary. Price coordination and risk where they are actually carried.',
      boundary: 'A network label does not absorb liability. Independence must reflect the actual working relationship, not merely the agreement’s wording.',
    },
    {
      id: 'exit', title: 'Exit', question: 'How can a participant leave without stranding the customer?',
      record: 'Notice, active commitments, earned unpaid amounts, credential revocation, lawful data return, handover, license survival and dispute resolution.',
      rule: 'Make departure and replacement operationally possible before a team starts. Preserve existing obligations and valid rights while ending future access.',
      boundary: 'Leaving is not permission to abandon accepted work, erase a debt, copy confidential data or claim perpetual income from later unrelated projects.',
    },
  ],
  layers: [
    {
      id: 'independent-businesses', title: 'Independent businesses', status: 'proposed',
      purpose: 'People and firms retain their own customers, identity, assets and choice of engagements.',
      authority: 'Each business controls its own commitments and authorizes participation for a bounded scope.',
      funding: 'Its own business funds its own obligations unless another payer explicitly agrees otherwise.',
    },
    {
      id: 'shared-operating-layer', title: 'Shared operating layer', status: 'proposed',
      purpose: 'Intent can maintain qualification, technical standards, discovery support, contracting coordination, evidence records and shared tools.',
      authority: 'Specific stewardship mandates identify what Intent may decide; the network is not assumed to vote on or own Intent’s company.',
      funding: 'A priced operating service, an agreed engagement contribution or an opt-in asset budget could fund this work; the choice remains open.',
    },
    {
      id: 'engagement-teams', title: 'Engagement teams', status: 'proposed',
      purpose: 'The smallest suitable team forms around a customer outcome, then operates, hands over or dissolves when that scope ends.',
      authority: 'The selected prime, customer sponsor and named delivery lead have different powers that the scope makes explicit.',
      funding: 'The actual payer funds authorized work. Supplier due dates, acceptance events and collections remain separate.',
    },
    {
      id: 'maintained-commons', title: 'Maintained common assets', status: 'proposed',
      purpose: 'Permitted skills, components, evaluation methods and teaching material can make later work faster and more dependable.',
      authority: 'Maintainers govern a defined asset under its license and mandate, not every product or participant using it.',
      funding: 'Maintenance requires a budget and an owner. Open publication, commercial licensing and customer-funded work are distinct choices.',
    },
  ],
  contractModes: [
    { id: 'intent-prime', title: 'Intent is prime', customerContract: 'Customer ↔ Intent', role: 'Intent selects and manages authorized delivery suppliers for this scope.', boundary: 'Intent carries the obligations it accepts; an independent’s unrelated customer relationships remain outside the arrangement.' },
    { id: 'independent-prime', title: 'Another business is prime', customerContract: 'Customer ↔ independent firm, provider or integrator', role: 'Intent can supply a specialist work package, assurance, tools or coordination.', boundary: 'Intent’s earning base is its agreed package, not the prime’s entire customer invoice.' },
    { id: 'separate-scopes', title: 'Separate direct scopes', customerContract: 'Customer ↔ each selected supplier', role: 'Participants coordinate dependencies while each carries its own customer commitment.', boundary: 'The interface owner, acceptance sequence and escalation path must prevent gaps between scopes.' },
    { id: 'joint-pursuit', title: 'Pursue together; choose the delivery structure', customerContract: 'Pursuit agreement first; delivery contracts only after selection', role: 'Participants fund and divide discovery, selling, solution design and proposal work deliberately.', boundary: 'A joint pursuit is not a joint venture, a customer award or permission for one participant to bind the others.' },
  ],
  agreementSpine: [
    { id: 'participation', title: 'Participation foundation', output: 'Identity, conduct, confidentiality, qualification, dispute route and independence.', boundary: 'Creates no automatic job, commission, company ownership or permission to use the brand.' },
    { id: 'opportunity', title: 'Account and opportunity charter', output: 'Existing, new, reactivated and overlapping relationships; consent; scope boundary; current steward; pursuit budget.', boundary: 'Resolve competing relationship claims and authorized outreach before someone promises the same opportunity twice.' },
    { id: 'engagement', title: 'Engagement and role schedule', output: 'Prime, payer, deliverables, decision mandates, role earnings, IP rights, risk and payment triggers.', boundary: 'One person may hold several roles, but each earning event must describe distinct value.' },
    { id: 'operation', title: 'Operation and evidence', output: 'Accepted work, evaluations, customer decisions, costs, invoices, collections and current capacity.', boundary: 'Keep contribution attribution, authority, payable obligations and bank cash as separate records.' },
    { id: 'renewal-exit', title: 'Renewal, expansion or exit', output: 'A fresh scope, current role needs, revised capacity, new rights and a tested handover or closeout.', boundary: 'Prior work remains acknowledged; future fees require a continuing contractual basis.' },
  ],
  sharedAssets: {
    title: 'The common assets need economics of their own',
    lead: 'A reusable skill is not free to maintain simply because it can be copied. Decide which rights are shared, which work is paid and who can stop an unsustainable commitment.',
    choices: [
      { id: 'open-core', title: 'Licensed public asset', rule: 'Publish only work whose owners permit it. Fund optional implementation, assurance or support separately from the public license.' },
      { id: 'shared-purchase', title: 'Jointly funded component', rule: 'Buy a defined common build or maintenance period with scoped customer adaptations. Set acceptance and cancellation rules before shared spending.' },
      { id: 'commercial-license', title: 'Commercial asset or license', rule: 'Retain agreed proprietary rights and price permitted use, redistribution or white-label operation explicitly. No automatic royalty to every network participant.' },
      { id: 'reinvestment', title: 'Deliberate reinvestment', rule: 'Choose a maintenance or learning budget from genuinely available funds after obligations, tax and working-capital needs. Record one allocation once; a reserve is not a second earned margin.' },
    ],
    decisionBoundary: 'Who approves these budgets and whether any participant has a vote are design decisions. A reputation score must not silently become ownership, voting power or a financial entitlement.',
  },
  experiments: [
    {
      id: 'portable-operation', title: 'A workflow that can change operators', status: 'proposed',
      proposition: 'Test whether an independent delivery team can hand a real AI workflow to another qualified operator without rebuilding it or depending on the original builder.',
      buyer: 'A customer that wants continuity and supplier choice.',
      payer: 'The customer buys a bounded implementation and transfer exercise; future operation is separately agreed.',
      earners: 'The original builder, independent reviewer and receiving operator earn for distinct accepted work.',
      constraints: 'One workflow, two willing firms, a licensed deployment package, a rollback plan and an explicitly funded handover. No promise that every customer can switch every supplier instantly.',
      authority: 'The customer authorizes the transfer; each operator controls its own acceptance and risk. A reviewer records evidence rather than awarding legal authority.',
      validation: 'Measure whether the second operator can deploy, evaluate, observe, roll back and recover the workflow using the agreed package. Record transfer effort, defects and unresolved dependencies.',
      stopRule: 'Stop expansion if undocumented dependencies, unsupported licenses or unaffordable transfer effort prevent safe operation.',
      economy: 'The first engagement pays for usable evidence and portability. Repeatable transfer materials can become a licensed or maintained common asset with the owners’ consent.',
    },
    {
      id: 'change-response', title: 'A shared AI change-response service', status: 'proposed',
      proposition: 'Let a small set of independent firms jointly buy maintenance for a non-confidential evaluation and compatibility suite when models, APIs or agent harnesses change.',
      buyer: 'Firms repeatedly supporting the same integration or workflow pattern.',
      payer: 'Opt-in firms purchase a defined maintenance window and deliverables under an agreed budget.',
      earners: 'Maintainers earn for releases; independent reviewers earn for validation; a coordinator earns for actual scheduling and administration.',
      constraints: 'One reusable integration, a fixed period, capped spend, permitted test data and no unlimited emergency-support promise. A sponsor gets no hidden editorial veto.',
      authority: 'Contributors decide the budget mandate through the agreed process; maintainers decide implementation inside it. Customer deployment approval stays with the customer’s operator.',
      validation: 'Compare total upkeep and regression-detection effort with the firms’ previous separate work. Count genuine adopters and paid renewals separately from downloads.',
      stopRule: 'End or reprice if the funded capacity cannot cover the declared maintenance scope, review independence fails or no firm chooses to renew.',
      economy: 'A shared operating service earns from a concrete maintenance job. It needs no network-wide token or claim on participating firms’ unrelated revenue.',
    },
    {
      id: 'capacity-option', title: 'A paid option on verified delivery capacity', status: 'proposed',
      proposition: 'Test whether a customer or prime will pay a specialist firm to reserve a small, time-limited capacity window after a paid discovery decision.',
      buyer: 'A prime or customer whose deployment timing is uncertain but delay would be costly.',
      payer: 'The party requesting the reservation pays an agreed capacity option; implementation is another scope if activated.',
      earners: 'The firm earns for a genuine reservation commitment; the specialist earns under its own firm’s arrangement; qualification and coordination are separately priced when needed.',
      constraints: 'One named capability window, explicit availability evidence, cancellation/expiry rules and no double-booking. Any credit toward later delivery must be written down.',
      authority: 'The firm controls what it commits. The buyer alone activates its purchased option within its terms; a network directory cannot commit anyone’s time.',
      validation: 'Test whether buyers value reserved capacity, whether the firm actually honors it and whether reservation income covers the opportunity cost of keeping the slot available.',
      stopRule: 'Stop if customers will not fund the reservation, capacity is represented twice or standby obligations exceed the firm’s ability to deliver.',
      economy: 'This separates a useful capacity promise from unpaid community membership. The reservation is a limited commercial service, not a tradeable claim on a person.',
    },
  ],
  analogues: [
    {
      id: 'enspiral', title: 'Enspiral: autonomy with explicit mandates',
      demonstratedMechanism: 'Its handbook shows how autonomous people and ventures can maintain shared decision processes and distinguish core operations from collaborative funding.',
      usefulForIntent: 'Borrow the discipline of documented mandates, separate budgets and clear ownership of collective decisions.',
      limit: 'Enspiral’s foundation separates governance shareholding from dividends and is not designed to absorb venture risk. Intent has not adopted that ownership structure or its decision rules.',
      evidenceBoundary: 'Documented institutional design; no claim that this proves Intent’s margins or guarantees democratic decision-making will be fast.',
      sourceIds: ['enspiral-decisions', 'enspiral-foundation', 'enspiral-finance'],
    },
    {
      id: 'open-collective', title: 'Open Collective: shared administration needs a responsible entity',
      demonstratedMechanism: 'Fiscal hosting supplies groups with money handling and financial administration through a named legal organization.',
      usefulForIntent: 'Make the custodian, approval authority, reporting duties and exit path visible when any common budget is proposed.',
      limit: 'A major host announced dissolution in 2024; the platform explained that hosts were separate organizations. Shared software does not remove an operator’s financial fragility.',
      evidenceBoundary: 'The platform did not know the host’s exact reasons for closing. Intent is not announcing a fiscal host, nonprofit structure or custody service.',
      sourceIds: ['open-collective-hosting', 'open-collective-host-closure'],
    },
    {
      id: 'cotech', title: 'CoTech: complementary firms can present a common capability',
      demonstratedMechanism: 'Its public network combines technology services with member forums, mentoring and shared professional relationships.',
      usefulForIntent: 'Build a discoverable capability network without assuming every engagement must run through one company or erase the identity of its delivery firms.',
      limit: 'CoTech’s current membership is for UK worker cooperatives. Intent’s proposed international mix has different ownership, eligibility and contracting questions.',
      evidenceBoundary: 'A visible operating federation and published service offer; no guarantee of member utilization, sales or profit.',
      sourceIds: ['cotech-network', 'cotech-membership'],
    },
  ],
  decisions: [
    { id: 'mandate', question: 'What exactly is Intent authorized to coordinate?', criterion: 'Name the service, payer, decision scope and accountable entity before adding network-wide authority.' },
    { id: 'qualification', question: 'What earns a delivery or stewardship mandate?', criterion: 'Use relevant evidence, actual availability and role fit; allow reassessment, challenge and expiry.' },
    { id: 'funding', question: 'Who pays for the common operating layer?', criterion: 'Test a specific service fee or opt-in budget against delivered value before adopting any general contribution rule.' },
    { id: 'voice', question: 'Which decisions need participant voice, and which need one owner?', criterion: 'Separate consultation, delegated authority, legal control and economic rights; do not treat them as one membership benefit.' },
    { id: 'rights', question: 'What can be reused, and what stays with its creator or customer?', criterion: 'Define background IP, project work, data, licensing and publication permissions at the relevant asset boundary.' },
    { id: 'focus', question: 'Does this network make a real engagement better?', criterion: 'Start with one funded experiment. If coordination costs exceed its customer and participant value, simplify the structure.' },
  ],
  sources: networkEconomySources,
};

const sourceIds = new Set(networkEconomySources.map(source => source.id));
if (sourceIds.size !== networkEconomySources.length) throw new TypeError('Duplicate network economy source IDs');
for (const source of networkEconomySources) {
  if (!source.title || !source.evidenceRole || new URL(source.url).protocol !== 'https:') {
    throw new TypeError(`Invalid network economy source: ${source.id}`);
  }
}
for (const analogue of networkEconomy.analogues) {
  for (const id of analogue.sourceIds) {
    if (!sourceIds.has(id)) throw new TypeError(`Unknown network economy source: ${id}`);
  }
}
