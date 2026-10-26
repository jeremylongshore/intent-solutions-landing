// Bob's Big Brain product facts, checked against code. Every page under /bbb/ reads from here so a
// fact changes in one place. Record: bobs-big-brain-umbrella 000-docs/029 (product record) and 031
// (claims register). Keep original install pins separate from later source checks.

// Original clean-room installation: do not repin these observations to newer source.
export const verifiedAt = '2026-10-25';
export const sourceVerifiedAt = '2026-10-26';
export const sourceRefs = [
  { name: 'Plugin', href: 'https://github.com/jeremylongshore/bobs-big-brain-plugin', commit: '3a156a89f8797997430db10869f7da5b20a5fa67' },
  { name: 'Registrar', href: 'https://github.com/jeremylongshore/bobs-big-brain-registrar', commit: '1b59883748eb53c17984ee7bdf14c1d93f0de6c9' },
  { name: 'Compiler', href: 'https://github.com/jeremylongshore/bobs-big-brain-compiler', commit: '0052f9c442a0ee8e6074f715d0c31a56e123b81f' },
  { name: 'Claims register', href: 'https://github.com/intent-solutions-io/bobs-big-brain-umbrella', commit: '645fefcdb12bab98bbdd878cc4131aa871d038f9' },
];
export const deliveryStatus = 'Merged source is identified below. Release and distribution alignment remains open; matching version labels do not prove matching bundles. The original installed artifact is plugin a1b74ca, labelled 1.2.0. No later released installation or live brain acceptance is established by this source check.';

export const repos = [
  { layer: 'Package', name: 'bobs-big-brain-plugin', href: 'https://github.com/jeremylongshore/bobs-big-brain-plugin', job: 'The plugin you install, local or team.', license: 'Apache-2.0', version: '1.2.0', commit: 'a1b74ca' },
  { layer: 'Govern', name: 'bobs-big-brain-registrar', href: 'https://github.com/jeremylongshore/bobs-big-brain-registrar', job: 'Governance, receipts and the team API.', license: 'Apache-2.0', version: '0.8.0', commit: '2599598' },
  { layer: 'Compile', name: 'bobs-big-brain-compiler', href: 'https://github.com/jeremylongshore/bobs-big-brain-compiler', job: 'Optional compile step with its own trace.', license: 'Apache-2.0', version: '1.23.1', commit: 'b7ad84b' },
  { layer: 'Map', name: 'bobs-big-brain-umbrella', href: 'https://github.com/intent-solutions-io/bobs-big-brain-umbrella', job: 'The thesis, system map and tracker.', license: 'Apache-2.0', version: null, commit: 'ffd2711' },
  { layer: 'Retrieve', name: 'qmd', href: 'https://github.com/tobi/qmd', job: 'On-device keyword search by @tobi.', license: 'MIT', version: '2.5.3', commit: null },
];

export const layers = [
  { id: 'compile', name: 'Compile', line: 'Files become knowledge, if you want it.', note: 'Summaries, concepts and gaps from your own files, with their own trace chain.' },
  { id: 'govern', name: 'Govern', line: 'Code decides what stays.', note: 'Dedupe, policy and promotion run as code; durable promotions and retirements write hash-chained receipts.' },
  { id: 'retrieve', name: 'Retrieve', line: 'Answers cite the exact memory.', note: 'Keyword search fused by rank, reranked for freshness; a configured semantic arm needs an embedder. No generative model at query time.' },
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

3) Tell me to fully quit and reopen Claude Code. The first start sets up three native modules with npm once; use the maintained Linux Node 22 environment with matching native ABI and npm on my PATH. Other platforms need separate verification.

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
  { name: 'Node and npm for the chosen artifact', detail: 'Maintained local runtime and recovery: Linux Node 22 with matching native ABI. First start fetches three pinned modules; other platforms need separate verification.' },
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

// LIM identifiers match umbrella 031. Original findings are observations, not
// claims that later source still has the same defect. Source fixes are not release proof.
export const limits = [
  { id: 'LIM-01', observedAt: verifiedAt, title: 'Fresh policy defaults: source corrected', short: 'The original install enabled two of ten rules; later source seeds ten for a fresh tenant.', body: 'Existing policies are not rewritten. Enabled rules do not all decide every capture, and best-effort seed failure is not fail-closed bootstrap.', href: tracker, fixes: [90] },
  { id: 'LIM-02', observedAt: verifiedAt, title: 'Rejected candidates: source corrected', short: 'The original install left rejected rows without individual receipts; later source settles rejections with per-candidate evidence.', body: 'Review-only flags can remain without a new receipt. A skipped or failed settlement is not a completed rejection.', href: tracker, fixes: [88] },
  { id: 'LIM-03', observedAt: verifiedAt, title: 'Intake refusals: source feedback added', short: 'The original capture gave no warning; later MCP source reports disclosure refusals before writing, and raw-spool intake reports safe refusal counts.', body: 'Pre-intake refusals create no candidate, memory or audit row. Retained raw input and archives can contain refused content; regex filtering does not catch every disclosure.', href: tracker, fixes: [89, 95] },
  { id: 'LIM-04', observedAt: verifiedAt, title: 'Searches are not receipted', short: 'Receipts cover durable governance settlements, not searches.', body: 'Search access logging is separate from the receipt chain. Review-only flags and pre-intake refusals also have no per-decision receipt guarantee.', href: null, fixes: [] },
  { id: 'LIM-05', observedAt: verifiedAt, title: 'Current truth does not always win yet', short: 'Older reference can still outrank a newer decision.', body: 'On a large brain, older reference material can outrank a newer decision. This source update does not establish a new ranking result.', href: currentTruthTracker, fixes: [] },
  { id: 'LIM-06', observedAt: verifiedAt, title: 'Team users cannot verify from the plugin', short: 'The team plugin exposes no audit-verification tool.', body: 'brain_audit_verify is a local-mode tool. Team permissions were checked in code, not by the original local installation test.', href: null, fixes: [] },
  { id: 'LIM-07', observedAt: verifiedAt, title: 'Distribution alignment remains open', short: 'Identical version labels do not establish identical builds.', body: 'The audit found different distribution copies labelled 1.2.0. Merged source fixes still need release, channel identity and chosen-artifact installation checks.', href: tracker, fixes: [] },
];
