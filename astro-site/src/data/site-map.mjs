// Route contract: visitor purpose, next action, and discovery policy.
// Every page source must be represented here; scripts/audit-site-map.mjs enforces it.
export const pages = [
  { path: '/', label: 'Home', audience: 'Prospective customers', purpose: 'Understand the outcome, method, and evidence.', next: '/contact/?door=outcome', index: true },
  { path: '/projects/', label: 'Projects', audience: 'Customers and builders', purpose: 'Inspect public work and choose an example to explore.', next: 'https://demos.intentsolutions.io/', index: true },
  { path: '/about/', label: 'About', audience: 'People evaluating the company', purpose: 'Understand the team and its responsibilities.', next: '/contact/?door=outcome', index: true },
  { path: '/contact/', label: 'Request an outcome', audience: 'Prospective customers', purpose: 'Describe the work and request a fit review.', next: 'Form confirmation on this page', index: true },
  { path: '/support/', label: 'Support', audience: 'Existing customers and tool users', purpose: 'Find the correct support channel without assuming service entitlements.', next: '/contact/', index: true },
  { path: '/field-notes/', label: 'Field notes', audience: 'Technical evaluators and readers', purpose: 'Read the development record and lessons from the work.', next: '/field-notes/[...slug]/', index: true },
  { path: '/field-notes/[...slug]/', label: 'Individual field note', audience: 'Readers', purpose: 'Understand one piece of work with its source attribution.', next: '/field-notes/', index: 'self-canonical only' },
  { path: '/field-notes/rss.xml', label: 'Field notes RSS', audience: 'Feed subscribers', purpose: 'Follow published notes in a feed reader.', next: '/field-notes/', index: false },
  { path: '/terms/', label: 'Terms', audience: 'Visitors and customers', purpose: 'Read the published terms.', next: '/contact/', index: true },
  { path: '/privacy/', label: 'Privacy', audience: 'Visitors and customers', purpose: 'Read data handling information.', next: '/contact/', index: true },
  { path: '/acceptable-use/', label: 'Acceptable use', audience: 'Visitors and customers', purpose: 'Read usage boundaries.', next: '/contact/', index: true },
  { path: '/site-map/', label: 'Site map', audience: 'All visitors', purpose: 'Choose a page or related property by its job.', next: '/', index: true },
  { path: '/404/', label: 'Not found', audience: 'Visitors with an invalid URL', purpose: 'Recover to an existing page.', next: '/site-map/', index: false },
  { path: '/thank-you/', label: 'Legacy confirmation', audience: 'Visitors following an old survey link', purpose: 'Explain that this URL does not confirm a new submission.', next: '/contact/', index: false },
];

export const legacy = [
  { path: '/a2a/', label: 'A2A framework', next: '/projects/' },
  { path: '/agents/', label: 'Agents', next: '/projects/' },
  { path: '/ai-agents/', label: 'AI agents', next: '/projects/' },
  { path: '/ai-models/', label: 'AI models', next: '/#method' },
  { path: '/applications/', label: 'Applications', next: '/projects/' },
  { path: '/automation/', label: 'Automation', next: '/contact/?door=outcome' },
  { path: '/cloud/', label: 'Cloud services', next: '/contact/?door=outcome' },
  { path: '/colab/', label: 'Colab', next: '/contact/?door=partner' },
  { path: '/infrastructure/', label: 'Infrastructure', next: '/#method' },
  { path: '/intel-engine/', label: 'Intent Agent Engine', next: '/projects/' },
  { path: '/private-ai/', label: 'Private AI', next: '/contact/?door=outcome' },
  { path: '/resellers/', label: 'Resellers', next: '/contact/?door=partner' },
  { path: '/security-compliance/', label: 'Security and compliance', next: '/#method' },
  { path: '/learn/', label: 'Learn', next: 'https://learn.intentsolutions.io/' },
  { path: '/learn/models/', label: 'Learning about models', next: 'https://learn.intentsolutions.io/' },
  { path: '/learn/security/', label: 'Learning about security', next: 'https://learn.intentsolutions.io/' },
].map((entry) => ({ ...entry, audience: 'Visitors following an old link', purpose: 'Retired offer or superseded learning page. Explain the change and provide an explicit handoff.', index: false }));

export const properties = [
  { label: 'Demos', href: 'https://demos.intentsolutions.io/', purpose: 'Explore systems and experiments. A listing is not a purchase or a production-readiness guarantee.' },
  { label: 'Labs', href: 'https://labs.intentsolutions.io/', purpose: 'Inspect published evaluations, including failed results.' },
  { label: 'Evals', href: 'https://evals.intentsolutions.io/', purpose: 'Read the definitions behind evaluation results.' },
  { label: 'Learn', href: 'https://learn.intentsolutions.io/', purpose: 'Explore the practitioner method and the access requirements.' },
  { label: 'Tons of Skills', href: 'https://tonsofskills.com/', purpose: 'Discover public plugins and agent skills.' },
  { label: 'Omarchy', href: 'https://oma.intentsolutions.io/', purpose: 'Explore Omarchy plugins and their repositories.' },
  { label: 'Start AI Tools', href: 'https://startaitools.com/', purpose: 'Read the original articles and development field notes.' },
  { label: 'Jeremy Longshore', href: 'https://jeremylongshore.com/', purpose: 'Explore the founder’s personal work and writing.' },
];
