// Public estate claims only. Each destination is an inspectable source, not a
// claim of customer results, delivery capacity, or commercial performance.
export const estateGroups = [
  {
    id: 'practice',
    number: '01',
    title: 'Engineering & delivery',
    description: 'A defined outcome becomes a working system with an owner, a test, and a plan to operate it.',
    entries: [
      { name: 'Intent Solutions', role: 'Applied AI engineering', href: '/', status: 'existing' },
    ],
  },
  {
    id: 'evidence',
    number: '02',
    title: 'Evidence & inspection',
    description: 'Tests define what passed and failed; working examples let people inspect behavior in context.',
    entries: [
      { name: 'Intent Labs', role: 'Dated evaluations and results', href: 'https://labs.intentsolutions.io/', status: 'existing' },
      { name: 'Evals', role: 'Versioned result definitions', href: 'https://evals.intentsolutions.io/', status: 'existing' },
      { name: 'Demos', role: 'Working public examples', href: 'https://demos.intentsolutions.io/', status: 'existing' },
    ],
  },
  {
    id: 'transfer',
    number: '03',
    title: 'Teaching & distribution',
    description: 'Useful methods, source, and lessons travel beyond one engagement while remaining inspectable.',
    entries: [
      { name: 'Learn', role: 'Practitioner practice', href: 'https://learn.intentsolutions.io/', status: 'existing' },
      { name: 'Tons of Skills', role: 'Agent skills and plugins', href: 'https://tonsofskills.com/', status: 'existing' },
      { name: 'Omarchy', role: 'Desktop plugins and tooling', href: 'https://oma.intentsolutions.io/', status: 'existing' },
      { name: 'Start AI Tools', role: 'Implementation journal', href: 'https://startaitools.com/', status: 'existing' },
      { name: 'GitHub', role: 'Public source and reusable code', href: 'https://github.com/jeremylongshore', status: 'existing' },
    ],
  },
  {
    id: 'products',
    number: '04',
    title: 'Owned products',
    description: 'Focused applications make repeated workflow problems concrete. Each product has its own scope and maturity.',
    entries: [
      { name: 'DiagnosticPro', role: 'Equipment diagnostics', href: 'https://diagnosticpro.io/', status: 'existing' },
      { name: 'HustleStats', role: 'Youth soccer development tracking', href: 'https://hustlestats.io/', status: 'existing' },
      { name: 'Scorecard Echo', role: 'Baseball game desk', href: 'https://scorecardecho.com/', status: 'existing' },
      { name: 'Intent Longbox', role: 'Collectibles workflow in development', href: 'https://github.com/jeremylongshore/intent-longbox', status: 'in-progress' },
    ],
  },
];

export const loopSteps = [
  { number: '01', title: 'Real work', detail: 'Start with the business task and the people who own it.' },
  { number: '02', title: 'Engineer', detail: 'Build the workflow, integrations, controls, and failure paths.' },
  { number: '03', title: 'Evaluate', detail: 'Test the claim and keep limits and failures visible.' },
  { number: '04', title: 'Transfer', detail: 'Hand over operation; share permitted demos, tools, and lessons.' },
  { number: '05', title: 'Learn again', detail: 'Feedback reveals the next problem or a reusable pattern.' },
];
