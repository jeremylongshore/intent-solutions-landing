/** Public-safe explanations of the operating vision, not contract terms or a capacity claim. */
export const networkPages = [
  {
    id: 'people', number: '06', title: 'People, practice and permission to deliver',
    kicker: 'Participation architecture',
    lead: 'People can learn, contribute, introduce opportunities or deliver specialist work. Each responsibility needs its own evidence and authority.',
    takeaway: 'Joining the practice, earning a credential, demonstrating capability and accepting a customer engagement are different decisions.',
    status: 'mixed',
    diagram: {
      width: 1320, height: 760,
      description: 'Current practice entry requires human review and verified agreements. The reviewer may request clarification, pause or decline. Proposed customer-work qualification checks role evidence and current fit separately; insufficient evidence returns for reassessment, while unavailable capacity pauses assignment. Practice access never grants customer-delivery authority.',
      regions: [
        { x: 20, y: 18, w: 1280, h: 360, label: '01 / PRACTICE ENTRY · CURRENT ONBOARDING CAPABILITY', color: 'cyan' },
        { x: 20, y: 400, w: 1280, h: 350, label: '02 / CUSTOMER RESPONSIBILITY · PROPOSED QUALIFICATION AND AUTHORIZATION', color: 'amber' },
      ],
      nodes: [
        { id: 'request', x: 40, y: 65, w: 250, h: 180, title: 'Request access', eyebrow: 'An introduction', body: 'Share relevant work, your contribution and why the practice fits.', items: [{ label: 'Public or sanitized private work' }, { label: 'Purpose and permission to continue' }], color: 'cyan', status: 'existing', href: 'https://learn.intentsolutions.io/request-access' },
        { id: 'review', x: 365, y: 65, w: 250, h: 180, title: 'Human review', eyebrow: 'A bounded decision', body: 'Resolve material gaps and decide whether to continue the introduction.', items: [{ label: 'AI can organize evidence' }, { label: 'A person retains the decision' }], color: 'cyan', status: 'existing' },
        { id: 'agreements', x: 690, y: 65, w: 250, h: 180, title: 'Onboarding agreements', eyebrow: 'Documented relationship', body: 'Complete the applicable NDA and User Agreement before access release.', items: [{ label: 'Verify actual completion' }, { label: 'Retain the agreement evidence' }], color: 'green', shape: 'artifact', status: 'existing' },
        { id: 'practice', x: 1015, y: 65, w: 265, h: 180, title: 'Join the practice', eyebrow: 'Access and welcome', body: 'Receive the welcome, resources and approved account access.', items: [{ label: 'Shared method and peers' }, { label: 'Optional vendor proof paths' }], color: 'purple', status: 'existing', href: 'https://learn.intentsolutions.io/' },
        { id: 'review-alternative', x: 365, y: 268, w: 250, h: 107, title: 'Clarify, pause or decline', eyebrow: '', body: 'A request can stop here. New evidence can be reviewed.', items: [], color: 'slate' },
        { id: 'engineering-proof', x: 40, y: 445, w: 250, h: 140, title: 'Engineering evidence', eyebrow: 'Role-specific proof', body: 'Explain the implementation, tradeoffs and failure handling.', items: [{ label: 'Ownership · evaluation · handoff' }], color: 'blue', shape: 'artifact' },
        { id: 'commercial-proof', x: 40, y: 605, w: 250, h: 140, title: 'Commercial evidence', eyebrow: 'A different contribution', body: 'Show discovery, opportunity quality or domain judgment.', items: [{ label: 'Attribution · context · references' }], color: 'purple', shape: 'artifact' },
        { id: 'capability', x: 365, y: 445, w: 230, h: 175, title: 'Assess capability', eyebrow: 'Role-specific judgment', body: 'Compare the work with the role and responsibility.', items: [{ label: 'Claimed ≠ observed' }, { label: 'Credential ≠ delivery readiness' }], color: 'amber', shape: 'gate' },
        { id: 'capacity', x: 665, y: 445, w: 250, h: 175, title: 'Confirm engagement fit', eyebrow: 'A current commitment', body: 'Check capacity, scope, conflicts and willingness to accept this work.', items: [{ label: 'Availability changes over time' }, { label: 'Independent parties can decline' }], color: 'amber', shape: 'gate' },
        { id: 'authorization', x: 985, y: 445, w: 295, h: 175, title: 'Authorize specific work', eyebrow: 'Scope and accountability', body: 'Agree deliverables, acceptance and the accountable lead.', items: [{ label: 'Appropriate signed arrangement' }, { label: 'Access limited to the engagement' }], color: 'orange', shape: 'gate' },
        { id: 'reassessment', x: 365, y: 642, w: 230, h: 106, title: 'Develop and reassess', eyebrow: '', body: 'Return with useful evidence. No capability is assumed.', items: [], color: 'slate' },
        { id: 'no-fit', x: 665, y: 642, w: 250, h: 106, title: 'No current fit', eyebrow: '', body: 'No assignment. Reconsider when circumstances change.', items: [], color: 'slate' },
      ],
      edges: [
        { from: 'request', to: 'review', path: 'M290 150 H365', kind: 'flow', label: 'review', labelX: 327, labelY: 136 },
        { from: 'review', to: 'agreements', path: 'M615 150 H690', kind: 'flow', label: 'approve', labelX: 652, labelY: 136 },
        { from: 'agreements', to: 'practice', path: 'M940 150 H1015', kind: 'flow', label: 'verified', labelX: 977, labelY: 136 },
        { from: 'review', to: 'review-alternative', path: 'M432 245 V268', kind: 'flow' },
        { from: 'review-alternative', to: 'review', path: 'M550 268 V245', kind: 'feedback' },
        { from: 'engineering-proof', to: 'capability', path: 'M290 507 H325 V490 H365', kind: 'flow' },
        { from: 'commercial-proof', to: 'capability', path: 'M290 667 H310 V575 H365', kind: 'flow' },
        { from: 'capability', to: 'capacity', path: 'M595 532 H665', kind: 'flow', label: 'supported', labelX: 630, labelY: 518 },
        { from: 'capacity', to: 'authorization', path: 'M915 532 H985', kind: 'flow', label: 'fit', labelX: 950, labelY: 518 },
        { from: 'capability', to: 'reassessment', path: 'M480 620 V642', kind: 'flow' },
        { from: 'reassessment', to: 'capability', path: 'M365 690 H340 V606 H365', kind: 'feedback' },
        { from: 'capacity', to: 'no-fit', path: 'M790 620 V642', kind: 'flow' },
      ],
      notes: [
        { x: 40, y: 290, w: 280, text: 'A human decision determines progression. A persuasive application does not bypass review.' },
        { x: 675, y: 290, w: 595, text: 'Practice access supports learning and relationships. It does not promise work or authorize representation of Intent Solutions.' },
        { x: 985, y: 655, w: 280, text: 'Delivery evidence informs future assessments. Recheck capacity for every engagement.' },
      ],
    },
    panels: [
      { title: 'Many ways to contribute', body: 'Engineers, architects, commercial originators, domain experts and independent firms can contribute different kinds of value. A code-only admission test would miss much of that value.', items: ['Assess the contribution relevant to the role.', 'Allow private-work descriptions when public artifacts are unavailable.', 'Treat credentials as optional evidence within a wider record.'] },
      { title: 'What is real today', body: 'Practice intake, human review and agreement-based onboarding exist. That operating capability is distinct from a fully calibrated international delivery network.', items: ['Current onboarding does not measure the entire community’s delivery capacity.', 'A membership count is not an available engineering roster.', 'Further assessment, commercial readiness and project authorization remain separate.'] },
      { title: 'What the stronger gate must establish', body: 'Before assigning customer responsibility, the proposed model needs evidence for the work, the capacity and the agreement. The acceptance standard follows the responsibility.', items: ['Comparable work reviewed against role-specific criteria.', 'A current commitment for a bounded engagement.', 'An accountable lead, signed scope and a defined escalation path.'] },
    ],
    sources: [
      { label: 'Intent Learn: practice and access', href: 'https://learn.intentsolutions.io/' },
      { label: 'Current request-access surface', href: 'https://learn.intentsolutions.io/request-access' },
      { label: 'Owner-provided operating brief; current onboarding records reviewed for this atlas' },
    ],
    mermaid: `flowchart LR
      subgraph Entry[Current practice entry]
        A[Request access] --> B[Human review]
        B -->|Approve| C[Onboarding agreements]
        B --> X[Clarify pause or decline]
        X -.->|New evidence| B
        C -->|Verified completion| D[Practice and optional proof paths]
      end
      subgraph Delivery[Proposed customer-work authorization]
        E[Engineering evidence] --> G[Role-specific capability review]
        F[Commercial or domain evidence] --> G
        G -->|Supported| H[Current capacity and engagement fit]
        G --> U[Develop and reassess]
        U -.->|Useful evidence| G
        H -->|Fit| I[Signed scope and specific authority]
        H --> V[Pause: no current fit]
      end`,
  },
  {
    id: 'network', number: '07', title: 'The emerging international network',
    kicker: 'Commercial and delivery architecture · proposed',
    lead: 'The proposed seventh arm connects customers, commercial originators, independent specialists and firms around work with clear responsibility.',
    takeaway: 'Intent must earn its role through identifiable value. Each engagement defines who contributes, who contracts and who answers for the outcome.',
    status: 'proposed',
    diagram: {
      width: 1320, height: 760,
      description: 'Customers, originators and delivery specialists interact through an Intent coordinating layer inside one engagement boundary. Below them are three families of possible arrangements. The model is proposed, participants may hold multiple roles, and independent business remains outside the boundary.',
      regions: [
        { x: 20, y: 18, w: 1280, h: 510, label: 'ONE ENGAGEMENT · SELECTED ROLES, EXPLICIT AUTHORITY, DEFINED RESPONSIBILITY', color: 'orange' },
        { x: 20, y: 562, w: 1280, h: 190, label: 'ARRANGEMENT FOLLOWS CONTRIBUTION · COMMERCIAL MODELS TO VALIDATE', color: 'amber' },
      ],
      nodes: [
        { id: 'customer', x: 495, y: 66, w: 330, h: 138, title: 'Customers', eyebrow: 'Problems · constraints · outcomes', body: 'Bring the operating context and the authority to define and accept the work.', items: [{ label: 'Business owner · success criteria' }], color: 'cyan' },
        { id: 'originators', x: 55, y: 260, w: 330, h: 220, title: 'Origination', eyebrow: 'Relationships · discovery · presales', body: 'Develop qualified opportunities and clarify why the work matters.', items: [{ label: 'Referrals and customer relationships' }, { label: 'Domain context and commercial judgment' }, { label: 'Contribution documented per engagement' }], color: 'purple' },
        { id: 'intent-layer', x: 495, y: 260, w: 330, h: 240, title: 'Intent operating layer', eyebrow: 'Coordination and accountability', body: 'Assemble the engagement and make responsibilities inspectable.', items: [{ label: 'Qualification · agreements · architecture' }, { label: 'Shared tooling · review · quality assurance' }, { label: 'Customer responsibility · operations' }], color: 'orange', status: 'proposed' },
        { id: 'specialists', x: 935, y: 260, w: 330, h: 220, title: 'Execution', eyebrow: 'Engineers · specialists · firms', body: 'Bring capable people, relevant assets and an agreed delivery commitment.', items: [{ label: 'Implementation and technical judgment' }, { label: 'Independent individuals or companies' }, { label: 'Scope and capacity confirmed for the work' }], color: 'blue' },
        { id: 'origination-arrangement', x: 55, y: 602, w: 330, h: 140, title: 'Referral or presales', eyebrow: 'Opportunity contribution', body: 'Define the opportunity, attribution and responsibility.', items: [], color: 'purple', status: 'proposed' },
        { id: 'delivery-arrangement', x: 495, y: 602, w: 330, h: 140, title: 'Subcontract or joint delivery', eyebrow: 'Delivery contribution', body: 'Define parties, scope, acceptance and risk allocation.', items: [], color: 'blue', status: 'proposed' },
        { id: 'managed-arrangement', x: 935, y: 602, w: 330, h: 140, title: 'Managed work and support', eyebrow: 'Ongoing responsibility', body: 'Define ownership, service boundaries and the exit path.', items: [], color: 'green', status: 'proposed' },
      ],
      edges: [
        { from: 'customer', to: 'intent-layer', path: 'M615 204 V260', kind: 'flow', label: 'scope', labelX: 572, labelY: 236 },
        { from: 'intent-layer', to: 'customer', path: 'M710 260 V204', kind: 'feedback', label: 'evidence', labelX: 754, labelY: 236 },
        { from: 'originators', to: 'intent-layer', path: 'M385 335 H495', kind: 'flow', label: 'context', labelX: 440, labelY: 320 },
        { from: 'intent-layer', to: 'originators', path: 'M495 420 H385', kind: 'feedback', label: 'alignment', labelX: 440, labelY: 447 },
        { from: 'intent-layer', to: 'specialists', path: 'M825 335 H935', kind: 'flow', label: 'scope', labelX: 880, labelY: 320 },
        { from: 'specialists', to: 'intent-layer', path: 'M935 420 H825', kind: 'feedback', label: 'delivery', labelX: 880, labelY: 447 },
      ],
      notes: [
        { x: 45, y: 539, w: 1230, text: 'Participants may hold multiple roles. Joining the network does not assign unrelated customers, business or intellectual property to Intent.' },
      ],
    },
    panels: [
      { title: 'What Intent has to contribute', body: 'The coordinating layer has to provide something the engagement needs. Its role can combine opportunity development, architecture, reusable engineering, contractual accountability, quality control and operations.', items: ['Identify the contribution before setting the arrangement.', 'Name the customer-facing accountable party for that engagement.', 'Avoid a universal claim that Intent owns every independent relationship.'] },
      { title: 'International by design, explicit in execution', body: 'Independent people and firms can operate across countries, but a shared vision does not settle the legal form of their relationship. Geography, entity type and the actual work shape the appropriate arrangement.', items: ['Confirm jurisdiction, entity status and authorized signers.', 'Resolve IP, confidentiality, security and liability for the scope.', 'Use legal review to support the chosen commercial model.'] },
      { title: 'What still needs validation', body: 'The network is a business model being developed. Repeatable customer acquisition, committed capacity, workable incentives and sustainable delivery economics must be established through actual engagements.', items: ['Choose a narrow initial offer and customer segment.', 'Prove one complete engagement and its operating responsibility.', 'Measure margin after delivery, coordination, support and risk costs.', 'Expand only from evidence about demand, delivery and contribution.'] },
    ],
    tables: [{
      title: 'Commercial hypotheses to test',
      description: 'These are possible arrangements, not published offers or agreed terms. A signed engagement must identify the payer, deliverer, responsibility, costs and acceptance conditions.',
      columns: ['Arrangement', 'Possible payer', 'Who contributes', 'What Intent must add', 'Evidence before expansion'],
      rows: [
        ['Referral / origination', 'Contracting party', 'Relationship holder', 'Qualification and an attributable opportunity', 'Attribution, conversion and acquisition cost'],
        ['Presales / discovery', 'Customer or delivery lead', 'Domain and solution specialists', 'A usable scope and an accountable handoff', 'Discovery cost, acceptance and delivery fit'],
        ['Subcontract / joint delivery', 'Customer or lead contractor', 'Independent engineers or firms', 'Architecture, coordination, QA or contract accountability', 'Capacity, acceptance, cost and risk allocation'],
        ['Managed deployment', 'Customer', 'Delivery team and operating owner', 'An integrated outcome with a response and exit path', 'Operational evidence and sustainable support cost'],
        ['Paid support', 'Product or system user', 'Named support provider', 'A defined maintenance or response responsibility', 'Demand, service boundaries and delivery cost'],
        ['Technical education', 'Learner or sponsoring organization', 'Practitioners and instructors', 'Independent learning value and practical feedback', 'Learning outcomes, delivery cost and permitted offer'],
        ['Software subscription', 'Product customer', 'Product engineering and operations', 'A maintained solution to a repeated problem', 'Retention, operating cost and willingness to pay'],
      ],
    }],
    sources: [
      { label: 'Owner-provided international network and commercial operating brief' },
      { label: 'Intent Solutions: outcome, evidence and operating responsibility', href: 'https://intentsolutions.io/' },
      { label: 'Intent Learn: the practitioner entry point', href: 'https://learn.intentsolutions.io/' },
    ],
    mermaid: `flowchart TB
      C[Customers: problems and outcomes] -->|scope| I[Intent coordinating layer]
      I -->|evidence and accountability| C
      O[Originators: relationships and discovery] -->|qualified context| I
      I -->|alignment| O
      I -->|agreed scope| D[Independent specialists and firms]
      D -->|delivery and evidence| I
      subgraph Models[Proposed engagement-specific arrangements]
        R[Referral or presales]
        J[Subcontract or joint delivery]
        M[Managed deployment or support]
      end`,
  },
  {
    id: 'principles', number: '08', title: 'A consistent mission. Evolving methods.',
    kicker: 'Governing principles and the next decisions',
    lead: 'The estate needs enough consistency for people to work together and enough freedom to adapt as models, markets and operating conditions change.',
    takeaway: 'Keep the outcome, evidence and accountability clear. Adapt the technology, delivery structure and commercial experiments as the work teaches us.',
    status: 'mixed',
    diagram: {
      width: 1320, height: 760,
      description: 'Six operating principles connect to one central mission. Model independence, evidence and reusable intellectual property sit on the left. Opportunity without entitlement, distributed accountability and adaptation sit on the right. The central standard survives changes in models, tools and organization.',
      regions: [
        { x: 20, y: 16, w: 375, h: 710, label: 'ENGINEERING AND KNOWLEDGE', color: 'blue' },
        { x: 925, y: 16, w: 375, h: 710, label: 'PEOPLE AND ADAPTATION', color: 'purple' },
      ],
      nodes: [
        { id: 'model-independent', x: 42, y: 60, w: 330, h: 173, title: 'Model agnostic by design', eyebrow: '01 / Implements can change', body: 'Choose models and vendors for the work. One vendor relationship does not define the company.', items: [{ label: 'Multiple tools · one evidence standard' }], color: 'blue' },
        { id: 'prove-operate', x: 42, y: 290, w: 330, h: 173, title: 'Build, test, prove, operate', eyebrow: '02 / Delivery continues after release', body: 'Pair implementation with evaluations, human controls and operating responsibility.', items: [{ label: 'Acceptance · observability · recovery' }], color: 'green' },
        { id: 'compound-ip', x: 42, y: 520, w: 330, h: 173, title: 'Compound useful IP', eyebrow: '03 / Preserve what can be reused', body: 'Turn relevant learning into reusable assets while respecting customer and contributor rights.', items: [{ label: 'Owned assets · licensed reuse · open source' }], color: 'cyan' },
        { id: 'mission', x: 495, y: 275, w: 330, h: 235, title: 'Reliable work in real businesses', eyebrow: 'The mission holds', body: 'Close the gap between AI capability and work an organization can trust, own and improve.', items: [{ label: 'Outcome and accountability stay explicit' }, { label: 'Methods evolve with evidence' }], color: 'orange' },
        { id: 'opportunity', x: 947, y: 60, w: 330, h: 173, title: 'Opportunity is earned', eyebrow: '04 / Participation has distinct forms', body: 'Community, education, qualification and commercial authority are separate.', items: [{ label: 'No automatic entitlement to paid work' }], color: 'purple' },
        { id: 'accountability', x: 947, y: 290, w: 330, h: 173, title: 'Distribute capability', eyebrow: '05 / Keep accountability legible', body: 'Work can span people, firms and countries while each engagement has clear responsibility.', items: [{ label: 'Who decides · who delivers · who responds' }], color: 'amber' },
        { id: 'adapt', x: 947, y: 520, w: 330, h: 173, title: 'Stay fluid with direction', eyebrow: '06 / Learn before scaling', body: 'Change tools, delivery methods and experiments when evidence supports the change.', items: [{ label: 'Stable mission · revisable implementation' }], color: 'purple' },
      ],
      edges: [
        { from: 'model-independent', to: 'mission', path: 'M372 147 H435 V310 H495', kind: 'governance', color: 'blue' },
        { from: 'prove-operate', to: 'mission', path: 'M372 375 H495', kind: 'governance', color: 'green' },
        { from: 'compound-ip', to: 'mission', path: 'M372 607 H435 V472 H495', kind: 'governance', color: 'cyan' },
        { from: 'opportunity', to: 'mission', path: 'M947 147 H887 V310 H825', kind: 'governance', color: 'purple' },
        { from: 'accountability', to: 'mission', path: 'M947 375 H825', kind: 'governance', color: 'amber' },
        { from: 'adapt', to: 'mission', path: 'M947 607 H887 V472 H825', kind: 'governance', color: 'purple' },
      ],
      notes: [{ x: 450, y: 565, w: 420, text: 'These principles explain the operating vision. Specific policies and contractual commitments require their own decisions and evidence.' }],
    },
    panels: [
      { title: 'Established capabilities', body: 'Public software, a skills marketplace, technical publishing, learning surfaces and working internal systems give the estate material to build on. Each artifact establishes a bounded capability.', items: ['Inspect the linked work and its current status.', 'Distinguish adoption and technical proof from customer conversion.', 'Keep public examples and their limitations understandable.'] },
      { title: 'Under development', body: 'The next layer connects those capabilities to clearer commercial and delivery arrangements. Qualification, capacity, agreements and operating responsibility must fit together.', items: ['Role-specific qualification and current capacity.', 'Commercial arrangements and legal foundations.', 'A repeatable method for scoped, accountable engagements.'] },
      { title: 'Decisions that move the vision forward', body: 'The first proof is a complete, useful engagement with a clear customer and an accountable delivery arrangement. Its lessons should improve the next one.', items: ['Choose the first offer, customer segment and acceptance test.', 'Name who can commit scope and who owns delivery and operations.', 'Define partner contribution, risks, margin measurement and exit.', 'Decide what learning is free, what may become paid, and why.', 'Record a decision owner and date for each unresolved choice.'] },
    ],
    sources: [
      { label: 'Owner-provided six governing principles and operating vision' },
      { label: 'Intent Solutions: applied AI engineering', href: 'https://intentsolutions.io/' },
      { label: 'Intent Labs: inspectable experiments', href: 'https://labs.intentsolutions.io/' },
      { label: 'Tons of Skills: reusable developer tooling', href: 'https://tonsofskills.com/' },
    ],
    mermaid: `flowchart LR
      A[Model agnostic] -.-> M[Reliable work in real businesses]
      B[Build test prove operate] -.-> M
      C[Compound useful IP] -.-> M
      D[Opportunity without entitlement] -.-> M
      E[Distributed capability and clear accountability] -.-> M
      F[Stable mission and evolving methods] -.-> M`,
  },
];
