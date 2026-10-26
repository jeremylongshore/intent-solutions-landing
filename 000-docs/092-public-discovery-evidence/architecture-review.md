# Information architecture and reachability audit

Read-only team review. Scope: company home, Projects, Estate, Site map, financial atlas, Labs, Evals. Source authority read: landing AGENTS.md, CLAUDE.md, approved brand-family contract 084, route contract src/data/site-map.mjs. Used webapp-testing skill for desktop/mobile browser checks. No repository changes, form submits, evaluation/provider actions or messages sent.

## Verdict

The concern is legitimate at the cross-estate layer. Existing site-level organization is often sensible: Labs has a coherent plain-language task → method → example → evidence path, and Evals clearly says it holds result definitions. The missing piece is one visitor-facing index of individual experiences across hosts. The network strip indexes hosts, Projects repeats a subset of those hosts, Site map repeats another subset plus company pages, and Estate explains the operating model. None is the complete experience index the user is describing.

This is an information architecture and content-governance change, not a visual redesign. Do not claim the sites are all disorganized or that links are generally broken: all 59 discovered Labs URLs returned HTTP 200 in this bounded pass.

## Concrete findings

1. **High: Projects behaves as a directory of directories.** https://intentsolutions.io/projects/ has six named body cards: Demos, Labs, Evals, Tons of Skills, Omarchy, Start AI Tools. It does not expose named experiences or Learn as a body card. Learn exists in the shared network/footer, so it is not absent from the page altogether. This makes Projects an extra classification decision for a first-time visitor.
2. **High: No single existing page covers the public family at experience depth.** https://intentsolutions.io/site-map/ lists company pages and eight host destinations. https://intentsolutions.io/estate/ explains company functions and points the product portfolio to https://jeremylongshore.com/. Both have legitimate jobs, but neither resolves “find the typing game / find an Outreach workflow / learn the practice” directly.
3. **Medium: Mobile network strip hides destinations horizontally.** Read-only Chromium inspection at 390px: Omarchy starts at x406 and Tons of Skills at x484 on company, Projects, Labs and Evals. Neither is in the initial viewport. Learn is at x344–385. No document-wide horizontal overflow was found; this is a discoverability issue with the intentional scrolling strip, not broken page layout. A permanently visible Explore entry/menu should expose every public destination without relying on horizontal scrolling.
4. **Medium: Company proof priorities can misroute an explorer.** https://intentsolutions.io/ has clear business positioning, Request an outcome, and Inspect the work. Its proof route leads into evaluations and technical evidence. Intent Outreach now has a direct feature and the practitioner link leads to Learn. Those are real improvements, but there is no explicit all-experiences entrance explaining the breadth.
5. **Medium: Canonical inventory is split by purpose.** src/data/site-map.mjs owns company route purposes and an eight-property list; estate-bar/links.json owns shared navigation; other sites own deeper catalogs. The verified site-map audit guards page classification, not estate-wide experience coverage. Parent registry plus per-site manifests would close this gap without manually putting every nested page in a header.
6. **Medium: Labs detailed catalogs are discoverable but technical.** https://labs.intentsolutions.io/results/ lists eight sources by acronyms (iec, iel, iah, iaj, iar, ccp, jrig, qmd). https://labs.intentsolutions.io/evals/ provides “Every published test”, but is linked from Results rather than top navigation and is omitted from the nine-route Labs sitemap. Labels/aliases can expose these as AI skill evaluations, platform checks and team-memory checks while retaining canonical technical IDs.
7. **Positive: Labs already supplies appropriate plain-language progression.** Home → Examples → annotated study is understandable; Start here distinguishes business discussion from local tool setup. It explicitly says tests run in the visitor's own environment and the site is not a file-upload service. Preserve these limits and do not recast the site as a self-service evaluation SaaS.
8. **Positive/clarification: Evals is reference infrastructure, not a second test runner.** https://evals.intentsolutions.io/ explains the relationship to Labs. Its ten definitions include three NORMATIVE, five DRAFT, two RESERVED states. Keep these technical states separate from directory availability labels. Directory copy should say “Understand test results” or “Evaluation definitions”, not imply users run evaluations here.

