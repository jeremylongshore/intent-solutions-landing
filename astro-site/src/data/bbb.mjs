// Bob's Big Brain product facts, checked against code. Every page under /bbb/ reads from here so a
// fact changes in one place. Record: bobs-big-brain-umbrella 000-docs/029 (product record) and 031
// (claims register). Re-verify `verifiedAt`, `commits` and `versions` before changing any value.

export const verifiedAt = '2026-10-25';

export const repos = [
  { layer: 'Package', name: 'bobs-big-brain-plugin', href: 'https://github.com/jeremylongshore/bobs-big-brain-plugin', job: 'The plugin you install, local or team.', license: 'Apache-2.0', version: '1.2.0', commit: 'a1b74ca' },
  { layer: 'Govern', name: 'bobs-big-brain-registrar', href: 'https://github.com/jeremylongshore/bobs-big-brain-registrar', job: 'Governance, receipts and the team API.', license: 'Apache-2.0', version: '0.8.0', commit: '2599598' },
  { layer: 'Compile', name: 'bobs-big-brain-compiler', href: 'https://github.com/jeremylongshore/bobs-big-brain-compiler', job: 'Optional compile step with its own trace.', license: 'Apache-2.0', version: '1.23.1', commit: 'b7ad84b' },
  { layer: 'Map', name: 'bobs-big-brain-umbrella', href: 'https://github.com/intent-solutions-io/bobs-big-brain-umbrella', job: 'The thesis, system map and tracker.', license: 'Apache-2.0', version: null, commit: 'ffd2711' },
  { layer: 'Retrieve', name: 'qmd', href: 'https://github.com/tobi/qmd', job: 'On-device keyword search by @tobi.', license: 'MIT', version: '2.5.3', commit: null },
];

export const layers = [
  { id: 'compile', name: 'Compile', line: 'Files become knowledge, if you want it.', note: 'Summaries, concepts and gaps from your own files, with their own trace chain.' },
  { id: 'govern', name: 'Govern', line: 'Code decides what stays.', note: 'Dedupe, policy and promotion run as code; each save writes a hash-chained receipt.' },
  { id: 'retrieve', name: 'Retrieve', line: 'Answers cite the exact memory.', note: 'Keyword search fused by rank, reranked for freshness; no generative model at query time.' },
  { id: 'package', name: 'Package', line: 'One plugin, local or team.', note: 'Claude Code and Cowork; on your machine or your team’s server.' },
];

// The hero index: each row pairs a claim with a real artifact. Hashes and the verify result come
// from the 2026-10-25 clean-room install (plugin a1b74ca); the citation from the owner's brain.
export const heroIndex = [
  { id: 'govern', name: 'Govern', line: 'Code decides what stays.', proof: 'receipt a0e677d6 links to 4b3e3c6c' },
  { id: 'retrieve', name: 'Retrieve', line: 'Answers cite exact memory.', proof: 'qmd://kb-curated/e1d5424d-c828…md' },
  { id: 'verify', name: 'Verify', line: 'Check the chain.', proof: '6 events, 0 tamper signatures' },
  { id: 'package', name: 'Package', line: 'One plugin, two modes.', proof: 'team mode: set TEAMKB_API_URL' },
];

export const marketplace = {
  repo: 'jeremylongshore/bobs-big-brain-plugin',
  plugin: 'governed-second-brain@governed-second-brain',
};

export const localInstallPrompt = `Install Bob's Big Brain for me as a LOCAL brain on this machine. Run these steps in order and stop to tell me if any step fails.

1) Add and install the plugin from its public marketplace:
   claude plugin marketplace add ${marketplace.repo}
   claude plugin install ${marketplace.plugin}

2) Keep me in local mode:
   - Do not create ~/.teamkb/team.json.
   - Do not set TEAMKB_API_URL or TEAMKB_API_TOKEN.

3) Tell me to fully quit and reopen Claude Code. The first start sets up three native modules with npm once; that needs Node 20+ and npm on my PATH.

4) After the restart, check that brain_status answers. An empty brain is normal on a first install.`;

