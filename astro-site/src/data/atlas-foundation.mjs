// Public explanatory models, grounded in the linked first-party artifacts.
// A relationship describes its stated role; it does not assert an automated integration.
const node = (id, x, y, w, h, title, eyebrow, body, color, extra = {}) => ({
  id, x, y, w, h, title, eyebrow, body, color, items: [], ...extra,
});
const edge = (from, to, path, kind = 'flow', extra = {}) => ({ from, to, path, kind, ...extra });
const link = (label, href) => ({ label, href });

export const foundationPages = [
  {
    id: 'estate', number: '01', title: 'One company. Several ways to create value.',
    kicker: 'Macro / the company architecture', status: 'mixed',
    lead: 'Intent Solutions connects applied AI engineering, reusable software, research, education, products and media around one purpose: making useful technology work reliably inside real operations.',
    takeaway: 'The estate is the work, knowledge, tools and relationships that reinforce the company. Its websites are entry points into that system.',
    diagram: {
      width: 1320, height: 760,
      description: 'Six company functions surround a shared Intent Solutions practice. The mission guides the practice. An emerging international engineering and commercial network would coordinate opportunities and delivery. A shared operating spine supports every function.',
      regions: [
        { x: 16, y: 22, w: 338, h: 650, label: 'BUILD CAPABILITY', color: 'blue' },
        { x: 966, y: 22, w: 338, h: 650, label: 'COMPOUND THE WORK', color: 'green' },
      ],
      nodes: [
        node('engineering', 30, 58, 310, 176, 'Client engineering', '01 / DELIVERY', 'Frame an outcome; engineer workflows, integrations, agents and human controls.', 'orange', { href: 'https://intentsolutions.io/', items: [{ label: 'Architecture → deployment → operation' }] }),
        node('opensource', 30, 270, 310, 176, 'Open source & tooling', '02 / REUSABLE CAPABILITY', 'Publish inspectable skills, plugins and developer tools.', 'cyan', { items: [link('Tons of Skills', 'https://tonsofskills.com/'), link('Omarchy desktop tools', 'https://oma.intentsolutions.io/')] }),
        node('education', 30, 482, 310, 176, 'Education & community', '03 / KNOWLEDGE TRANSFER', 'Practice engineering judgment through shared methods, artifacts and review.', 'blue', { href: 'https://learn.intentsolutions.io/', items: [{ label: 'Learn · peer practice · proof paths' }] }),
        node('mission', 495, 58, 330, 154, 'Close the deployment gap', 'THE CONSISTENT MISSION', 'Turn changing AI capability into reliable, measurable work people can own and improve.', 'slate'),
        node('practice', 495, 270, 330, 176, 'Intent Solutions', 'ONE APPLIED AI ENGINEERING COMPANY', 'Frame → Build → Prove → Operate. Models and providers remain replaceable components.', 'orange', { items: [{ label: 'Outcome · evidence · accountable owner' }] }),
        node('network', 495, 482, 330, 176, 'Engineering network', 'EMERGING SEVENTH ARM', 'Connect customers, originators and independent specialists through accountable coordination.', 'amber', { status: 'proposed', items: [{ label: 'Terms and capacity still being established' }] }),
        node('products', 980, 58, 310, 176, 'Owned products', '04 / FOCUSED SOFTWARE', 'DiagnosticPro, Scorecard Echo and HustleStats apply the engineering to specific markets.', 'green', { items: [link('Explore the product portfolio', 'https://jeremylongshore.com/')] }),
        node('research', 980, 270, 310, 176, 'Research & evidence', '05 / TEST AND INSPECT', 'Test behavior, preserve results and show working systems.', 'purple', { items: [link('Labs · results', 'https://labs.intentsolutions.io/'), link('Evals · definitions', 'https://evals.intentsolutions.io/')] }),
        node('media', 980, 482, 310, 176, 'Content & media', '06 / DISCOVERY AND EXPLANATION', 'Publish field notes, demos and explanations of permitted work.', 'cyan', { items: [link('Start AI Tools journal', 'https://startaitools.com/'), link('Working demos', 'https://demos.intentsolutions.io/')] }),
      ],
      edges: [
        edge('mission', 'practice', 'M660 212 V270', 'governance', { label: 'sets direction', labelX: 724, labelY: 247 }),
        edge('practice', 'engineering', 'M495 310 H425 V146 H340', 'flow', { label: 'deliver', labelX: 382, labelY: 130 }),
        edge('practice', 'opensource', 'M495 358 H340', 'flow', { label: 'reuse', labelX: 418, labelY: 340 }),
        edge('practice', 'education', 'M495 405 H405 V570 H340', 'flow', { label: 'teach', labelX: 372, labelY: 552 }),
        edge('practice', 'products', 'M825 310 H895 V146 H980', 'flow', { label: 'productize', labelX: 938, labelY: 130 }),
        edge('practice', 'research', 'M825 358 H980', 'flow', { label: 'test', labelX: 902, labelY: 340 }),
        edge('practice', 'media', 'M825 405 H915 V570 H980', 'flow', { label: 'explain', labelX: 948, labelY: 552 }),
        edge('practice', 'network', 'M660 446 V482', 'governance', { label: 'coordinate', labelX: 724, labelY: 469 }),
      ],
      notes: [{ x: 40, y: 705, w: 1240, text: 'Shared operating spine: source and decisions · durable work tracking · governed knowledge · release evidence · production operations.' }],
    },
    panels: [
      { title: 'A company architecture, with room to evolve', body: 'These are functions that reinforce one another. A product or team may contribute to several functions; the map is not a fixed department chart.', items: ['The mission stays consistent while technologies and delivery methods change.', 'Public artifacts demonstrate capability at their own scope and maturity.', 'The emerging network is a model under development.'] },
      { title: 'One piece of work can serve several purposes', body: 'A troubleshooting workflow can become a client implementation, an evaluated skill, a permitted demonstration and a lesson. Each use has its own permission, quality and maintenance requirements.', items: ['Private customer work stays private unless publication is authorized.', 'Portfolio discovery links to products with differing maturity.', 'Public adoption, community participation and contracted delivery are separate signals.'] },
      { title: 'Products make the breadth concrete', body: 'Vertical products carry the engineering into repair diagnostics, live baseball analysis and youth soccer development. Other products package the underlying engineering methods themselves.', items: ['DiagnosticPro: repair diagnostics and work planning.', 'Scorecard Echo: a baseball broadcast-booth companion.', 'HustleStats: youth soccer performance tracking.', 'Bob’s Big Brain and the Intent Eval Platform: governed knowledge and evaluation infrastructure.', 'Intent Longbox: collectibles intake-to-commerce, in development.'] },
      { title: 'The external ecosystem has a place', body: 'Learn links public Anthropic-issued credential evidence. Claude, OpenAI, Gemini and local models remain technology choices to assess against the work; the shared engineering standard extends across vendor ecosystems.', items: ['Credential evidence has a defined scope; it does not establish the whole company’s delivery capacity.', 'Vendor learning and open-source contributions can strengthen capability and relationships.', 'Tons of Skills is model-neutral at its canonical source layer; Claude Code is its currently verified-native harness.'] },
    ],
    sources: [link('Intent Solutions practice', 'https://intentsolutions.io/'), link('Learn and linked credential evidence', 'https://learn.intentsolutions.io/'), link('Tons of Skills', 'https://tonsofskills.com/'), link('Omarchy portfolio', 'https://oma.intentsolutions.io/'), link('Product portfolio', 'https://jeremylongshore.com/'), link('DiagnosticPro', 'https://diagnosticpro.io/'), link('Scorecard Echo', 'https://scorecardecho.com/'), link('HustleStats', 'https://hustlestats.io/'), link('Intent Longbox development', 'https://github.com/jeremylongshore/intent-longbox'), link('Implementation journal', 'https://startaitools.com/'), { label: 'Network direction and six-function framing: owner-supplied vision, October 2026.' }],
    mermaid: `flowchart TB
  M[Close the deployment gap] --> I[Intent Solutions: Frame / Build / Prove / Operate]
  I --> E[Client engineering]
  I --> O[Open source and tooling]
  I --> L[Education and community]
  I --> P[Owned products]
  I --> R[Research and evidence]
  I --> C[Content and media]
  I -. emerging .-> N[International engineering and commercial network]
  S[Shared operating spine] -. supports .-> I`,
  },
  {
    id: 'compounding', number: '02', title: 'How one piece of work can compound.',
    kicker: 'Macro to micro / the intended business loop', status: 'mixed',
    lead: 'Engineering creates more than a finished implementation. With clear permissions, evidence and ownership, it can also create reusable assets, teaching material and new questions worth solving.',
    takeaway: 'Compounding requires deliberate choices at each handoff. Attention, adoption, qualified demand and revenue are different outcomes.',
    diagram: {
      width: 1320, height: 760,
      description: 'A real workflow problem moves through engineering and evidence to a rights and reuse decision. Work may remain private or become tools, knowledge or products. Use and audience feedback can create qualified conversations and better briefs that restart the loop. This is an intended operating model, not a proven revenue engine.',
      regions: [
        { x: 20, y: 35, w: 1280, h: 235, label: 'CREATE AND PROVE', color: 'orange' },
        { x: 20, y: 335, w: 1280, h: 215, label: 'CHOOSE WHAT MAY TRAVEL', color: 'purple' },
        { x: 20, y: 565, w: 1280, h: 165, label: 'LISTEN, QUALIFY AND REUSE', color: 'green' },
      ],
      nodes: [
        node('problem', 40, 78, 245, 168, 'Real workflow', 'INPUT', 'A problem, its constraints, an intended outcome and a way to judge success.', 'orange'),
        node('build', 365, 78, 245, 168, 'Engineering', 'WORK', 'Integrate, build, handle exceptions and establish operating ownership.', 'blue'),
        node('prove', 690, 78, 245, 168, 'Evidence', 'CHECK THE CLAIM', 'Test the behavior, record limits and use failures to change the work.', 'purple'),
        node('rights', 1015, 78, 245, 168, 'Rights & reuse', 'DELIBERATE DECISION', 'Choose what stays private and what can be released, taught or productized.', 'amber'),
        node('private', 40, 375, 245, 155, 'Retained capability', 'KEEP PRIVATE', 'Client-specific knowledge, protected IP and operating documentation.', 'slate'),
        node('tools', 365, 375, 245, 155, 'Reusable tools', 'PUBLISH WHERE APPROPRIATE', 'Skills, plugins, integrations and source others can inspect and adapt.', 'cyan', { href: 'https://tonsofskills.com/' }),
        node('knowledge', 690, 375, 245, 155, 'Shared knowledge', 'EXPLAIN AND TEACH', 'Demos, lessons, field notes and research with their evidence and limits.', 'blue', { href: 'https://startaitools.com/' }),
        node('products', 1015, 375, 245, 155, 'Focused products', 'OWN THE REPEATED PROBLEM', 'A maintained product when a repeated need supports a distinct offering.', 'green', { href: 'https://jeremylongshore.com/' }),
        node('brief', 40, 595, 245, 125, 'A sharper brief', 'RETURN TO THE WORK', 'Reuse lessons and test the next problem.', 'orange'),
        node('qualified', 365, 595, 245, 125, 'Qualified relationship', 'HUMAN COMMERCIAL WORK', 'Establish fit, authority and a real need.', 'amber'),
        node('discovery', 690, 595, 245, 125, 'Discovery & trust', 'AUDIENCE RESPONSE', 'People inspect, learn, adopt and ask.', 'cyan'),
        node('feedback', 1015, 595, 245, 125, 'Use & operations', 'PRODUCT FEEDBACK', 'Observe friction, failures and new needs.', 'green'),
      ],
      edges: [
        edge('problem', 'build', 'M285 162 H365', 'flow', { label: 'scope', labelX: 325, labelY: 145 }),
        edge('build', 'prove', 'M610 162 H690', 'flow', { label: 'test', labelX: 650, labelY: 145 }),
        edge('prove', 'rights', 'M935 162 H1015', 'flow', { label: 'assess', labelX: 975, labelY: 145 }),
        edge('prove', 'build', 'M812 78 V62 H488 V78', 'feedback', { label: 'failed → revise', labelX: 650, labelY: 56 }),
        edge('rights', 'private', 'M1138 246 V306 H162 V375', 'governance', { label: 'retain', labelX: 162, labelY: 329 }),
        edge('rights', 'tools', 'M1138 246 V306 H488 V375', 'governance', { label: 'publish', labelX: 488, labelY: 329 }),
        edge('rights', 'knowledge', 'M1138 246 V306 H812 V375', 'governance', { label: 'teach', labelX: 812, labelY: 329 }),
        edge('rights', 'products', 'M1138 246 V375', 'governance', { label: 'productize', labelX: 1138, labelY: 329 }),
        edge('private', 'brief', 'M162 530 V595', 'feedback'),
        edge('tools', 'discovery', 'M488 530 V570 H812 V595', 'flow', { label: 'adoption', labelX: 650, labelY: 556 }),
        edge('knowledge', 'discovery', 'M812 530 V595'),
        edge('products', 'feedback', 'M1138 530 V595'),
        edge('discovery', 'qualified', 'M690 670 H610', 'flow', { label: 'qualify', labelX: 650, labelY: 652 }),
        edge('qualified', 'brief', 'M365 670 H285', 'flow', { label: 'reframe', labelX: 325, labelY: 652 }),
        edge('feedback', 'brief', 'M1138 720 V747 H162 V720', 'feedback', { label: 'use · failures · new needs', labelX: 650, labelY: 740 }),
        edge('brief', 'problem', 'M40 670 H8 V162 H40', 'feedback'),
      ], notes: [{ x: 45, y: 278, w: 740, text: 'A failed test sends the work back for correction before it can support a wider claim.' }],
    },
    panels: [
      { title: 'The gates give the loop meaning', body: 'Useful output does not automatically become public IP or a product. Rights, audience need, evidence and an ongoing owner determine which path is appropriate.', items: ['A demo needs permission and a truthful account of what it demonstrates.', 'An open-source component needs a license and a maintenance boundary.', 'A product needs a defined user problem and an operating plan.'] },
      { title: 'Feedback has several jobs', body: 'Failure can revise architecture; product use can expose another need; teaching can reveal a missing explanation. Commercial qualification tests whether an interested audience has a problem the company should take on.', items: ['Adoption can demonstrate interest without proving willingness to pay.', 'Credentials and community activity can demonstrate learning without proving capacity.', 'The intended loop still needs evidence of repeatable commercial conversion.'] },
      { title: 'An illustrative walkthrough', body: 'A repeated support task could produce an integration, a test case, a reusable troubleshooting skill and a lesson. That is a design example of how assets connect, not a reported client outcome.', items: ['The deployed task retains its own owner and acceptance criteria.', 'Only permitted, reusable parts enter public distribution.', 'Later use informs the next version of the tool and the next brief.'] },
    ],
    sources: [link('The shared engineering method', 'https://intentsolutions.io/'), link('Evidence and scoped evaluations', 'https://labs.intentsolutions.io/'), link('Practitioner knowledge transfer', 'https://learn.intentsolutions.io/'), link('Public reusable components', 'https://tonsofskills.com/'), link('Implementation journal', 'https://startaitools.com/'), { label: 'Routing and commercial feedback: owner-directed intended operating model.' }],
    mermaid: `flowchart LR
  P[Real workflow] --> B[Engineering] --> E[Evidence] --> R[Rights and reuse]
  E -. revise .-> B
  R --> V[Retained private capability]
  R --> T[Reusable tools]
  R --> K[Demos / teaching / content]
  R --> S[Focused products]
  T --> A[Discovery and trust]
  K --> A
  A --> Q[Qualified relationship] --> N[Sharper brief]
  S --> F[Use and operations feedback] --> N
  V --> N
  N -. next problem .-> P`,
  },
  {
    id: 'spine', number: '04', title: 'The operating spine underneath the estate.',
    kicker: 'Micro / durable context, coordinated work and operations', status: 'mixed',
    lead: 'People and agents need to know what is authoritative, what work is ready, what has been learned and what is safe to release. Separate systems hold those responsibilities; shared interfaces make them usable together.',
    takeaway: 'The model can change without losing the company’s source, work history or governed knowledge. Durable state belongs to systems with explicit owners and rules.',
    diagram: {
      width: 1320, height: 760,
      description: 'Three durable authorities hold source and decisions, Beads work state and governed knowledge. Skills, MCP tools and agent sessions use those authorities to perform bounded work. Review and release gates connect work to deployment, operation and new evidence. Arrows show responsibility and information flow, not a claim that every integration is fully automated.',
      regions: [
        { x: 16, y: 25, w: 1288, h: 232, label: 'DURABLE AUTHORITIES / EACH HAS A DISTINCT JOB', color: 'purple' },
        { x: 16, y: 295, w: 1288, h: 238, label: 'INTERFACES AND BOUNDED ACTION', color: 'blue' },
        { x: 16, y: 550, w: 1288, h: 192, label: 'RELEASE, OPERATE AND LEARN', color: 'green' },
      ],
      nodes: [
        node('source', 30, 70, 330, 170, 'Source & decisions', 'INTENT OS + REPOSITORIES', 'Source code, company policies, interface contracts, operating docs and recorded decisions.', 'purple', { items: [{ label: 'Git history · explicit authority' }] }),
        node('beads', 490, 70, 330, 170, 'Durable work', 'BEADS + DOLT', 'Issues, dependencies, claims, acceptance evidence and task history across sessions.', 'purple', { href: 'https://github.com/gastownhall/beads', items: [{ label: 'Dolt database authority · Git code history' }] }),
        node('brain', 960, 70, 330, 170, 'Governed knowledge', 'BOB’S BIG BRAIN', 'Capture proposals, apply governance, retrieve cited knowledge and verify audit receipts.', 'purple', { href: 'https://github.com/jeremylongshore/bobs-big-brain-plugin', items: [{ label: 'Compile → govern → retrieve' }] }),
        node('skills', 30, 335, 270, 165, 'Skills', 'REPEATABLE PROCEDURES', 'Specify the method, required context and completion conditions for a class of work.', 'cyan', { href: 'https://tonsofskills.com/' }),
        node('mcp', 360, 335, 270, 165, 'MCP & tool interfaces', 'ACCESS TO CAPABILITIES', 'Expose bounded tools and retrieval. Access still follows the tool’s permissions.', 'cyan'),
        node('agents', 690, 335, 270, 165, 'People & agent sessions', 'EXECUTION AND JUDGMENT', 'Recover context, claim work, act within scope and leave evidence for the next session.', 'blue'),
        node('review', 1020, 335, 270, 165, 'Review & release gates', 'DECIDE WHETHER TO SHIP', 'Check acceptance, tests, changes and required human decisions before release.', 'amber'),
        node('deploy', 60, 590, 330, 130, 'Deployment', 'A CONTROLLED CHANGE', 'Versioned release, verification and an available rollback path.', 'green'),
        node('operate', 495, 590, 330, 130, 'Operation', 'AN ACCOUNTABLE OWNER', 'Observe health, respond to failures and maintain recovery procedures.', 'green'),
        node('learn', 930, 590, 330, 130, 'Evidence & proposals', 'CLOSE THE CONTEXT LOOP', 'Record what changed. Propose useful lessons for governed recall.', 'purple'),
      ],
      edges: [
        edge('source', 'skills', 'M195 240 V282 H165 V335', 'governance', { label: 'procedures', labelX: 267, labelY: 281 }),
        edge('beads', 'agents', 'M655 240 V280 H825 V335', 'governance', { label: 'claim work', labelX: 738, labelY: 303 }),
        edge('brain', 'mcp', 'M1125 240 V268 H495 V335', 'governance', { label: 'cited recall', labelX: 930, labelY: 261 }),
        edge('skills', 'agents', 'M165 500 V521 H825 V500', 'flow', { label: 'shared method', labelX: 460, labelY: 544 }),
        edge('mcp', 'agents', 'M630 415 H690', 'flow', { label: 'tools', labelX: 660, labelY: 398 }),
        edge('agents', 'review', 'M960 415 H1020', 'flow', { label: 'evidence', labelX: 990, labelY: 398 }),
        edge('review', 'deploy', 'M1155 500 V560 H225 V590', 'governance', { label: 'authorized release', labelX: 825, labelY: 577 }),
        edge('deploy', 'operate', 'M390 655 H495', 'flow', { label: 'run', labelX: 442, labelY: 640 }),
        edge('operate', 'learn', 'M825 655 H930', 'flow', { label: 'observations', labelX: 877, labelY: 640 }),
        edge('learn', 'brain', 'M1095 720 V748 H1308 V275 H1170 V240', 'feedback', { label: 'propose lesson', labelX: 1196, labelY: 742 }),
      ], notes: [],
    },
    panels: [
      { title: 'Each authority answers a different question', body: 'Source records what exists and what was decided. Work tracking records what remains and why it is blocked. Governed memory records what may be recalled as an accepted lesson.', items: ['An index is a rebuildable search aid, not a replacement authority.', 'A dashboard is a projection with a scope and freshness boundary.', 'A proposed memory is not accepted knowledge merely because an agent wrote it.'] },
      { title: 'Bob’s Big Brain, closer in', body: 'The Compiler can derive knowledge from a source corpus. The Registrar applies governance and maintains receipts; qmd supplies cited retrieval. The plugin exposes that loop through tools and skills.', items: ['Local mode operates in process after provisioning.', 'Team mode proxies to a shared governed-brain service.', 'The Compiler itself is a local tool; a team interface does not prove every ingestion path is deployed.'] },
      { title: 'Coordination without pretending everything is automatic', body: 'The estate combines source, tools and operating procedures at different stages of adoption. People remain responsible for scope, promotion, release, response and recovery.', items: ['Beads history and code history travel in different Git reference lanes.', 'Hooks restore context and apply local guardrails; review and CI enforce their release checks.', 'Capabilities and rollout status must be checked in their owning repository.', 'Operational proof includes failure and recovery behavior, not just a passing build.'] },
      { title: 'The business and operations support layer', body: 'The spine also connects relationship management, project coordination, communication and operational awareness. Each tool retains a defined job; a shared view does not make every system one synchronized authority.', items: ['Twenty supports relationship tracking; Plane provides a project-coordination surface alongside Beads work records.', 'Mission Control projects scoped status from the owning systems, preserving source, freshness and unknown states.', 'MXroute handles company email; Buzz supports team conversations and notification surfaces.', 'Monitoring, alert routing, backups and restore procedures support the person accountable for operations.', 'The public Mission Control view is a bounded reporting projection, not the private operations console.'] },
    ],
    sources: [link('Public developer and operating-tool inventory', 'https://jeremylongshore.com/'), link('Governed brain plugin and team mode', 'https://github.com/jeremylongshore/bobs-big-brain-plugin'), link('Compiler architecture', 'https://github.com/jeremylongshore/bobs-big-brain-compiler'), link('Registrar', 'https://github.com/jeremylongshore/bobs-big-brain-registrar'), link('Beads', 'https://github.com/gastownhall/beads'), link('Reusable procedures', 'https://tonsofskills.com/'), link('Public Mission Control projection', 'https://demos.intentsolutions.io/mission-control/'), link('Buzz application fork', 'https://github.com/intent-solutions-io/buzz'), { label: 'Intent OS is the private company control surface; this page shows conceptual responsibilities, not private infrastructure topology.' }],
    mermaid: `flowchart TB
  D[Source and decisions / Intent OS and Git] --> S[Skills and procedures]
  W[Beads and Dolt / durable work] --> A[People and agent sessions]
  K[Governed knowledge / Bob's Big Brain] --> M[MCP and tools]
  S --> A
  M --> A
  A --> R[Review and release gates]
  R --> X[Deployment] --> O[Operation] --> P[Evidence and memory proposals]
  P -. governance required .-> K`,
  },
  {
    id: 'evidence', number: '05', title: 'From a claim to a release decision.',
    kicker: 'Micro / research, contracts, evaluation and proof', status: 'mixed',
    lead: 'A useful evaluation names the task, criteria, scope and result. The Intent Eval Platform separates methodology, executable checks, shared evidence contracts and rollout decisions so the conclusion can be inspected.',
    takeaway: 'Labs investigates and explains. Evals defines result meanings. Harnesses perform checks. A rollout policy decides whether a specific result permits a release.',
    diagram: {
      width: 1320, height: 760,
      description: 'The six-repository Intent Eval Platform connects Lab methodology and Core contracts to task cases, deterministic checks and behavioral evaluation. Checks emit an Evidence Bundle; the rollout gate combines it with a policy and emits a decision record for the dashboard. Failure returns to the test or implementation. This shows the architecture, not universal deployment coverage.',
      regions: [
        { x: 16, y: 27, w: 310, h: 480, label: 'DEFINE', color: 'purple' },
        { x: 352, y: 27, w: 603, h: 430, label: 'EXECUTE AND MEASURE', color: 'blue' },
        { x: 988, y: 130, w: 300, h: 260, label: 'PRESERVE EVIDENCE', color: 'purple' },
        { x: 352, y: 495, w: 936, h: 218, label: 'APPLY POLICY AND RECORD THE DECISION', color: 'green' },
      ],
      nodes: [
        node('method', 30, 78, 280, 166, 'Intent Eval Lab', 'METHODOLOGY', 'Define the question, test method, failure cases and interpretation limits.', 'purple', { href: 'https://github.com/jeremylongshore/intent-eval-lab' }),
        node('contracts', 30, 325, 280, 166, 'Intent Eval Core', 'SHARED CONTRACTS', 'Versioned types, schemas, validators and state definitions make results comparable.', 'purple', { shape: 'artifact', href: 'https://github.com/jeremylongshore/intent-eval-core' }),
        node('cases', 370, 78, 230, 166, 'Task cases & criteria', 'SCOPE THE CLAIM', 'Choose representative work, expected behavior and cases that must fail.', 'blue', { shape: 'artifact' }),
        node('checks', 670, 60, 270, 166, 'Audit Harness', 'DETERMINISTIC CHECKS', 'Check declared source and test-policy requirements with reproducible gates.', 'cyan', { href: 'https://github.com/jeremylongshore/intent-audit-harness' }),
        node('behavior', 670, 275, 270, 166, 'J-Rig', 'BEHAVIORAL EVALUATION', 'Exercise an artifact against explicit criteria; preserve observations and judgments.', 'blue', { href: 'https://github.com/jeremylongshore/j-rig-skill-binary-eval' }),
        node('bundle', 1000, 178, 270, 184, 'Evidence Bundle', 'SHARED RESULT ENVELOPE', 'Carry the result, scope and supporting evidence in the platform’s versioned contract.', 'purple', { shape: 'artifact', items: [{ label: 'Inspectable evidence · declared limits' }] }),
        node('policy', 370, 540, 230, 154, 'Rollout policy', 'DECLARED DECISION RULE', 'State which results permit this release and which conditions must block it.', 'amber', { shape: 'artifact' }),
        node('gate', 670, 540, 270, 154, 'Intent Rollout Gate', 'ALLOW OR BLOCK', 'Apply a policy to the supplied evidence and record the decision.', 'green', { shape: 'gate', href: 'https://github.com/jeremylongshore/intent-rollout-gate' }),
        node('record', 1000, 540, 270, 154, 'Signed decision record', 'TRACEABLE OUTCOME', 'Preserve the decision and its evidence reference for later inspection.', 'green', { shape: 'artifact', href: 'https://evals.intentsolutions.io/' }),
        node('dashboard', 30, 565, 280, 144, 'Intent Eval Dashboard', 'INSPECTION SURFACE', 'Expose methodology and available results with their scope and freshness.', 'cyan', { href: 'https://labs.intentsolutions.io/' }),
      ],
      edges: [
        edge('method', 'cases', 'M310 161 H370', 'flow', { label: 'method', labelX: 340, labelY: 143 }),
        edge('contracts', 'cases', 'M310 405 H338 V263 H485 V244', 'governance'),
        edge('cases', 'checks', 'M600 161 H638 V143 H670', 'flow', { label: 'criteria', labelX: 640, labelY: 128 }),
        edge('cases', 'behavior', 'M485 244 V358 H670', 'flow', { label: 'cases', labelX: 590, labelY: 342 }),
        edge('checks', 'bundle', 'M940 143 H972 V235 H1000', 'flow', { label: 'checks', labelX: 970, labelY: 164 }),
        edge('behavior', 'bundle', 'M940 358 H972 V310 H1000', 'flow', { label: 'results', labelX: 977, labelY: 382 }),
        edge('contracts', 'bundle', 'M310 450 H1135 V362', 'governance', { label: 'schema', labelX: 480, labelY: 470 }),
        edge('bundle', 'gate', 'M1135 362 V478 H805 V540', 'flow', { label: 'evidence', labelX: 1010, labelY: 470 }),
        edge('policy', 'gate', 'M600 617 H670', 'governance', { label: 'policy', labelX: 635, labelY: 601 }),
        edge('gate', 'record', 'M940 617 H1000', 'flow', { label: 'decision', labelX: 970, labelY: 601 }),
        edge('record', 'dashboard', 'M1135 694 V738 H170 V709', 'flow', { label: 'signed result', labelX: 650, labelY: 732 }),
        edge('gate', 'cases', 'M670 575 H625 V259 H570 V244', 'feedback', { label: 'failed → revise', labelX: 634, labelY: 489 }),
      ], notes: [{ x: 38, y: 517, w: 270, text: 'Published results are scoped observations, not blanket certification.' }],
    },
    panels: [
      { title: 'Six repositories, one evidence language', body: 'Lab, Core, Audit Harness, J-Rig, Rollout Gate and Dashboard retain separate responsibilities and releases. Their shared contracts connect the work without pretending they are one monolithic service.', items: ['Methodology and contracts define what the result means.', 'Executable checks generate observations for the declared task.', 'A rollout rule turns evidence into a bounded release decision.'] },
      { title: 'A failure is useful information', body: 'A failed evaluation can block a release and identify what must change. A missing or stale result establishes uncertainty; it must not silently become a pass or an invented failure.', items: ['The task, version and test conditions belong with the result.', 'A passing example does not establish performance for every workflow.', 'The same discipline applies when the model or provider changes.'] },
      { title: 'What can be inspected today', body: 'The public Lab includes scoped skill evaluation examples and methodology. Its published boundary is explicit: skill checks run locally; agent loops and workflows need a custom test setup.', items: ['Demos show behavior and link evidence where available.', 'Evals preserves definitions for interpreting records.', 'The diagram explains the architecture; current integration coverage belongs to the source repositories.'] },
    ],
    sources: [link('Lab capabilities and limits', 'https://labs.intentsolutions.io/'), link('Result definitions', 'https://evals.intentsolutions.io/'), link('Platform repository', 'https://github.com/intent-solutions-io/intent-eval-platform'), link('Lab methodology', 'https://github.com/jeremylongshore/intent-eval-lab'), link('Behavioral evaluation', 'https://github.com/jeremylongshore/j-rig-skill-binary-eval'), link('Audit Harness', 'https://github.com/jeremylongshore/intent-audit-harness'), link('Working demonstrations', 'https://demos.intentsolutions.io/')],
    mermaid: `flowchart LR
  L[Intent Eval Lab / methodology] --> C[Task cases and criteria]
  K[Intent Eval Core / contracts] --> C
  C --> A[Audit Harness / deterministic checks]
  C --> J[J-Rig / behavioral evaluation]
  A --> E[Evidence Bundle]
  J --> E
  K -. schema .-> E
  E --> G[Intent Rollout Gate]
  P[Rollout policy] --> G
  G --> R[Signed decision record]
  R --> D[Intent Eval Dashboard]
  G -. revise after failure .-> C`,
  },
];