## Route families actually found

- Company sitemap: 23 canonical URLs: home; about/contact/support; Projects/Site map; Estate; Financial atlas index plus 11 chapter pages; Field notes index; three policies. Sitemap intentionally excludes legacy noindex handoffs and cross-canonical field notes. The eight standalone estate-blueprint HTML diagrams are linked from Estate but absent from that XML route set; they are supporting atlas views, not eight separate products.
- Labs sitemap: nine main routes: /, /start/, /how-it-works/, /examples/, /results/, /eval-sets/, /skills/, /methodology/, /status/.
- Additional Labs linked routes: /evals/; eight /results/{source}/ indices; 30 linked /results/{source}/sha256-.../ evidence pages; three /skills/{skill}/ pages; four study/framework pages (/eval-sets/iep-self-eval-dogfood/, /eval-sets/j-rig-bench/, its /phase-a0/, /eval-sets/j-rig-binary-eval-7-layer/); four downloadable JSON/signature artifacts. Total 59 unique discovered Labs URLs, including artifacts; all returned 200. This is a bounded discovered-link inventory, not a claim of exhaustive server enumeration.
- Evals sitemap: eleven URLs, home plus /gate-result/v1, /retraction/v1, /skill-refiner-pass/v1, /dashboard-render/v1, /human-review/v1, /validation-result/v1, /skill-snapshot/v1, /runtime-receipt/v1, /regression-pack/v1, /eval-verdict/v1. All fetched successfully.

## Three visitor journeys

**Business buyer:** Current homepage is clear about customer work. Preserve Request an outcome. Add obvious Explore tools & examples route next to the business pathway; it should let a real-estate buyer reach Intent Outreach directly, and a buyer checking an AI workflow reach Labs Examples or Start. Do not make either person study the operating atlas first.

**Practitioner:** Learn is one click from homepage and has its own practitioner link, but Projects omits it as a substantive option. Include Learn with a clear description and deep entry points verified by the learning auditor. Labs → methodology → repository installation is appropriate for engineers. Show access requirements before someone expects a free immediate interactive tool.

**Nontechnical explorer:** The current host labels require inside knowledge. A parent looking for a keyboard game will not infer Omarchy. Central experience entries should support ordinary terms and synonyms (“typing”, “keyboard game”, “move my computer”, “real estate”, “learn AI”) and direct routes to the named destination, independently of host/project ownership.

## Minimal implementation recommendation

Use the existing /projects/ URL as the canonical Explore directory; change the visible navigation label and title to Explore. No competing /explore/ hub needed. Site map stays utility, Estate stays operating explanation, Demos remains a focused subset. The shared strip should gain one clear Explore all entry available on mobile and the company homepage should have a concise Explore everything invitation.

Directory categories should describe visitor tasks, e.g. Try tools & demos; Play & learn; Build with our tools; Inspect research & results. Offer All plus task filters/search. Content items can have multiple tags; do not force a typing game into a desktop-tools-only silo because it happens to live on OMA. Learn deserves both hub and verified curriculum/access entries. Parent properties retain their brands and local nav.

One governed public-experience registry: stable ID, display name, canonical URL, host/parent, one-sentence outcome, intended visitor, type, availability/access, tags/search aliases, primary action, owner/source repo, last verification. Separate item availability (available/demo/preview/in development/retired) from result outcome (pass/fail/error) and reference maturity (normative/draft/reserved). Only public approved experiences enter the registry; private admin/internal hosts stay outside public discovery.

Deep paths need accounting, not identical top-level cards: list meaningful products, games, course/guide families and studies. Result records, blog articles, schema versions and lesson pages remain indexed by their local collection; the central directory points to that collection and names examples. Every child route should have a declared parent and return path. This prevents a 500-card junk drawer while satisfying coverage.

## Acceptance criteria

