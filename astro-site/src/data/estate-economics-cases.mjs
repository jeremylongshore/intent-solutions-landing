/**
 * Public teaching data. Every person, price, volume and agreement below is fictional.
 * Sources establish possible mechanisms, never the scenario rates or Intent eligibility.
 * All financial totals are calculated from the ledgers; no parallel hand-maintained totals.
 */

export const economicsDisclaimer =
  'These are fictional worked examples, not Intent Solutions prices, compensation terms, ' +
  'customer results, forecasts or offers. “Revenue” means illustrative contracted fees or ' +
  'billings within the stated scenario and horizon; it does not establish accounting ' +
  'recognition, an invoice already sent or cash collected. Conditional fees require their ' +
  'specified event. Supplier receipts are gross business invoices, not individual take-home ' +
  'pay. Contribution is fees less the listed direct costs, before central overhead and tax; ' +
  'a reserve is a proposed holdback, not an additional expense. Amounts are USD. Program ' +
  'sources explain mechanisms, not Intent enrollment, guaranteed opportunities or payment ' +
  'rights. Credits are not cash. Each real engagement needs its own agreed scope and terms.';

export const economicsCostCategories = {
  commercial: 'Selling and discovery',
  delivery: 'Delivery and assurance',
  operating: 'Vendors and administration',
};

export const economicsSources = [
  {
    id: 'anthropic-partners',
    title: 'Anthropic: Services Track and Partner Hub',
    url: 'https://www.anthropic.com/news/services-track-partner-hub',
    evidenceRole: 'Distinguishes practice standing from referral credit and deal protection.',
    claim: 'Anthropic describes practice standing and bringing new business as separate tracks.',
    limits: 'Does not establish any scenario fee, Intent tier, inbound work or cash entitlement.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'openai-partners',
    title: 'OpenAI Partner Network',
    url: 'https://openai.com/business/partners/',
    evidenceRole: 'Shows an official build, co-sell and delivery program.',
    claim: 'OpenAI describes co-selling, enablement and delivery support with an application route.',
    limits: 'No claim of Intent enrollment, procurement approval, referral rate or awarded work.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'aws-funding',
    title: 'AWS Partner Central: Creating a fund request',
    url: 'https://docs.aws.amazon.com/partner-central/latest/getting-started/create-fund-request.html',
    evidenceRole: 'Separates funding approval, cash claims, invoices and credits.',
    claim: 'AWS describes pre-approval, cash purchase orders or credit codes, completed-work claims and invoice approval.',
    limits: 'Eligibility and program terms apply; the customer-paid discovery example is not an AWS award.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'aws-disbursements',
    title: 'AWS Marketplace: Managing disbursements',
    url: 'https://docs.aws.amazon.com/marketplace/latest/userguide/managing-disbursements.html',
    evidenceRole: 'Explains why accepted work and available cash can occur at different times.',
    claim: 'AWS Marketplace disburses funds after customer collection; bank processing follows disbursement.',
    limits: 'A marketplace example only; other procurement and payment routes have their own terms.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'microsoft-consent',
    title: 'Microsoft: Manage co-sell opportunities',
    url: 'https://learn.microsoft.com/en-us/partner-center/referrals/manage-co-sell-opportunities',
    evidenceRole: 'Supports a customer-consent gate before sharing contact details in co-sell.',
    claim: 'Microsoft asks partners to obtain customer consent before sharing contact details.',
    limits: 'Does not grant another firm ownership of an account, a universal commission or guaranteed seller help.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'langfuse-offers',
    title: 'Langfuse: Self-hosted pricing',
    url: 'https://langfuse.com/pricing-self-host',
    evidenceRole: 'A public example separating open-source software from paid enterprise capabilities and support.',
    claim: 'Langfuse distinguishes its free self-hosted offering from paid enterprise capabilities and support.',
    limits: 'This is an offer structure, not evidence of Intent demand, profitability or transferable pricing.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'github-sponsors',
    title: 'GitHub Sponsors: Sponsorships, fees and taxes',
    url: 'https://docs.github.com/en/sponsors/sponsoring-open-source-contributors/about-sponsorships-fees-and-taxes',
    evidenceRole: 'Shows a distinct sponsorship route for eligible open-source contributors.',
    claim: 'GitHub documents sponsorship payments and fees that depend on the sponsoring account and payment method.',
    limits: 'Sponsorship is not a guaranteed sale, support contract or license transfer; no sponsorship is assumed in the ledgers.',
    checkedAt: '2026-10-12',
  },
  {
    id: 'aws-resale',
    title: 'AWS Marketplace: Channel Partner private offers',
    url: 'https://docs.aws.amazon.com/marketplace/latest/userguide/channel-partner-offers.html',
    evidenceRole: 'Distinguishes approved resale from ordinary vendor consumption.',
    claim: 'Channel Partner private offers use a software vendor’s selling authorization and negotiated wholesale cost.',
    limits: 'This does not authorize resale of an arbitrary model, API, dataset or contributor’s software.',
    checkedAt: '2026-10-12',
  },
];

const fee = (id, label, quantity, rate, unit = 'scope', conditional = false) =>
  ({ id, label, quantity, rate, unit, conditional });

const cost = (id, label, category, quantity, rate, recipient, earnTrigger, paymentTrigger, unit = 'hours') =>
  ({ id, label, category, quantity, rate, unit, recipient, earnTrigger, paymentTrigger });

const benefit = (role, text, earningCondition) => ({ role, benefit: text, earningCondition });
const change = (target, id, values) => ({ target, id, ...values });

