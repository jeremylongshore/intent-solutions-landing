# Public estate discovery and reachability audit

Date: 2026-10-16. Audit owner: Intent Solutions web team (three independent agent reviewers and lead synthesis). Tracking: `bd_000-projects-1u2o`. Scope: public navigation, page coverage and visitor understanding; no visual redesign or production changes.

## Decision in one minute

The estate is partly organized within individual sites, but it does not yet have a complete public discovery layer. The shared header identifies websites. Visitors need to find individual experiences: a keyboard game, a migration project, a real-estate workflow, practitioner education, a desktop tool or a useful test example. A visitor should not need to know which subdomain owns it.

Most inspected URLs work. The principal defects are missing directory entries, buried experiences, inconsistent handoffs and incomplete public copy. Learn is reachable from the company homepage, but its application changes identity and offer. OMA contains meaningful products beyond plugins. Demos contains useful child pages beyond its 19-card catalog. Labs has a coherent introductory journey worth preserving.

Recommend making the existing `/projects/` page the canonical **Explore** directory, retaining its URL. Keep a small header and use the directory to explain named offerings and collections. Preserve each site's identity. The intended path is **company home → Explore → named experience**, with supporting detail accessible under that experience. The route inventory must account for every approved public route without turning every article, diagram, test record or login page into a product card.

This report delivers the audit and implementation specification. The repair issues remain open; this document does not assert that production navigation has been fixed.

## Evidence and coverage

Methods: fresh public HTTP GETs, robots/sitemap inspection, source route comparison, deployed demo HTML and read-only ingress hostname inspection, and browser journeys using the **webapp-testing** skill. Reviewer scopes were independent: Learn; OMA/Demos; company/Labs/Evals. The lead checked additional branded/public roots, aliases and sitemaps. Global skills supplied methods, not project brand or capability facts.

- **390 distinct requested URLs** recorded in [verified-routes.csv](090-public-discovery-evidence/verified-routes.csv), across 19 requested hostnames including aliases and one restricted portal boundary. There were 381 final 200 responses and nine 404s. The 404s are the intentional company not-found page and eight old Learn source routes no longer served, not nine broken advertised links. Redirect targets and classifications are recorded separately.
- **40 browser observations** from the three specialists: 22 OMA/Demos/selected company observations, ten Learn/company observations, eight company/Labs/Evals observations. Widths: 390 and 1440 pixels. Learn's company → practice → tracks → application chain was actually clicked at both widths. Other observations check navigation and rendered content; they are not end-to-end proof of every product action.
- **4,541 additional sitemap entries** collected across marketplace, publishing, founder, product and realty sites in [additional-sitemap-routes.csv](090-public-discovery-evidence/additional-sitemap-routes.csv). These are discovered URLs, mostly not individually fetched or browser-tested. They are not 4,541 products. Some overlap verified roots; do not add the two counts as unique estate coverage.
- Core coverage: company 184 source-derived routes; Labs 59 discovered routes/artifacts; Evals 11; OMA 26; Demos 73 requested routes; Learn 24 probes. The remaining 13 are portfolio roots/aliases/boundaries.
- Exact counts, sitemap source errors and limits: [coverage.json](090-public-discovery-evidence/coverage.json).

The company source reconciliation accounts for 141 Astro HTML routes (30 fixed pages, 11 financial chapters, 100 field notes), 42 standalone HTML files and RSS. The 23-entry company XML sitemap is intentionally smaller: crossposted articles, retired handoffs, utility pages and noindex diagrams are excluded. The eight linked, self-canonical operating diagrams are absent from XML; that is an indexing opportunity, not evidence they are orphaned.

This is a bounded public inventory, not an exhaustive DNS export, customer-content enumeration, authenticated audit, legal review, paid checkout test, form-delivery test or visitor usability study. Public ingress metadata helped identify omissions, but does not prove every domain on every host was collected. A successful response proves reachability, not a product's advertised capability. No account creation, form submission, gameplay progression, restaurant/provider query or purchase was performed. A Scorecard Echo browser `networkidle` wait timed out; its HTTP root was reachable and this is not classified as downtime.

## What the public family contains