export const manualCommands = [
  `/plugin marketplace add ${marketplace.repo}`,
  `/plugin install ${marketplace.plugin}`,
];

export const firstSave = '/brain-save We deploy production from main after the required checks pass';
export const firstSearch = '/brain deploy production';

export const standingOrder = `Add this to my ~/.claude/CLAUDE.md (create it if missing). If a section with this title exists, update it in place and show me the diff:

## Bob's Big Brain: search first
For knowledge I have saved, call brain_search (or /brain) before re-deriving or guessing.
Use 1 to 4 strong keywords, not a full sentence. Cite every claim with its qmd:// link.
If nothing comes back, say so; do not invent an answer. Offer /brain-save for new durable facts.`;

// A real answer from the owner's own brain, trimmed to public text. Captured with brain_search,
// scope curated, on the date below. Not a customer result.
export const sampleAnswer = {
  capturedAt: '2026-10-25',
  query: 'compile then govern receipts',
  hits: [
    { citation: 'qmd://kb-curated/e1d5424d-c828-56e0-8bf1-8b07d1eb373c.md', score: '0.947', excerpt: 'The compile-then-govern architecture separates the production of knowledge from its governance into two distinct layers.' },
    { citation: 'qmd://kb-guides/4437de5f-94ec-4279-ad07-187779b7be55.md', score: '0.784', excerpt: 'The model proposes but the deterministic system owns durable state and control.' },
  ],
};

export const requirements = [
  { name: 'Claude Code or Cowork', detail: 'Same install for both.' },
  { name: 'Node 20 or newer, and npm', detail: 'First start fetches three pinned modules.' },
  { name: 'qmd 2.x', detail: 'Optional; adds a keyword arm.' },
  { name: 'git', detail: 'Commits the anchor log locally.' },
];

// What the clean-room install proved. Fresh home directory, PATH=/usr/bin:/bin, plugin a1b74ca.
export const proven = [
  'First start set up the native modules and exposed six tools.',
  'A saved fact came back from search with its qmd:// citation.',
  'A newer decision retired the older entry, with a receipt.',
  'A too-short note and a fake credential never became memory.',
  'brain_audit_verify passed, consistent with the committed anchors.',
];

export const tracker = 'https://github.com/intent-solutions-io/bobs-big-brain-umbrella/issues/122';
export const currentTruthTracker = 'https://github.com/intent-solutions-io/bobs-big-brain-umbrella/issues/74';

export const limits = [
  { title: 'Most governance rules start switched off', short: 'New brains enforce two of ten rules for now.', body: 'A fresh local brain enforces the secret and length checks; eight more rules stay dormant until the seeded policy is fixed.', href: tracker },
  { title: 'Rejections have no receipt of their own', short: 'Rejected notes are counted, not individually receipted.', body: 'A rejected note stays in the inbox and is counted in the sweep, without a per-note receipt.', href: tracker },
  { title: 'A blocked secret is dropped quietly', short: 'Credentials never become memory, but you get no warning.', body: 'A capture that contains a credential never becomes memory, but you get no receipt or warning.', href: tracker },
  { title: 'Searches are not receipted', short: 'Receipts cover saves and retirements, not searches.', body: 'Receipts cover governance decisions: promote, reject, retire. A search leaves an access log only.', href: null },
  { title: 'Current truth does not always win yet', short: 'Older reference can still outrank a newer decision.', body: 'On a large brain, older reference material can outrank a newer decision.', href: currentTruthTracker },
  { title: 'Team users cannot verify from the plugin', short: 'Team verification runs on the server, not the plugin.', body: 'brain_audit_verify runs in local mode; team mode verification happens on the server.', href: null },
  { title: 'Channels carry different builds', short: 'Distribution copies differ until the next release.', body: 'Distribution copies labelled 1.2.0 differ, and main is ahead of the last tag. One release fixes both.', href: tracker },
];