export const economicsCases = [
  {
    id: 'relationship-led-project',
    title: 'A relationship becomes an accountable project',
    category: 'Projects and relationships',
    horizon: 'One eight-week delivery engagement, including authorized pursuit work',
    summary: 'An independent firm reopens a dormant customer conversation. The customer chooses Intent as prime for one defined workflow deployment.',
    buyer: 'An operations leader with a bounded workflow problem',
    payer: 'The customer pays Intent under this project’s agreement',
    companyRole: 'Intent as the selected project prime',
    contractingRoute: 'Independent relationship → consent and opportunity charter → customer–Intent scope → separate role work orders.',
    customerBenefit: 'One accountable delivery lead, acceptance evidence and an operating handover. The budget buys specified work; it does not prove a dollar return for the customer.',
    participantBenefits: [
      benefit('Independent relationship steward', 'Keeps its unrelated clients and earns for scoped relationship work plus a distinct success event.', 'Authorized stewardship work and the separately defined collection milestone; no perpetual account tax.'),
      benefit('Specialists and independent firms', 'Receive defined discovery, engineering, assurance or operating work packages.', 'Each package has its own acceptance and invoice schedule; combining roles cannot duplicate the same work.'),
      benefit('Intent as prime', 'Coordinates delivery, holds the customer scope and retains the project contribution shown below.', 'Must fund obligations, resolve defects and meet the accepted scope; contribution is not personal pay.'),
    ],
    revenue: [fee('project', 'Defined workflow deployment', 1, 80000)],
    costs: [
      cost('stewardship', 'Relationship development and stewardship', 'commercial', 24, 100, 'Independent steward business', 'Authorized account work completed', 'Approved monthly invoice'),
      cost('success', 'Qualified opportunity success event', 'commercial', 1, 400, 'Independent steward business', 'Agreed opportunity closes and first customer payment clears', 'Within agreed period after that event', 'event'),
      cost('discovery', 'Discovery and business case', 'commercial', 24, 110, 'Discovery specialist business', 'Accepted discovery evidence', 'Milestone invoice'),
      cost('architecture', 'Presales architecture and proof', 'commercial', 32, 130, 'Architecture specialist business', 'Authorized proof delivered', 'Milestone invoice, whether or not a later expansion sells'),
      cost('close', 'Procurement and commercial close', 'commercial', 16, 100, 'Commercial specialist business', 'Authorized procurement work completed', 'Approved invoice'),
      cost('lead', 'Accountable engagement lead', 'delivery', 48, 120, 'Delivery lead business', 'Accepted delivery-management work', 'Monthly invoice'),
      cost('engineering', 'Engineering execution', 'delivery', 360, 80, 'Engineering firm', 'Agreed implementation milestones accepted', 'Milestone invoices'),
      cost('qa', 'Independent assurance', 'delivery', 64, 75, 'Assurance specialist business', 'Review and test evidence delivered', 'Milestone invoices'),
      cost('handover', 'Operations, adoption and handover', 'delivery', 40, 90, 'Operations specialist business', 'Runbook and adoption work accepted', 'Handover invoice'),
      cost('tools', 'Model, cloud and project tools', 'operating', 1, 1800, 'Technology vendors', 'Metered consumption or licensed period', 'Vendor billing cycle', 'project allowance'),
      cost('component', 'Permitted reusable component maintenance', 'delivery', 1, 2000, 'Component maintainer business', 'Agreed maintenance and usage rights supplied', 'Agreed milestone', 'package'),
      cost('admin', 'Project administration allocation', 'operating', 24, 75, 'Project administration function', 'Project-specific administration performed', 'Budgeted as incurred'),
    ],
    reserve: 4000,
    paymentTerms: ['Illustrative customer milestones: 40% mobilization, 30% accepted intermediate work and 30% accepted handover.', 'Supplier due dates remain separate from customer collection. The prime must fund the gap or agree different terms before work.', 'Renewal, another department and a new scope require a fresh role schedule; prior attribution alone earns nothing new.'],
    downside: {
      label: 'Unpriced rework plus a disputed final scope',
      changes: [change('revenue', 'project', { rate: 72000 }), change('cost', 'engineering', { quantity: 520 }), change('cost', 'qa', { quantity: 96 })],
      extraCosts: [],
      explanation: 'A negotiated fee reduction and additional unpaid implementation/assurance effort consume the margin. The reserve does not make the loss disappear.',
    },
    assumptions: ['All rates are teaching inputs, not local or international market medians. In particular, $75–$80 contractor inputs may understate specialist pricing and nonbillable time.', 'Trust and customer access can be valued through fixed fees, a negotiated success component, a retainer or role profit participation; logged hours are only this example’s budgeting convention.', 'The independent keeps pre-existing IP and unrelated business. The customer consents to participating firms and the opportunity boundary.', 'The scenario includes the authorized pursuit costs; it assumes no prior unpaid sales effort outside that budget.'],
    sourceIds: ['microsoft-consent'],
  },
  {
    id: 'independent-prime',
    title: 'The independent firm keeps the customer contract',
    category: 'Projects and relationships',
    horizon: 'One four-week specialist work package',
    summary: 'An independent firm brings its existing customer and remains prime. It purchases a bounded architecture and implementation package from Intent.',
    buyer: 'An independent firm that needs specialist capacity',
    payer: 'The independent prime pays Intent',
    companyRole: 'Intent as a specialist subcontractor',
    contractingRoute: 'Customer → independent prime → Intent work package → authorized specialists.',
    customerBenefit: 'The customer keeps its chosen supplier while that firm adds specialist capability. Intent’s package price is not the prime’s complete customer invoice.',
    participantBenefits: [
      benefit('Independent prime', 'Keeps its customer agreement and manages the wider engagement.', 'Its own margin and obligations are outside this package ledger.'),
      benefit('Intent', 'Earns a defined subcontract fee for a documented delivery boundary.', 'Package acceptance and invoice conditions; no share of unrelated prime revenue.'),
      benefit('Specialists', 'Receive authorized engineering and review packages.', 'Their work orders identify acceptance, due dates and remediation limits.'),
    ],
    revenue: [fee('package', 'Specialist delivery package', 1, 15000)],
    costs: [
      cost('engineering', 'Engineering', 'delivery', 72, 100, 'Engineering business', 'Package milestones accepted', 'Milestone invoice'),
      cost('architecture', 'Architecture', 'delivery', 12, 150, 'Architecture business', 'Design accepted', 'Design invoice'),
      cost('qa', 'Assurance', 'delivery', 12, 100, 'Assurance business', 'Evidence delivered', 'Review invoice'),
      cost('handover', 'Handover', 'delivery', 8, 100, 'Operations business', 'Prime accepts handover', 'Completion invoice'),
      cost('admin', 'Subcontract administration', 'operating', 8, 75, 'Administration function', 'Administration performed', 'As incurred'),
      cost('tools', 'Tools', 'operating', 1, 400, 'Vendors', 'Service consumed', 'Vendor cycle', 'package allowance'),
    ],
    reserve: 1000,
    paymentTerms: ['The prime’s customer invoice is not included here.', 'Define who may accept the package and whether any upstream acceptance is actually required.', 'Customer delays must not silently change subcontract scope or payment terms.'],
    downside: { label: 'An extra integration is absorbed without a change order', changes: [change('cost', 'engineering', { quantity: 104 })], extraCosts: [], explanation: 'A narrow package turns into a loss when unpriced work is treated as part of the original promise.' },
    assumptions: ['The independent firm’s unrelated clients, accounts and IP remain outside the agreement.', 'No blanket revenue share is charged merely for joining a network.'],
    sourceIds: [],
  },
  {
    id: 'integrator-prime',
    title: 'A provider or integrator buys a work package',
    category: 'Provider and procurement routes',
    horizon: 'One six-week subcontract',
    summary: 'A fictional approved integrator awards a defined work package. A provider relationship alone would not create this purchase order.',
    buyer: 'An integrator’s delivery and procurement team',
    payer: 'The integrator, under its own signed work order',
    companyRole: 'Intent as the integrator’s subcontractor',
    contractingRoute: 'End customer → integrator prime → Intent subcontract → delivery suppliers.',
    customerBenefit: 'The integrator obtains accountable specialist delivery while keeping its wider obligations. The end customer’s total deal value is deliberately outside this ledger.',
    participantBenefits: [
      benefit('Integrator prime', 'Adds delivery capacity with agreed evidence and handover.', 'Pays the defined work package; its own economics are not assumed.'),
      benefit('Intent and delivery suppliers', 'Can earn for actual procurement, reporting, engineering and assurance work.', 'Approved scope, acceptance and invoices; partner status itself earns no modeled payment.'),
    ],
    revenue: [fee('package', 'Approved integrator work package', 1, 36000)],
    costs: [
      cost('engineering', 'Engineering', 'delivery', 180, 100, 'Engineering business', 'Milestones accepted', 'Approved invoice'),
      cost('lead', 'Technical leadership', 'delivery', 24, 150, 'Lead business', 'Authorized leadership delivered', 'Monthly invoice'),
      cost('qa', 'Assurance', 'delivery', 24, 100, 'Assurance business', 'Required evidence accepted', 'Review invoice'),
      cost('handover', 'Operating handover', 'delivery', 12, 100, 'Operations business', 'Handover accepted', 'Completion invoice'),
      cost('coordination', 'Vendor onboarding and reporting', 'commercial', 12, 100, 'Coordination function', 'Required onboarding/reporting completed', 'Approved invoice'),
      cost('tools', 'Tools and environments', 'operating', 1, 1000, 'Vendors', 'Consumed or licensed service', 'Vendor cycle', 'package allowance'),
    ],
    reserve: 2000,
    paymentTerms: ['The example assumes an actual work order, not a referral, portal opportunity or application.', 'Acceptance and the procurement invoice clock are explicit; the integrator’s collection date does not automatically control every subcontract invoice.'],
    downside: { label: 'Reporting and assurance requirements were underpriced', changes: [change('cost', 'lead', { quantity: 64 }), change('cost', 'qa', { quantity: 44 })], extraCosts: [], explanation: 'Additional lead and review time leaves too little contribution for the planned reserve and central overhead.' },
    assumptions: ['Provider referrals, co-selling, provider-funded proof and provider-as-prime procurement are different routes.', 'Anthropic and OpenAI links show public program mechanisms only. No Intent status, award or provider commission is claimed.'],
    sourceIds: ['anthropic-partners', 'openai-partners', 'aws-disbursements'],
  },
  {
    id: 'paid-discovery-no-build',
    title: 'Paid discovery can correctly end with no build',
    category: 'Discovery and proof',
    horizon: 'One two-week decision package; downside is a separate lost pursuit',
    summary: 'A customer buys enough investigation to make a deployment decision. The evidence says not to proceed, so no implementation sale follows.',
    buyer: 'A budget owner deciding whether a workflow merits investment',
    payer: 'The customer funds an authorized discovery scope',
    companyRole: 'Intent as the discovery supplier',
    contractingRoute: 'Customer → paid discovery → evidence and decision → stop or separately authorize a build.',
    customerBenefit: 'A documented no-build decision can prevent a larger unsuitable commitment. No avoided-cost dollar claim is invented.',
    participantBenefits: [
      benefit('Customer', 'Keeps an independently useful decision package.', 'Pays for investigation, not a predetermined recommendation to build.'),
      benefit('Investigators and Intent', 'Earn for authorized evidence work even when there is no later sale.', 'Discovery deliverables and their acceptance conditions, not a speculative future project.'),
    ],
    revenue: [fee('discovery', 'Decision and evidence package', 1, 6000)],
    costs: [
      cost('domain', 'Workflow investigation', 'delivery', 12, 125, 'Domain specialist business', 'Findings delivered', 'Discovery invoice'),
      cost('architecture', 'Feasibility and architecture', 'delivery', 16, 150, 'Architecture business', 'Evidence and options delivered', 'Discovery invoice'),
      cost('review', 'Independent challenge', 'delivery', 8, 100, 'Reviewer business', 'Decision review completed', 'Review invoice'),
      cost('tools', 'Bounded proof resources', 'operating', 1, 200, 'Vendors', 'Resources consumed', 'Vendor cycle', 'allowance'),
      cost('admin', 'Project administration', 'operating', 4, 75, 'Administration function', 'Authorized administration', 'As incurred'),
    ],
    reserve: 0,
    paymentTerms: ['Discovery has its own acceptance and payment terms. A build requires another authorization.', 'If a provider funds proof instead, establish the actual payer, approval and claim process before costs begin. A cloud credit cannot pay a specialist invoice.'],
    downside: {
      label: 'Lost pursuit: no discovery contract was signed',
      changes: [change('revenue', 'discovery', { quantity: 0 }), ...['domain', 'architecture', 'review', 'tools', 'admin'].map(id => change('cost', id, { quantity: 0 }))],
      extraCosts: [cost('pursuit', 'Company-funded pursuit cap', 'commercial', 8, 100, 'Pursuit function', 'Authorized internal pursuit effort', 'Company funds the effort regardless of award')],
      explanation: 'No customer fee is earned. Only the deliberately capped pursuit cost remains; stopping prevents the larger discovery budget from being spent without authorization.',
    },
    assumptions: ['No-build after paid investigation and no-sale before authorization are separate outcomes.', 'Provider approval, purchase order, claim acceptance and cash receipt must not be collapsed into one event.'],
    sourceIds: ['aws-funding'],
  },
  {
    id: 'recurring-assurance',
    title: 'Assurance earns by operating within a real capacity limit',
    category: 'Operations and support',
    horizon: 'One month of a bounded operating service',
    summary: 'A deployed workflow buys scheduled evaluation, operating review and a limited change budget. The scope is not unlimited incident coverage.',
    buyer: 'The workflow’s operating owner',
    payer: 'The customer pays the monthly operating fee',
    companyRole: 'Intent as the operating service supplier',
    contractingRoute: 'Accepted deployment → separate monthly service scope → evidence review → renew, resize or end.',
    customerBenefit: 'An owner, review cadence and defined escalation path make changes and failures visible. The service does not guarantee that every failure is preventable.',
    participantBenefits: [
      benefit('Operator and reviewer', 'Earn for reserved and delivered operating capacity.', 'Named service window, workload and review obligations.'),
      benefit('Current account steward', 'Can earn for actual adoption and service work.', 'A current role schedule; historic introduction alone does not earn an automatic renewal share.'),
    ],
    revenue: [fee('service', 'Bounded operating service', 1, 6000, 'month')],
    costs: [
      cost('qa', 'Scheduled evaluations', 'delivery', 16, 100, 'Assurance business', 'Scheduled evaluation evidence delivered', 'Monthly invoice'),
      cost('operations', 'Operations and escalation', 'delivery', 12, 100, 'Operations business', 'Defined operating duties performed', 'Monthly invoice'),
      cost('maintenance', 'Maintenance capacity', 'delivery', 8, 125, 'Engineering business', 'Authorized maintenance performed', 'Monthly invoice'),
      cost('stewardship', 'Adoption and account service', 'commercial', 4, 125, 'Account service business', 'Current service duties performed', 'Monthly invoice'),
      cost('tools', 'Monitoring and model resources', 'operating', 1, 400, 'Vendors', 'Service consumed', 'Vendor cycle', 'month'),
      cost('admin', 'Service administration', 'operating', 2, 75, 'Administration function', 'Administration performed', 'As incurred'),
    ],
    reserve: 300,
    paymentTerms: ['The service window, included work and escalation limits are agreed before renewal.', 'Changes beyond capacity are separately priced or deferred, rather than silently promised.'],
    downside: { label: 'An unpriced incident consumes extra engineering', changes: [change('cost', 'maintenance', { quantity: 28 })], extraCosts: [], explanation: 'A recurring invoice is not recurring profit when incident effort is unbounded.' },
    assumptions: ['No 24/7 coverage, uptime promise or unlimited support is implied.', 'The budget includes current account service but no permanent referral percentage.'],
    sourceIds: [],
  },
  {
    id: 'maintained-skills',
    title: 'Open skills; paid implementation and maintenance',
    category: 'Tools and reusable IP',
    horizon: 'Three months, three customer teams',
    summary: 'The published code remains available under its license. Teams pay for installation, a verified configuration and a bounded maintenance service.',
    buyer: 'Engineering teams adopting reusable agent workflows',
    payer: 'Three teams buy onboarding and support',
    companyRole: 'Intent as an implementation and support supplier',
    contractingRoute: 'Public licensed tool → optional paid onboarding → scoped maintenance → renew or self-operate.',
    customerBenefit: 'A supported setup and a route to operating it independently. Paying for support does not retroactively restrict rights already granted by the code license.',
    participantBenefits: [
      benefit('Maintainers', 'Can earn for maintenance and customer-specific work.', 'Mutually agreed rights and service obligations; publishing code does not automatically create royalties.'),
      benefit('Customer teams', 'Can use the licensed code and choose whether ongoing help is useful.', 'The paid service scope is separate from the open-source license.'),
    ],
    revenue: [fee('onboarding', 'Team onboarding', 3, 1500, 'teams'), fee('support', 'Bounded support', 9, 500, 'team-months')],
    costs: [
      cost('preparation', 'Supportable release preparation', 'delivery', 24, 100, 'Maintainer business', 'Release evidence delivered', 'Agreed release invoice'),
      cost('maintenance', 'Shared maintenance', 'delivery', 18, 100, 'Maintainer business', 'Authorized maintenance performed', 'Monthly invoice'),
      cost('onboarding', 'Customer setup', 'delivery', 18, 100, 'Implementation business', 'Each setup accepted', 'Per-team invoice'),
      cost('support', 'Support capacity', 'delivery', 18, 80, 'Support business', 'Defined support duties performed', 'Monthly invoice'),
      cost('tools', 'Support infrastructure', 'operating', 3, 150, 'Vendors', 'Service consumed', 'Vendor cycle', 'months'),
      cost('collection', 'Collection cost planning allowance', 'operating', 9000, 0.03, 'Payment providers', 'Payments processed', 'Deducted on collection', 'dollars processed'),
    ],
    reserve: 300,
    paymentTerms: ['Onboarding is accepted per team; support has a defined period and capacity.', 'A sponsor, license buyer, reseller and support customer are different commercial relationships. None is assumed merely from a download.'],
    downside: { label: 'Support demand more than doubles', changes: [change('cost', 'support', { quantity: 42 })], extraCosts: [], explanation: 'Small support fees fail when each installation requires sustained custom engineering.' },
    assumptions: ['The 3% collection allowance is a round planning input, not a quoted platform fee.', 'Downloads, stars and sponsorship eligibility are not paying customers.', 'A maintainer’s pre-existing code and rights remain theirs unless a separate agreement says otherwise.'],
    sourceIds: ['langfuse-offers', 'github-sponsors'],
  },
  {
    id: 'software-subscription',
    title: 'A subscription must also recover its first build',
    category: 'Owned software',
    horizon: 'First 90 days; ten paying customers present from day one',
    summary: 'A small workflow product sells subscriptions and onboarding. Its first-quarter ledger includes the initial build and customer acquisition, so a recurring fee does not hide startup losses.',
    buyer: 'Ten teams with the same narrow workflow need',
    payer: 'Each customer pays onboarding and monthly subscriptions',
    companyRole: 'Intent as the fictional product operator',
    contractingRoute: 'Validated repeat need → product build → customer onboarding → subscription operation → retention or cancellation.',
    customerBenefit: 'A maintained workflow with a documented scope and operating owner. Adoption is useful only if the actual workflow need is met.',
    participantBenefits: [
      benefit('Product team and suppliers', 'Earn for build, acquisition, onboarding and operations.', 'Their agreements must be funded before uncertain subscription growth arrives.'),
      benefit('Product operator', 'May recover development cost as sufficient customers stay and pay.', 'Acquisition, support and infrastructure costs must stay within capacity; no growth guarantee.'),
    ],
    revenue: [fee('subscription', 'Subscription', 30, 299, 'customer-months'), fee('onboarding', 'Onboarding', 10, 300, 'customers')],
    costs: [
      cost('build', 'Initial product build', 'delivery', 60, 100, 'Product engineering business', 'Initial scope accepted', 'Build milestones'),
      cost('acquisition', 'Acquiring the first customer cohort', 'commercial', 10, 250, 'Acquisition function', 'Authorized acquisition work/cost incurred', 'As incurred, whether or not all prospects convert', 'customers acquired'),
      cost('onboarding', 'Customer onboarding labor', 'delivery', 20, 100, 'Implementation business', 'Onboarding delivered', 'Per-customer invoice'),
      cost('support', 'Customer support', 'delivery', 15, 80, 'Support business', 'Support duties performed', 'Monthly invoice'),
      cost('compute', 'Usage resources', 'operating', 30, 25, 'Vendors', 'Usage consumed', 'Vendor cycle', 'customer-months'),
      cost('hosting', 'Shared hosting', 'operating', 3, 100, 'Hosting vendor', 'Hosting period provided', 'Monthly invoice', 'months'),
      cost('maintenance', 'Shared product maintenance', 'delivery', 12, 100, 'Engineering business', 'Maintenance performed', 'Monthly invoice'),
      cost('collection', 'Collection cost planning allowance', 'operating', 11970, 0.03, 'Payment providers', 'Payments processed', 'Deducted on collection', 'dollars processed'),
    ],
    reserve: 0,
    paymentTerms: ['The example assumes the entire cohort pays for all three months from day one; it is not an acquisition forecast.', 'Subscription cancellation, refunds and data export need explicit terms. Annual cash prepayment would not erase future operating obligations.'],
    downside: {
      label: 'Only five customers buy; the build is already committed',
      changes: [change('revenue', 'subscription', { quantity: 15 }), change('revenue', 'onboarding', { quantity: 5 }), change('cost', 'acquisition', { quantity: 5 }), change('cost', 'onboarding', { quantity: 10 }), change('cost', 'support', { quantity: 7.5 }), change('cost', 'compute', { quantity: 15 }), change('cost', 'collection', { quantity: 5985 })],
      extraCosts: [],
      explanation: 'The build, shared hosting and maintenance stay committed while customer-dependent receipts shrink. The smaller cohort still assumes the same acquisition cost per won customer.',
    },
    scaling: { customerCount: 10, downsideCustomerCount: 5, variableCostIds: ['acquisition', 'onboarding', 'support', 'compute', 'collection'], label: 'First-90-day break-even cohort', limitation: 'Assumes each customer contributes the same three-month receipts and variable cost from day one, with fixed build/hosting/maintenance unchanged. Capacity limits and step costs can invalidate scaling.' },
    assumptions: ['All customer, price and cost inputs are fictional. No current Intent product revenue is represented.', 'The 3% processing allowance is a planning input, not a platform quote.', 'Break-even includes the initial build; it excludes central company overhead, taxes, financing and any extra capacity hired beyond the modeled scale.'],
    sourceIds: [],
  },
  {
    id: 'employer-workshop',
    title: 'An employer buys applied learning and reviewed work',
    category: 'Education and knowledge transfer',
    horizon: 'One employer cohort and its preparation/review period',
    summary: 'An employer buys a workshop around its workflow, with preparation and reviewed exercises. The fee purchases independent educational work.',
    buyer: 'An engineering manager developing an internal team',
    payer: 'The employer pays for the cohort',
    companyRole: 'Intent as the workshop organizer',
    contractingRoute: 'Employer learning need → agreed curriculum and materials → workshop → reviewed practice and handover.',
    customerBenefit: 'A team practices a relevant workflow and leaves with reviewed artifacts. Attendance alone does not certify delivery capability or guarantee a business result.',
    participantBenefits: [
      benefit('Instructor and reviewers', 'Earn for preparation, teaching and assessment.', 'Defined work and accepted delivery, not a promise that every learner passes an external exam.'),
      benefit('Employer and learners', 'Receive a bounded curriculum and reusable learning materials within the agreed rights.', 'No sale of partner-program membership, restricted exam access or guaranteed certification.'),
    ],
    revenue: [fee('cohort', 'Employer workshop and reviewed exercises', 1, 8000, 'cohort')],
    costs: [
      cost('preparation', 'Curriculum preparation', 'delivery', 20, 100, 'Curriculum contributor business', 'Agreed materials delivered', 'Preparation invoice'),
      cost('instruction', 'Live instruction', 'delivery', 8, 150, 'Instructor business', 'Sessions delivered', 'Teaching invoice'),
      cost('review', 'Exercise review', 'delivery', 12, 100, 'Reviewer business', 'Reviews delivered', 'Review invoice'),
      cost('facilitation', 'Cohort facilitation', 'delivery', 8, 80, 'Facilitator business', 'Facilitation delivered', 'Cohort invoice'),
      cost('tools', 'Learning environments', 'operating', 1, 200, 'Vendors', 'Resources consumed', 'Vendor cycle', 'cohort allowance'),
      cost('sales', 'Employer discovery and sale', 'commercial', 4, 125, 'Commercial function', 'Authorized employer work performed', 'Agreed invoice'),
      cost('admin', 'Cohort administration', 'operating', 4, 75, 'Administration function', 'Administration performed', 'As incurred'),
    ],
    reserve: 500,
    paymentTerms: ['Preparation and cancellation treatment are agreed before dates are reserved.', 'Third-party exam eligibility, official fees and credentials remain separate from the workshop.'],
    downside: { label: 'Extra customization and a negotiated partial refund', changes: [change('cost', 'preparation', { quantity: 36 }), change('revenue', 'cohort', { rate: 6000 })], extraCosts: [], explanation: 'Unbounded bespoke preparation and refund exposure turn a promising cohort into a loss.' },
    assumptions: ['The employer fee is a teaching assumption, not a currently offered course price.', 'Contributors retain pre-existing materials; any licensing, recording or reuse rights require mutual agreement.'],
    sourceIds: ['anthropic-partners'],
  },
  {
    id: 'shared-component',
    title: 'Two buyers help fund a reusable component',
    category: 'Tools and reusable IP',
    horizon: 'One shared build with two separately scoped adaptations',
    summary: 'Two customers need the same non-confidential component. They fund separate scopes while the builders agree what may be reused.',
    buyer: 'Two teams with overlapping technical needs',
    payer: 'Each customer pays its own agreed scope',
    companyRole: 'Intent as the coordinating builder',
    contractingRoute: 'Separate customer needs → explicit reuse permissions → shared core → separate customer adaptations and acceptance.',
    customerBenefit: 'Each buyer receives its agreed capability while appropriate common work may be reused. One buyer’s confidential workflow or data is never automatically another buyer’s asset.',
    participantBenefits: [
      benefit('Component contributor', 'Receives agreed build/maintenance work and retains any specifically reserved rights.', 'A written rights schedule distinguishes background IP, new shared work and customer-specific work.'),
      benefit('Customers and Intent', 'Can share the cost of suitable common engineering.', 'Both scopes, funding gates and acceptance obligations must be clear before committing the common build.'),
    ],
    revenue: [fee('scopes', 'Separately contracted customer scopes', 2, 12000, 'customers')],
    costs: [
      cost('core', 'Reusable core build', 'delivery', 120, 100, 'Component engineering business', 'Common work accepted under its work order', 'Build milestones'),
      cost('review', 'Shared assurance', 'delivery', 24, 100, 'Assurance business', 'Evidence delivered', 'Review invoice'),
      cost('adaptation', 'Separate customer adaptations', 'delivery', 32, 100, 'Implementation business', 'Each adaptation accepted', 'Per-scope invoice'),
      cost('rights', 'Rights and scope administration', 'operating', 12, 125, 'Commercial administration function', 'Agreed rights/scope work completed', 'As incurred'),
      cost('tools', 'Build resources', 'operating', 1, 600, 'Vendors', 'Resources consumed', 'Vendor cycle', 'project allowance'),
    ],
    reserve: 1500,
    paymentTerms: ['The shared build has a funding gate; one customer is not silently liable for another customer’s cancellation.', 'Future licensing, sponsorship, white-label use and resale require their own rights and earning terms. Co-marketing alone creates no commission.'],
    downside: { label: 'One buyer cancels after the common cost is committed', changes: [change('revenue', 'scopes', { quantity: 1 }), change('cost', 'adaptation', { quantity: 16 })], extraCosts: [], explanation: 'Without an enforceable cancellation payment or a stop gate, the remaining buyer’s fee cannot cover the committed shared core.' },
    assumptions: ['No automatic ownership transfer or compulsory open-source publication is assumed.', 'This is cofunded engineering, not an equity investment or a promise of future royalties.'],
    sourceIds: ['github-sponsors', 'aws-resale'],
  },
  {
    id: 'outcome-hybrid',
    title: 'A fixed scope plus a carefully bounded outcome fee',
    category: 'Projects and relationships',
    horizon: 'One implementation and agreed measurement window',
    summary: 'A customer funds the delivery scope and may pay an additional fee only if a pre-agreed, attributable outcome is verified.',
    buyer: 'A workflow owner with an observable baseline',
    payer: 'The customer pays the base and, only if earned, the outcome fee',
    companyRole: 'Intent as the delivery and measurement supplier',
    contractingRoute: 'Baseline and control boundaries → base scope → delivery → agreed measurement → accepted outcome fee or none.',
    customerBenefit: 'Some supplier upside depends on an agreed result. Measurement still must distinguish capacity released, avoided future cost and actual cash savings.',
    participantBenefits: [
      benefit('Delivery suppliers', 'Earn their authorized work fees under their own terms.', 'Their due invoices do not vanish merely because Intent’s conditional bonus is not earned.'),
      benefit('Customer and Intent', 'Share an explicit, capped result incentive.', 'Agreed baseline, attribution, exclusions, measurement window and dispute path; no invented ROI.'),
    ],
    revenue: [fee('base', 'Fixed delivery scope', 1, 18000), fee('outcome', 'Conditional verified-outcome fee', 1, 6000, 'qualified event', true)],
    costs: [
      cost('discovery', 'Baseline and discovery', 'commercial', 16, 125, 'Discovery business', 'Baseline accepted', 'Discovery invoice'),
      cost('engineering', 'Implementation', 'delivery', 100, 100, 'Engineering business', 'Milestones accepted', 'Milestone invoices'),
      cost('qa', 'Assurance', 'delivery', 16, 100, 'Assurance business', 'Evidence delivered', 'Review invoice'),
      cost('measurement', 'Outcome measurement', 'delivery', 16, 125, 'Measurement business', 'Agreed measurement performed', 'Review invoice independent of whether the bonus is earned'),
      cost('operations', 'Operating handover', 'delivery', 8, 100, 'Operations business', 'Handover accepted', 'Completion invoice'),
      cost('tools', 'Tools', 'operating', 1, 600, 'Vendors', 'Consumed service', 'Vendor cycle', 'project allowance'),
      cost('admin', 'Administration', 'operating', 1, 500, 'Administration function', 'Project work performed', 'As incurred', 'project allowance'),
    ],
    reserve: 1500,
    paymentTerms: ['The baseline view includes the explicitly conditional fee as a successful illustrative outcome, not an amount already owed.', 'No outcome fee is payable without the agreed evidence and acceptance event.'],
    downside: { label: 'No outcome fee and extra implementation effort', changes: [change('revenue', 'outcome', { quantity: 0 }), change('cost', 'engineering', { quantity: 120 })], extraCosts: [], explanation: 'A thin base fee can leave the supplier exposed when the bonus is absent and work overruns. Conditional upside must not be spent as certain cash.' },
    assumptions: ['The fee is a fictional fixed amount, not a percentage of unverified customer savings.', 'External factors and the customer’s own actions need treatment in the real measurement agreement.'],
    sourceIds: [],
  },
  {
    id: 'referral-only',
    title: 'A pure introduction has a small, separate ledger',
    category: 'Projects and relationships',
    horizon: 'One authorized introduction and its qualifying event',
    summary: 'An independent introducer connects two businesses and has no delivery obligation. The example models only that introducer’s business, not the customer project.',
    buyer: 'A delivery firm seeking a qualified, consented introduction',
    payer: 'The delivery firm pays the introducer under a separate agreement',
    companyRole: 'Independent introducer business; Intent may be either contracting party in a real case',
    contractingRoute: 'Consented introduction → acceptance of the named opportunity → defined qualifying event → one agreed fee.',
    customerBenefit: 'The customer reaches a relevant supplier without surrendering choice. A referral fee does not establish the supplier’s capability or guarantee a successful project.',
    participantBenefits: [
      benefit('Introducer business', 'Can earn the agreed fee for its precisely defined event.', 'No delivery, ongoing selling, account stewardship or perpetual renewal rights are silently included.'),
      benefit('Delivery firm', 'Pays for an agreed introduction outcome within its own economics.', 'The end-customer project budget and delivery costs must be evaluated separately.'),
    ],
    revenue: [fee('introduction', 'Agreed introduction success fee', 1, 750, 'qualified event', true)],
    costs: [
      cost('qualification', 'Introduction qualification and consent', 'commercial', 3, 100, 'Introducer business function', 'Authorized effort performed', 'Funded by introducer regardless of success'),
      cost('admin', 'Agreement and payment administration', 'operating', 1, 75, 'Administration function', 'Administration performed', 'As incurred'),
    ],
    reserve: 0,
    paymentTerms: ['The illustrative fee is due only on the explicitly agreed successful event.', 'Ongoing presales, selling or account service needs additional scope. New departments and renewals are not automatically inside the original introduction.'],
    downside: { label: 'The qualifying sale never occurs', changes: [change('revenue', 'introduction', { quantity: 0 })], extraCosts: [], explanation: 'The introducer earns no conditional fee and bears its own authorized pursuit cost.' },
    assumptions: ['The fixed fee is a fictional teaching input, not a universal referral rate or an Intent policy.', 'Attribution disputes and overlapping pre-existing relationships must be resolved before promising a fee.'],
    sourceIds: ['microsoft-consent'],
  },
  {
    id: 'vendor-operating-costs',
    title: 'A hosted workflow has suppliers even when it uses AI',
    category: 'Operations and support',
    horizon: 'One month of a bounded hosted workflow',
    summary: 'The customer pays for an operated workflow. Model consumption, licensed data, infrastructure and human support remain real costs.',
    buyer: 'A business that needs the workflow operated',
    payer: 'The customer pays the operating supplier',
    companyRole: 'Intent as the fictional workflow operator',
    contractingRoute: 'Customer operating scope → human operations plus authorized vendors → usage review → resize or renew.',
    customerBenefit: 'A usable workflow with a clear operator, budget boundary and usage policy. Model output volume is not itself evidence of useful outcomes.',
    participantBenefits: [
      benefit('Technology and data vendors', 'Receive payment for their actual contracted products or metered use.', 'Consumption and license terms, not a share of all customer value.'),
      benefit('Operator and customer', 'Can agree a useful service with a transparent usage boundary.', 'Retried work, support demand, data rights and spend caps must be priced and monitored.'),
    ],
    revenue: [fee('operation', 'Bounded hosted workflow', 1, 4000, 'month')],
    costs: [
      cost('maintenance', 'Maintenance', 'delivery', 8, 100, 'Engineering business', 'Maintenance performed', 'Monthly invoice'),
      cost('support', 'Customer support', 'delivery', 6, 80, 'Support business', 'Scoped support performed', 'Monthly invoice'),
      cost('operations', 'Operating review', 'delivery', 4, 80, 'Operations business', 'Operating review performed', 'Monthly invoice'),
      cost('hosting', 'Infrastructure', 'operating', 1, 200, 'Hosting vendor', 'Service period provided', 'Monthly invoice', 'month'),
      cost('model', 'Model work including retries', 'operating', 15000, 0.02, 'Model providers', 'Metered work consumed', 'Vendor cycle', 'modeled requests'),
      cost('data', 'Licensed data', 'operating', 1, 350, 'Data vendor', 'Licensed access provided', 'License billing cycle', 'month'),
      cost('collection', 'Collection cost planning allowance', 'operating', 4000, 0.03, 'Payment providers', 'Payments processed', 'Deducted on collection', 'dollars processed'),
    ],
    reserve: 200,
    paymentTerms: ['Vendor invoices can fall due before customer collection. A customer subscription is not an unlimited vendor budget.', 'Operating a service is different from reselling a vendor’s product; any resale or white-label rights need actual authorization.'],
    downside: { label: 'Retries and support overwhelm the included budget', changes: [change('cost', 'model', { quantity: 45000 }), change('cost', 'support', { quantity: 18 })], extraCosts: [], explanation: 'The customer fee stays fixed while resource use and human assistance rise, producing an operating loss.' },
    assumptions: ['The request cost and 3% collection allowance are fictional blended planning inputs, not named-provider prices.', 'No free credit, subsidy or sponsorship is assumed. Credits would reduce an eligible vendor bill, not become cash available for every expense.'],
    sourceIds: ['aws-funding', 'aws-resale', 'aws-disbursements'],
  },
];