| Family | Public purpose and direct entrance | Discovery treatment |
|---|---|---|
| Company | [Business inquiry, method and team](https://intentsolutions.io/) | Main entrance; preserve the inquiry action and add clear Explore access. |
| Learn | [Selective practitioner practice](https://learn.intentsolutions.io/), [three described tracks](https://learn.intentsolutions.io/course/explore), [application](https://learn.intentsolutions.io/request-access) | Name it Learn & practice; label application required. Anonymous track previews are not a public course catalog. |
| OMA tools | [16 plugin detail pages](https://oma.intentsolutions.io/#catalog), including Bazaar, Crew Chief and omaTrail | Allow individual tool discovery and preserve the specialized catalog. |
| The Beacon Wakes | [Game/parent overview](https://oma.intentsolutions.io/the-beacon-wakes/), [browser mission](https://oma.intentsolutions.io/the-beacon-wakes/play/) | Independent named game entry; searchable by typing or keyboard game. Do not require choosing Omarchy first. |
| BLUE GOLD BLUE | [Computer migration project](https://oma.intentsolutions.io/bluegoldblue/) | Independent project entry, clearly in development. Public interest page exists; migration readiness is not established. |
| Perception | [Signal-monitoring product page](https://oma.intentsolutions.io/perception/) | Independent entry explaining access; current local placement under Listening Post is too obscure. |
| Intent Outreach | [Real-estate workflow examples and brief capture](https://demos.intentsolutions.io/intentoutreach/) | Canonical display name Intent Outreach; public examples and bounded sandbox are separate capabilities. |
| Demos | [19 curated examples](https://demos.intentsolutions.io/#catalog), plus supporting architecture, design and explanation pages | Distinguish interactive demos, sample reports, architecture explanations and historical concepts. Keep child pages under the appropriate entry. |
| Labs | [AI testing practice](https://labs.intentsolutions.io/), [examples](https://labs.intentsolutions.io/examples/), [published results](https://labs.intentsolutions.io/results/) | Describe what can be inspected or requested; not a self-service upload/testing service. |
| Evals | [Ten versioned result definitions](https://evals.intentsolutions.io/) | Reference collection connected to Labs; not another test runner. Preserve normative/draft/reserved meanings. |
| Tons of Skills | [Skills and extensions](https://tonsofskills.com/) | Catalog entry plus task-based handoff; thousands of child URLs remain in the searchable local catalog. |
| Start AI Tools | [Articles and development record](https://startaitools.com/) | Learning/editorial collection; link relevant products from articles. Its many URL entries are not separate products. |
| Founder portfolio | [Jeremy Longshore's work](https://jeremylongshore.com/) | Founder context and additional proof; do not make it the compulsory intermediary to company products. |
| DiagnosticPro | [Equipment diagnostic second-opinion product](https://diagnosticpro.io/) | Direct product entry; keep architecture/demo evidence beneath it. This audit did not purchase or validate a report. |
| Scorecard Echo | [Baseball game desk](https://scorecardecho.com/) | Direct product entry; full data/action behavior not qualified by this audit. |
| Hustle | [Youth soccer performance product](https://hustlestats.io/) | Direct product entry using current public name; account-required functions remain separate. |
| No, You Pick | [Restaurant chooser](https://noupick.intentsolutions.io/) | Additional public product found through ingress inspection. No named entry found on the audited company discovery hubs/demo catalog. Location/provider behavior not exercised. |
| Realty proof | [ComeHomeAlabama](https://comehomealabama.com/) and its [journal](https://comehomealabama.com/journal/) | Distinct real-estate brand and possible relevant work example; do not conflate with an Intent-owned software product or imply client endorsement. |

Working aliases include `demo` → `demos`, old Claude marketplace domains → Tons of Skills, `/batchdata/` → `/intentoutreach/`, and supported Scott Porter concept URLs → `/prospect-prep-automation/`. An alias is not a second product. The old `/intent-outreach/` path is retained as technical background. The Mandy subdomain leads to a restricted client portal; it is not the public realty site. Administrative, collaboration, signing, integration and other restricted services are outside the public offering directory.

## Findings that affect a visitor

### P1 — No complete experience directory

The [Projects](https://intentsolutions.io/projects/) body contains six host destinations and omits a substantive Learn entry. Learn remains available in the shared header/footer; it is not globally absent. The [Site map](https://intentsolutions.io/site-map/) repeats company pages and eight properties. [Estate](https://intentsolutions.io/estate/) explains the operating model and sends product exploration through the founder portfolio. These pages have legitimate roles, but none answers “what can I use, play, learn or inspect?” across the family.

### P1 — Named experiences are hidden behind a host's narrow label

OMA's framing says plugins. A parent looking for the typing game or someone considering computer migration has little reason to select that category. At 390px the game shortcut is hidden from OMA's desktop navigation; its play action appears about 2,049 pixels down. The prominent Browse plugins actions jump past that feature. Perception's link appears within Listening Post's card, about 10,056 pixels down at the inspected mobile viewport. These measurements describe layout, not observed visitor behavior.

### P1 — Learn's application does not match its introduction

The homepage-to-Learn-to-tracks-to-application path succeeds on mobile and desktop. However, the application changes identity to Solutions Catalyst and offers certification-oriented choices, while Learn describes broader practitioner work with optional credentials. It lacks a return link to Learn. The unlisted About page contains unresolved placeholders; a second public privacy page contains unfinished policy text. Both are absent from promoted navigation/sitemap. They need correction or deliberate retirement before being featured. Private courses must remain private.

### P2 — Some live experiences and child pages lack discovery or a return path

`/kobiton/` is in the Demos sitemap but absent from the catalog/bounded link graph. `/built-with-claude-code/` is public but absent from both. Many deep architecture pages have no clear company/demo-catalog return. Perception's rendered identity link returns to itself. Decide which unlisted pages are current evidence, historical archive or obsolete output. Two public duplicate/build artifacts identified by the reviewer are cleanup candidates, not new offerings to advertise.

### P2 — Mobile navigation relies on finding a horizontal strip

At 390px Omarchy and Tons of Skills begin outside the initial viewport on inspected core pages. Learn fits at the right edge. No document-wide horizontal overflow was observed; the issue is discoverability, not a broken responsive layout. Explore should be available through a visible label or conventional menu without a horizontal-search requirement.

### P2 — Coverage and naming are maintained in separate places

Company route contracts, shared navigation links, site-specific sitemaps and product catalogs do not enforce one public-experience inventory. Current Learn production belongs to NOW-LMS, while an older repository still describes retired HTML routes. Some deployed demo names differ from the local source checkout. Registry generation must use current source ownership and live canonical routes.

The broader sitemap check also found no usable XML at the default Scorecard Echo and No, You Pick sitemap paths, and zero entries in the fetched Hustle sitemap. This does not prove those sites have no other indexing mechanism; it is a bounded discovery-source gap recorded for the coverage work.

## Minimal repair specification

Use the existing Projects URL for Explore. Add a visible homepage invitation and shared Explore return path. Keep the main header short. Preserve the company inquiry, each product's own voice and existing working URLs. This scope does not implement the separate earlier visual-direction work in document 087.

Offer All, search and a small set of task-oriented filters: tools and demos; play and learn; desktop and migration; research and technical resources. Allow overlapping tags such as real estate, typing, AI practice and sports. These are navigation aids, not new business divisions.

Every named entry needs a stable ID, display name, canonical URL, plain-language purpose, intended visitor, kind, current availability/access, primary action, parent collection, search aliases, source owner and last-verified date. Differentiate:

- **Availability:** public experience, interactive demo, preview, in development, application required, member access, archive.
- **Evidence:** observed behavior and its limits; do not turn a reachable page into a readiness claim.
- **Reference maturity:** normative/draft/reserved, which belongs to specifications rather than product availability.
- **Child routes:** guides, articles, lessons, diagrams, result records and schema versions; each belongs to an indexed parent and has a return path.
- **Exclusions:** retired aliases, utility/login pages, obsolete artifacts, restricted services and deliberately non-public work.

A technical route ledger and a curated experience directory serve different purposes. The ledger accounts for all known routes and exceptions. The directory helps a visitor make a useful choice. A sitemap alone cannot provide that choice.

## Acceptance standard and tracked repairs

| Work | Bead | Evidence required before calling it fixed |
|---|---|---|
| Explore directory and public experience registry | `bd_000-projects-4um6` | Home → Explore → each promoted experience within two link activations; public descriptions/status; meaningful search; no private routes. |
| Learn handoff and incomplete pages | `bd_000-projects-xt6p.1` | Consistent introduction/application; complete or retired public pages; correct access labels and return path; guest journeys preserved. |
| Local navigation, return paths and orphan decisions | `bd_000-projects-qln7` | OMA games/products discoverable on mobile; deep pages return to parent/Explore; each orphan classified; aliases preserved. |
| Continuous route coverage and regression checks | `bd_000-projects-djgu` | Checks flag unclassified routes, broken/canonical targets, missing parents, duplicate entries and stale evidence without hitting action/provider/private endpoints. |

Verify five visitor tasks at desktop/mobile and by keyboard: find a typing game; understand Learn and apply; find a real-estate workflow; inspect an AI test; find a desktop tool. In a later usability check, ask people unfamiliar with the brands to do the same tasks and record completion and wrong turns. No conversion improvement or human usability result is claimed here.

A two-click standard applies to promoted named experiences, not every article, lesson or machine-generated result. Deeper resources remain reachable through their parent collections. Every approved public experience must either have a directory entry or an explicit parent/classification, with no unexplained orphan.

## Independent reviews and evidence handling

- [Learn review](090-public-discovery-evidence/learn-review.md)
- [OMA and Demos review](090-public-discovery-evidence/experiences-review.md)
- [Company, Labs and Evals review](090-public-discovery-evidence/architecture-review.md)
- [Verified request inventory](090-public-discovery-evidence/verified-routes.csv)
- [Additional sitemap discovery](090-public-discovery-evidence/additional-sitemap-routes.csv)
- [Coverage and limitations](090-public-discovery-evidence/coverage.json)

The versioned evidence contains normalized public route data and specialist findings. Full HTML, screenshots and browser captures remain in the working evidence directory `/tmp/estate-team-audit/`; they are ephemeral and are not required to understand the findings. No secrets, customer records or private curriculum are included in the deliverable. Follow-up status lives in Beads rather than a parallel Markdown task list.
