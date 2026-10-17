# Public discovery checks

The directory answers **what can I explore?** These checks answer **is the approved
navigation still classified and reachable?** Neither answer certifies a product,
provider integration, entitlement, form delivery or production readiness.

## Run

From `astro-site/` (Python standard library and Node 22):

```sh
node scripts/audit-discovery.mjs
python3 scripts/test-public-routes.py
python3 scripts/audit-public-routes.py --output /tmp/public-route-source.json
python3 scripts/audit-public-routes.py --live --output /tmp/public-route-live.json
```

The first three commands are offline PR checks. Live checks make passive GET
requests only. Browser journeys require Playwright Python 1.54.0 and Chromium:

```sh
python3 scripts/test-public-journeys.py --output /tmp/public-journeys.json
```

Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` for an existing local Chromium installation.
The browser intercepts non-GET requests, fetch/XHR, API paths and third-party
hosts. It follows five visitor tasks at mobile and desktop widths: typing game,
learning, outreach, published research result and a plugin. Client-rendered return
navigation has separate assertions. The child-safe game return is tested through two
local transmissions and its visible parent gate; it does not inject an ungated
company link into play. The check never submits a form or purchases access.

`.github/workflows/public-route-coverage.yml` runs offline checks on relevant PRs
and main pushes. Monday/Thursday at 09:17 UTC and manual dispatch add the live GET
and browser checks. JSON artifacts are retained for 14 days, including failed
runs. Workflow permissions are read-only; no secrets, provider actions, issue
creation or outbound messages are involved. A failed scheduled run is a repair
signal, not an instruction to automatically publish newly found routes.

## Exact coverage boundary

The approved public hosts are the company site, Demos, OMA, Learn, Labs and Evals.
The checker reconciles their declared sitemaps, the directory's primary/related
links, bounded same-host HTML navigation, the company route contract and page
sources, and Demos' reviewed public HTML manifest. Other branded sites are checked
only at their named directory destinations; their article archives are not crawled.

`src/data/public-experiences.mjs` owns named offerings and availability labels.
`src/data/site-map.mjs` owns company routes. `fixtures/public-route-policy.json`
records reviewed child pages, aliases, exclusions and narrow generated-record
families. An unknown URL is reported as **unclassified** and is not fetched or
added to the public directory. New plugins or demos must be explicitly reviewed;
there is no wildcard that silently approves new products.

The Demos manifest is read from its public GitHub source because it is not served
as an HTTP asset by the demo site. A route in that manifest is **source-discovered**,
not automatically deployed. The company source scan similarly does not prove
publication. `httpChecked`, `status`, `final`, canonical and robots fields capture
separate live response evidence. The optional owner-exported deployed inventory is
an array of public HTTPS URLs:

```sh
python3 scripts/audit-public-routes.py --live \
  --deployed-routes /tmp/approved-public-deployment.json \
  --output /tmp/public-route-live.json
```

Export only reviewed public routes. This input does not authorize private-route
requests. It can expose unlinked public files that no sitemap or navigation crawl
can discover. Without that input, there is **no claim to enumerate every deployed
file, subdomain, private route or article**.

Limits: 350 requests including metadata and redirects, 300 page checks, four
workers, at least 120 ms between requests to a host, 15 seconds per response,
2 MB per body, three redirect hops and twelve sitemap documents. Three page waves
cover approved seeds and two further navigation levels. Generated Labs evidence
records and company crossposts use small deterministic daily rotating samples;
unsampled records retain an explicit classification-only reason. Every redirect
is checked against the public boundary before requesting it. Cap exhaustion,
unavailable declared sources and unknown routes fail visibly.

## Interpret and repair findings

- **Unclassified**: establish owner, audience and intended status. Add a named
  offering to the directory, a reviewed child route, a narrow generated family or
  an exclusion with a reason. Do not use broad wildcard exclusions to turn CI green.
- **Broken/stale target**: repair the link or owner route; unexpected redirects
  fail. Reviewed HTTP aliases and immediate HTML handoffs are explicit.
- **Missing return**: core pages need Explore, carrier home or their approved
  collection parent. JavaScript applications require the separate browser check.
- **Canonical/index policy**: retain deliberate crosscanonical field notes and
  noindex handoffs/teaching utilities. Duplicate canonical destinations and
  unexpected canonicals fail; missing canonical tags remain visible metadata,
  not an invented site-wide requirement.
- **Stale review**: descriptions/classifications older than 180 days need human
  review. An HTTP 200 does not renew a content review date.

Reports include their denominator, discovery origin(s), source response evidence,
exclusions and unchecked samples. Compare like for like: discovered routes,
source routes, declared deployed routes and successfully fetched pages are
separate counts. Browser task completion means the stated navigation was possible,
not that the downstream product fulfilled a business outcome.