function nonnegative(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new TypeError(`${label} must be a finite nonnegative number`);
  }
  return value;
}

function cents(value, label) {
  nonnegative(value, label);
  const result = Math.round((value + Number.EPSILON) * 100);
  if (!Number.isSafeInteger(result)) throw new RangeError(`${label} exceeds the supported money range`);
  return result;
}

function validateRows(rows, kind) {
  if (!Array.isArray(rows)) throw new TypeError(`${kind} must be an array`);
  const ids = new Set();
  return rows.map(row => {
    if (!row || typeof row.id !== 'string' || !row.id || ids.has(row.id)) {
      throw new TypeError(`${kind} rows require unique nonempty IDs`);
    }
    ids.add(row.id);
    nonnegative(row.quantity, `${kind}.${row.id}.quantity`);
    nonnegative(row.rate, `${kind}.${row.id}.rate`);
    if (kind === 'cost' && !Object.hasOwn(economicsCostCategories, row.category)) {
      throw new TypeError(`Unknown cost category: ${row.category}`);
    }
    return { ...row, amount: cents(row.quantity * row.rate, `${kind}.${row.id}.amount`) / 100 };
  });
}

function sumRows(rows) {
  const total = rows.reduce((sum, row) => sum + cents(row.amount, row.id), 0);
  if (!Number.isSafeInteger(total)) throw new RangeError('Ledger total exceeds the supported money range');
  return total;
}

