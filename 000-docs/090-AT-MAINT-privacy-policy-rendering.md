# Privacy policy rendering repair

Recorded October 17, 2026. Tracker: `bd_000-projects-xt9n`.

## Finding and authority

The company `/privacy/` route returned a heading without a policy body in the HTTP
response. The existing GetTerms integration still rendered a complete policy in a
JavaScript-enabled browser. This was an availability/accessibility issue, not an
absence of previously published policy content.

Published authority captured from:

- <https://intentsolutions.io/privacy/>, `.getterms-document-embed` after rendering.
- <https://gettermscdn.com/embed/wH2cn/privacy/en-us?i=0&mode=direct>.

The existing text states **effective July 6, 2025**, **last updated September 12, 2026**.
Those dates and all policy wording remain unchanged. The duplicate embedded H1,
outer wrapper, empty framework comments and runtime embed script were removed;
whitespace and page typography were adjusted for readable static HTML.

Captured rendered HTML SHA256:
`01fa7fc85de76dead790ab8646138c0cb52808af0ac906c66e2b215dea3bdb07`.

Policy body SHA256 after removing the duplicate title and normalizing whitespace:
`7129d3d98dc26a17c3018837be7d8e1b504ddb07d67fcd0a53f4ecaea0d7da08`.

The static source is `astro-site/src/content/legal/privacy-policy.html`. Future
approved policy changes must update that file and its browser-test digest together.
The page no longer follows GetTerms edits automatically. Review the actual policy
source when making changes; do not replace it with a generic generated notice.

## Scope and evidence limits

This repair republishes existing content; it is not a new legal review or a claim
that every historical clause matches every current product. The text includes
broad clauses about contests, third parties, Stripe, children and state privacy
rights. Their accuracy and applicability are outside this rendering-only repair.
Independent parent-agent review confirmed identical normalized text (2,771 words),
no scripts/iframes and this rendering-only boundary before merge. This is an
engineering/content-preservation review, not a licensed legal opinion. Historical
policy accuracy and the stale Slack-only description are tracked separately in
`bd_000-projects-u5kg`.

The following authoritative company and data-flow records were inspected to avoid
inventing new commitments (paths are relative to the private `intent-os` repo):

- `business-plan/company-details.md`: company name, business mailing address and
  company contact. No home address is added by this repair.
- `ops/host/services/forms-api/server.mjs` and
  `ops/host/services/lib/lead-spool.mjs`: Buzz lead delivery and failure spool.
- `decision-log/026-2026-07-18-business-lead-notifier-class-and-durability.md`:
  distinct business-lead durability boundary.
- `ops/email/README.md`: MXroute company mail operations.
- `ops/lms/README.md`: LMS records and intake notifications.

The landing `CLAUDE.md` still describes historical Slack-only form delivery; current
service source is the stronger authority for a future data-practices review. No
processor, retention period, deletion promise, jurisdictional or compliance claim
has been newly authored here. No correspondence or form submissions were sent.

## Verification

The existing `test-brand-polish.py` browser gate verifies the exact published body,
one H1, final Contact Us section, HTTP 200, no GetTerms script/iframe dependency,
and no horizontal overflow at 320, 390 and 1440 pixels with JavaScript both disabled
and enabled while GetTerms requests are blocked. It also checks 200% text reflow.
Build, indexability, site-map and the existing release browser gates remain required.
