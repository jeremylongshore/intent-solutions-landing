# Financial teaching atlas — V1 design and evidence

The financial companion extends the live operating atlas at `/estate/`. It explains a proposed federated engineering and commercial network: independent firms and contributors, project-specific teams, an accountable operating layer, and permitted common assets. It is educational design, not an adopted constitution, compensation policy, offer, provider allocation or forecast.

The owner explicitly requested public website teaching examples with realistic assumptions and clear labels. The owner also clarified that the institutional ambition is DAO-like coordination; no blockchain, token, shared company ownership or voting model is assumed. Actual private arrangements and source notebooks remain excluded. The separate presenter task was completed with a privately delivered short introduction, YouTube walkthrough and internal webinar script; see the dated delivery status below.

## Published release and session recovery — October 12, 2026

[PR #70](https://github.com/jeremylongshore/intent-solutions-landing/pull/70) merged as
`64d4e01d0fdad73d7892b64e89d287752fd76455` and shipped in v4.7.0.
The [canonical VPS deployment](https://github.com/jeremylongshore/intent-solutions-landing/actions/runs/38210923516)
succeeded. The release verification covered twelve financial routes and all 33 standalone
HTML downloads against the generated hash manifest. This is a dated release receipt;
later documentation commits do not create new commercial evidence.

| Entry point | Use |
| --- | --- |
| [Estate](https://intentsolutions.io/estate/) | Company overview and connected capabilities |
| [Operating blueprint](https://intentsolutions.io/estate-blueprint.html) | Eight views from company architecture to delivery |
| [Financial atlas](https://intentsolutions.io/estate/economics/) | Eleven chapters and twelve baseline/downside cases |
| [Network presentation](https://intentsolutions.io/estate/economics/network-economy/?present=1) | Start a live financial walkthrough |

The short, medium and webinar scripts, printable PDFs and editable bundle were emailed to
the owner, with delivery confirmed. A separate seven-page after-action report was also
saved and delivered. These owner-private records are not stored in this public repository.
Their delivery does not mean a video was recorded, uploaded or distributed to the team.

The canonical VPS site and the secondary Hugging Face mirror are separate delivery targets.
The mirror PDF/LFS defect remains tracked as `bd_000-projects-htnu`; landing-local Beads
repair is `bd_000-projects-dxtq.9`. Neither changes the verified VPS release status.

## Source ownership

Paths below are relative to `astro-site/`; edit sources and regenerate, rather than changing
generated public HTML or its manifest directly.

| Source | Owns |
| --- | --- |
| `src/data/operating-atlas.mjs` | Operating blueprint views |
| `src/data/economics-teaching.mjs` | Financial chapters and teaching copy |
| `src/data/network-economy.mjs` | Proposed institutional model |
| `src/data/estate-economics-cases.mjs` | Executable fictional case ledgers |
| `src/data/economics-research.mjs` | Public research citations and boundaries |
| `src/diagrams/economics-charts.mjs` | Shared figure renderers |
| `scripts/build-financial-diagrams.mjs` | Standalone HTML and manifest generation |
| `src/pages/estate/economics/[chapter].astro` | Chapter routes and presentation controls |

The earlier source-linked engineering diagram and the later operating/financial atlases are
distinct artifacts. Do not attribute every historical diagram to the same skill or overwrite
older research records when updating the current teaching material.

## Experience and information architecture

Eleven chapters move from the institutional model to customer value, opportunity origins, funded pursuit, contracting boundaries, role earnings, one project fee, cash timing, recurring work, other plays and company sustainability. Each has a shareable route, previous/next links, presentation view, accessible inline figures and research boundaries. Baseline and downside examples are rendered in HTML; JavaScript progressively adds selection controls. Core explanations remain available without it.

The macro chapter separates contribution, authority, earning, rights, risk and exit. The opportunity chapter includes pauses, requalification, no-build, lost awards, disputes, renewal and customer exit. A relationship is not a one-way funnel or a permanent claim on a customer. An independent may remain prime and buy only a defined capability.

## Diagram authority

Use [Cathryn Lavery’s Diagram Design](https://github.com/cathrynlavery/diagram-design), version 2.6, pinned to `7a2e22170ee838e859d8142ba825d83f8b6375e6`. The 44 options are visual grammars, not themes. The selected grammars are:

| Question | Grammar | Reason |
| --- | --- | --- |
| How autonomous participants, customers and common assets interact | Architecture | Different actors and bounded relationships |
| How relationships become authorized work | Architecture | Several entry routes converge; no assumed conversion rate |
| Where permission and earning terms are defined | Layer stack | Narrowing agreement scope |
| Where a project fee is allocated | Sankey | Conserved quantity splits into obligations and retained contribution |
| What remains after cost | Waterfall | Signed steps reconcile to a final amount, including losses |
| What customer benefit and pursuit assumptions imply | Bar | Comparable values use the same explicit scale |
| When funding is needed | Line, rendered as an event staircase | Cash changes at dated events, not through invented interpolation |

All figures use the skill’s 1280×720 presentation preset, the incumbent Intent navy/orange skin and Syne/Inter font roles. Ordinary browser pages use the website’s font loading; self-contained HTML copies disclose offline fallback. Phone figures scroll inside their own region at the readable preset width. Print releases that width to fit the sheet. No artificial glow, gradients, decorative 3D or area inflation supplies meaning.

The diagram renderer is `astro-site/src/diagrams/economics-charts.mjs`. `build-financial-diagrams.mjs` creates the standalone HTML copies and a SHA-256 manifest from the same render functions. Native site chrome is separate from the diagram’s single-file output.

## Numerical and research boundaries

Twelve worked cases each have a baseline and downside. Every total is derived from quantity/rate ledgers. Case prices, hours, volumes and participation methods are fictional planning assumptions, not market medians. Current primary sources establish mechanisms and restrictions only. Research lessons identify their evidence type and distinguish findings from proposed applications.

The consistent project has $80,000 fees and $59,760 listed costs: $20,240 contribution, then a proposed $4,000 cash designation, leaving $16,240 before central overhead and tax. Cash timing uses 40%/30%/30% customer receipts. Supplier payments have separate dates. Same-day costs are processed before receipts; this deliberately exposes the intraday funding gap. A reserve is not another expense, gross supplier invoices are not personal income, and the prime’s full customer contract is outside a subcontract-only ledger.

Customer value distinguishes released capacity from realized cash. Software includes initial build and acquisition costs. Zero demand, owner labor, finite delivery capacity, unpriced support and lost collection remain visible. Shared rights and reinvestment require explicit authority; contribution does not become automatic ownership or a universal revenue share.

Primary institutional analogues are Enspiral, Open Collective and CoTech. The pages describe documented mechanisms and limits, not proof of Intent’s future results. Historical and AI studies supply reasons to measure adoption, review work, demand, trust and distribution; their percentages are never imported as scenario defaults.

## Verification contract

Run `npm run test:economics`, `npm run build`, the three existing site audits and `node scripts/test-economics-browser.mjs <preview-url>`. The financial regression is included in the pre-deploy workflow. Preserve whole-site form regression; tests must not send actual submissions.

The upstream Diagram Design self-check and geometry tools are used unmodified. Their generic numerical validators have limits: the waterfall checker does not accept a negative ending anchor and the Sankey checker assumes a smaller plotting area and a different data declaration. Do not report those exceptions as upstream passes. Exact-decimal reconciliation and rendered geometry checks independently cover the signed and 16:9 cases. The deployment receipt records final results and revision; no automated check establishes “best in class.”

## Design integration review

Reviewed the rendered preview on 2026-10-12 using Chromium 1181, comparing `/estate/` with the financial index, network-economy chapter and project chapter against [the incumbent brand contract](084-AT-DSGN-brand-family-contract.md). This is an extension receipt, not a new design system; the brand files remain unchanged.

- **Palette and type:** the pages share the estate’s navy-charcoal background (`#0f1117`), Syne display headings, Inter body text and warm-orange actions. The financial surface uses its scoped, slightly lighter orange (`#ffad70`, versus the estate’s `#ffab70` emphasis). Computed desktop H1 sizes were 76px and 78px respectively, both weight 600. The financial H1 reduced to 40px at 390px viewport width.
- **Layout and interaction:** one H1 was present on each sampled page. The project page had no whole-page horizontal overflow at 390px; its 1280px figure remained inside a 354px scroll region. Keyboard navigation reached the print control with a visible 3px orange outline and 4px offset. These are observed integration checks, not a replacement for the full accessibility and diagram reviews.
- **Navigation and structure:** the eleven-chapter directory starts with the proposed institution, then moves through customer value and the commercial lifecycle. The chapter links, atlas return links and existing `/contact/?door=outcome` action returned HTTP 200 locally. The shared navigation retains the canonical Labs, Evals, Demos, Learn, Omarchy and Tons of Skills destinations and accessible current-location text.
- **Disclosure:** sampled financial pages show the fictional-example notice near the title. The institutional chapter calls the model proposed; sources separate documented mechanisms from Intent’s prospective arrangements. No public offer or adopted constitution is inferred by this review.

Pre-existing scoped estate colors and page-level Syne overrides differ from the broader global stylesheet, whose default headings use Inter. That layering is recorded without consolidation or a new token authority. Existing diagram metadata conventions were not promoted into global brand rules. The mechanical “Inter is overused” warning is consistent with the approved incumbent body font, not an identity defect to repair.

## Independent release review

A separate reviewer inspected all twelve routes at desktop and phone widths, all twelve scenario definitions in baseline/downside views, five customer-calculator combinations and presentation navigation. It found a truncated vendor/administration label, a portrait fullscreen scaling defect and ambiguous selected-adoption wording. All three were corrected and confirmed in the rebuilt browser preview; the final bounded verdict was **ship**. The reviewer also checked the supplier-rate sensitivity arithmetic and the live BLS wage context.

The portrait fullscreen recheck measured a 1280×720 diagram in a 350px local viewport with working horizontal panning; ordinary diagram text remained readable instead of shrinking to fit. The main project label now reads “Vendors / admin,” and payback explicitly uses the selected adoption level. Minor rate-table wording was clarified without changing its inputs.

The final build produced 141 Astro pages. The numerical regression passed 146 checks; the existing audits passed 23 sitemap URLs, 33 individually mapped route sources, 1,073 internal links and anchors, and 183 pages carrying the canonical estate bar. These are measured implementation checks, not evidence that the proposed network is commercially proven or best in class.
