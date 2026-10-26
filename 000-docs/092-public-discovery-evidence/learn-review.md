# Learn reachability and understanding audit

Read-only audit, 16 October 2026. Scope: anonymous first-time visitor, company homepage to Learn, Learn public links/sitemap, and bounded source-discovered routes. Used webapp-testing skill, HTTP GETs, source inspection, and Playwright at 390×900 and 1440×900. No forms submitted, no accounts created, no member content accessed, no project files changed.

## Outcome

Learn is reachable from the company homepage in one click, including on mobile. It is NOT a hidden course catalog: the current public offer is a selective practitioner community with shared methods and three broad practice tracks. Actual courses/community are member-only. The weakness is incomplete public explanation and inconsistent identity as visitors proceed into access, plus stale public pages beyond the advertised front door.

## Confirmed journey

- https://intentsolutions.io/ → contextual “Here to build with us? Explore the practice” link → https://learn.intentsolutions.io/ : clicked successfully at both widths.
- Learn → “View current practice tracks” → https://learn.intentsolutions.io/course/explore : clicked successfully at both widths.
- Tracks → “Request access” → https://learn.intentsolutions.io/request-access : clicked successfully at both widths.
- All five browser-tested pages (company, Learn, tracks, access, login) returned 200 and had no document-wide horizontal overflow at either width.
- On company mobile, the network Learn link occupies x344–386 at width 390. The contextual Learn entry appeared at y812.5 in the initial document. OMA and later network entries need separate parent audit; do not say Learn is absent from the mobile header.

## What the visitor can actually do

Public: understand the practice, read general track descriptions, inspect Labs/Evals externally, request access, sign in, reset password. Three described tracks: production architecture; agent building and orchestration; evaluation and governance. No individual lessons or course inventory are offered anonymously. The three track cards are descriptive, not links to additional detail.

Private boundary: /community, /dashboard and /my_courses redirect anonymously to /user/login. /user/logon redirects to /request-access rather than open registration. This is consistent with selective access, but the login text “Need an account? Create one” misstates what the next step is.

## Prioritized findings

1. **P1: Admission journey changes what the visitor thinks they are applying for.** Learn root/tracks state credentials are optional and describe practitioner education. /request-access instead brands the header “Solutions Catalyst” and offers only “Certification support only”, certification plus project work, or uncertainty. The form has no Learn identity, no explanation of the three tracks, and no return link to Learn (the sole anchor is company Privacy). Observed directly and screenshot-confirmed. Recommendation: retain Learn/application context, offer choices matching the actual practice, and provide a clear return path. This is an information architecture/copy correction, not a visual redesign.

2. **P1: Useful deeper public explanation exists outside advertised discovery, and is unfinished.** /page/about-us returns 200 with audience, operation, team and FAQ detail; neither homepage nor tracks links to it, and sitemap omits it. It contains literal placeholders for founding year, pricing, terms, response timing and metrics, plus a headquarters assertion requiring validation. Do not blindly add it to a public directory before completing or replacing its content. /page/privacy-policy also returns 200 with unfinished policy text, while front-door pages link a different company policy. Both are linked in their application-shell footer, not the public marketing footer. Decide canonical pages and ensure they agree.

3. **P2: Learn's public offer remains abstract at the moment a visitor needs to judge fit.** Root and tracks explain principles, but public track descriptions have no concrete example session, sample artifact, schedule, prerequisites or clear pricing/access model. The inaccessible/placeholder details do not resolve this. Inference: visitors can technically reach the application but may still lack enough information to decide to apply. Recommend one complete “How the practice works” detail page with honest current availability and a sample; do not advertise private curriculum as publicly usable.

4. **P2: Source inventory and live website differ materially.** /home is a public duplicate of root; /program/explore returns an empty public program list (“0 found programs - Page 1 of 0”), despite no link from the front door. The original learn-intent-solutions-hub repo still describes a Hono exam-prep site and contains eight tested old .html URLs which now return 404 (exam-prep, practice, associate-prep, developer-prep, architect-professional-prep, ask, tools, proposal). Current source is now-lms/intent_learn. Record ownership/current status so directory generation does not republish obsolete routes. These are not eight confirmed orphaned live offerings: they are old source routes, absent on current production.

5. **P2: The sitemap describes the promoted surface, not every public page.** robots permits crawling and sitemap lists exactly root, /course/explore, /request-access. It omits the two public content pages, login/recovery (often reasonable to omit), and empty programs (should not be promoted). Source-backed status classification is required; “everything with a URL” is not a suitable directory policy.

## Directory recommendation specific to Learn

Give Learn an estate directory entry under “Learn & practice”: “Practitioner education and peer review for people building AI systems.” Label it “Application required.” Link directly to the public practice overview and current tracks, with optional “Member sign in.” After repair, add the complete detail/sample page as a discoverable nested offering. Do not expose member content or make three broad track labels look like publicly playable courses.

## Source evidence

- /home/jeremy/000-projects/now-lms/AGENTS.md and FORK.md identify current deploy line and private curriculum boundary.
- now_lms/templates/themes/intent_learn/overrides/course_list.j2 explicitly separates anonymous teaser from member courses; anonymous template intentionally renders no course data.
- now_lms/static/themes/intent_learn/sitemap.xml matches live 3-URL sitemap.
- now_lms/content/intent_learn/about.html and scripts/seed_intent_pages.py back the live hidden About/privacy pages.
- now_lms/vistas/custom_pages.py defines /page/<slug>; member_dashboard.py and courses/base.py define member entry points.
- /home/jeremy/000-projects/learn-intent-solutions-hub/public/*.html and README.md show the earlier source surface; live probes establish absence, not migration completeness.

## Evidence artifacts and limitations

route-inventory.csv/json: 24 Learn URL probes including robots/sitemap, aliases, old routes and member boundaries. routes-direct.json, legacy-route-probes.json, source-discovered-routes.json retain exact status/final URL/link evidence. browser-results.json retains ten page-width observations and successful click journeys. company/learn/tracks/access/login-{390,1440}.png retain screenshots. browser-audit.py is reproducible and aborts non-read-only HTTP methods.

Bounded completeness: all advertised Learn HTML links and sitemap entries inspected; selected current-source public content/application paths and legacy source routes checked. Not a database enumeration of every custom page or course, not a private member audit, not a submission-delivery test, not a DNS inventory, and not a usability study. Do not infer live course counts or availability from source-only seeders.