1. Every approved public experience has one registry entry, or is explicitly classified as a child of an indexed collection. A coverage report flags unclassified public routes and owner/review date.
2. A new visitor can reach each promoted named experience from company home within two link activations (home → Explore → experience). Deep evidence/lesson/definition pages are reachable through their parent collection; no arbitrary two-click promise for every data record.
3. Explore contains working direct entries for the Beacon Wakes, Blue Gold Blue, Intent Outreach, Learn, Labs studies/results, Evals definitions and other audited public offerings, using canonical names and URLs verified by each specialist.
4. A visitor can answer what the entry does, whether it is for them, what they can do next, and what access/status applies from the card/detail page without decoding the host name.
5. Mobile 390px and desktop 1440px: Explore is visible in the primary navigation/menu; every entry is keyboard reachable; no dependence on discovering a horizontal strip. Existing company conversion remains available.
6. Every public property supplies a consistent return link to Explore; collection/detail pages identify their local parent. Avoid link loops that merely bounce between general hubs.
7. Automated checks verify canonical destination HTTP status, redirects, duplicate entries, missing labels and stale verification dates. Sitemap/source route coverage is checked separately from the editorial public catalog, with explicit exclusions.
8. Test tasks with people unfamiliar with the estate: find a typing game, learn the practice, find real-estate workflows, inspect an AI test and install a tool. Measure success and wrong turns rather than claim improved conversion from link existence.

## Evidence files

first-pass.json: full initial HTML/text/link snapshots and sitemap/robots probes.
nested-pages.json: Labs/Evals main and definition pages, financial atlas and J-Rig results.
studies.json: deeper Labs study/framework and all-evals catalog snapshots.
company-sitemap.xml: fetched company canonical XML.
labs-discovered-routes.json + labs-link-status.json: discovered URLs and 59 successful response checks.
browser-nav.json + eight PNGs: 390/1440px company/Projects/Labs/Evals nav geometry and screenshots.

## Source reconciliation and final bounded denominator

Company source-derived coverage is **184/184 expected routes fetched**: 141 generated Astro HTML routes (30 non-dynamic pages, 11 financial chapters, 100 field notes), 42 public standalone HTML artifacts (8 operating views, 1 print view, 33 financial diagrams), and 1 RSS feed. This is source-derived coverage of these page/artifact families; it excludes non-HTML static assets, API routes and server-only routes not represented in this source.

The XML sitemap has 23 self-canonical current routes. Its smaller count is not evidence of 161 lost products:
- 100 field-note crossposts have live canonical URLs matching their source off-domain canonical, 100/100. All 100 have incoming links from audited company pages. Their sitemap exclusion is intentional, not a navigation orphan.
- 16 legacy handoffs and two utilities are deliberately outside the sitemap. Seventeen return noindex HTML (the intentional /404/ responds 404); /a2a/ redirects to the homepage and its final indexed HTML is the homepage, not an indexable retired service.
- The eight operating-atlas views all have self-canonicals and incoming links, including /estate/. They are omitted from Astro sitemap discovery because they are standalone public HTML. Consider explicit sitemap inclusion for the eight intended indexable canonical views; do not mislabel them as undiscoverable.
- The atlas print view is noindex and linked from all eight views.
- All 33 financial diagrams are noindex,follow and have at least one incoming link from an audited route. Their parent financial chapters are indexed. This is appropriate supporting-artifact indexing, not evidence of missing public experiences.
- The RSS feed is intentionally not an HTML sitemap entry.

Across this specialist's company, Labs and Evals review, **254 unique content/artifact URLs were HTTP-verified**: 184 company + 59 Labs + 11 Evals. All resolved successfully except the deliberate company 404 page, which correctly returned 404. Labs total includes four JSON/signature artifacts and does not imply 59 products. Robots/sitemap probe URLs and duplicate reads are not counted in 254.

`company-source-route-coverage.json` contains URL, source path, classification, status/final URL, title, canonical, robots, sitemap membership, outgoing links and incoming audited routes for all 184. `/a2a/` additionally records its initial redirect status/location.