/** Pure computation: does not mutate base cases when selecting their downside. */
export function summarizeEconomicsCase(caseData, { downside = false } = {}) {
  if (!caseData || typeof caseData.id !== 'string') throw new TypeError('A case with an ID is required');
  const ledgers = {
    revenue: validateRows(caseData.revenue, 'revenue'),
    cost: validateRows(caseData.costs, 'cost'),
  };
  if (downside) {
    if (!caseData.downside) throw new TypeError('Case has no downside scenario');
    const changed = new Set();
    for (const item of caseData.downside.changes ?? []) {
      const rows = ledgers[item.target];
      const key = `${item.target}:${item.id}`;
      if (!rows || changed.has(key)) throw new TypeError(`Invalid or duplicate downside target: ${key}`);
      const index = rows.findIndex(row => row.id === item.id);
      if (index < 0) throw new TypeError(`Unknown downside row: ${key}`);
      if (!Object.hasOwn(item, 'quantity') && !Object.hasOwn(item, 'rate')) {
        throw new TypeError(`Downside change needs quantity or rate: ${key}`);
      }
      changed.add(key);
      rows[index] = {
        ...rows[index],
        ...(Object.hasOwn(item, 'quantity') ? { quantity: item.quantity } : {}),
        ...(Object.hasOwn(item, 'rate') ? { rate: item.rate } : {}),
      };
    }
    ledgers.cost.push(...(caseData.downside.extraCosts ?? []));
  }
  const revenueRows = validateRows(ledgers.revenue, 'revenue');
  const costRows = validateRows(ledgers.cost, 'cost');
  const revenueCents = sumRows(revenueRows);
  const costCents = sumRows(costRows);
  const reserveCents = cents(caseData.reserve ?? 0, `${caseData.id}.reserve`);
  const contributionCents = revenueCents - costCents;
  const costGroups = Object.entries(economicsCostCategories).map(([id, name]) => ({
    id, name, value: sumRows(costRows.filter(row => row.category === id)) / 100,
  })).filter(group => group.value > 0);
  let breakEven = null;
  if (caseData.scaling) {
    const scale = caseData.scaling;
    const count = downside ? scale.downsideCustomerCount : scale.customerCount;
    if (!Number.isInteger(count) || count <= 0) throw new TypeError('Scaling customer count must be a positive integer');
    if (!Array.isArray(scale.variableCostIds) || new Set(scale.variableCostIds).size !== scale.variableCostIds.length) {
      throw new TypeError('Scaling variable cost IDs must be a unique array');
    }
    for (const id of scale.variableCostIds) {
      if (!costRows.some(row => row.id === id)) throw new TypeError(`Unknown scaling cost: ${id}`);
    }
    const variableCents = sumRows(costRows.filter(row => scale.variableCostIds.includes(row.id)));
    const fixedCents = costCents - variableCents;
    const unitContributionCents = (revenueCents - variableCents) / count;
    breakEven = {
      label: scale.label,
      customers: unitContributionCents > 0 ? Math.ceil(fixedCents / unitContributionCents) : null,
      revenuePerCustomer: Math.round(revenueCents / count) / 100,
      variableCostPerCustomer: Math.round(variableCents / count) / 100,
      contributionPerCustomer: Math.round(unitContributionCents) / 100,
      fixedCosts: fixedCents / 100,
      limitation: scale.limitation,
    };
  }
  return {
    id: caseData.id,
    downside,
    revenue: revenueCents / 100,
    costs: costCents / 100,
    contribution: contributionCents / 100,
    reserve: reserveCents / 100,
    remainder: (contributionCents - reserveCents) / 100,
    revenueRows,
    costRows,
    costGroups,
    breakEven,
  };
}

// Fail the site build for malformed teaching data, broken source IDs or duplicate cases.
const caseIds = new Set();
const sourceIds = new Set();
for (const source of economicsSources) {
  if (!source.id || sourceIds.has(source.id)) throw new TypeError(`Duplicate source ID: ${source.id}`);
  sourceIds.add(source.id);
  if (!source.title || !source.evidenceRole || new URL(source.url).protocol !== 'https:') {
    throw new TypeError(`Invalid public source: ${source.id}`);
  }
}
for (const item of economicsCases) {
  if (caseIds.has(item.id)) throw new TypeError(`Duplicate case ID: ${item.id}`);
  caseIds.add(item.id);
  for (const sourceId of item.sourceIds) {
    if (!sourceIds.has(sourceId)) throw new TypeError(`Unknown source ${sourceId} in ${item.id}`);
  }
  summarizeEconomicsCase(item);
  summarizeEconomicsCase(item, { downside: true });
}
