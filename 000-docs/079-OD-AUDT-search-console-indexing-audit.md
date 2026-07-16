# Search Console Indexing Audit — intentsolutions.io

| Field | Value |
|---|---|
| Doc | 079-OD-AUDT |
| Date | 2026-05-25 |
| Author | Jeremy Longshore |
| Scope | Google Search Console indexing regression on intentsolutions.io |
| Bead | intent-solutions-landing-6io |
| Companion data | `000-docs/search-console-url-audit.csv` |

## 1. Symptom

Google Search Console showed indexed pages dropping **25 → 16** and not-indexed
rising **23 → 32**, broken down as:

| GSC reason | Count |
|---|---|
| Page with redirect | 17 |
| Alternate page with proper canonical tag | 3 |
| Crawled – currently not indexed | 10 |
| Not found (404) | 1 |
| Duplicate without user-selected canonical | 1 |

CSV exports give counts, not URLs. Affected URLs were **reconstructed** by crawling
production and reading the repo (`firebase.json` redirect history, `SiteNav.astro`,
`Footer.tsx`, field-note frontmatter).

## 2. Root causes (differ from the surface labels)

1. **Trailing-slash mismatch — master cause of "17 Page with redirect."**
   `astro.config.mjs` set no explicit `trailingSlash`. Live serving 200s the slash
   form (`/contact/`) and **308-redirects** the no-slash form (`/contact`). Google's
   index held the **no-slash** URLs left over from the retired Firebase era
   (`firebase.json` used `trailingSlash: false`). Every internal link in
   `SiteNav.astro` and `Footer.tsx` pointed at the no-slash form — the site actively
   advertised redirecting URLs.

2. **Soft-404 everywhere.** The VPS Caddy `file_server` returned the **homepage at
   HTTP 200** for any unmatched path. No `sitemap.xml` and no `robots.txt` existed on
   prod — both returned homepage HTML. Feeds *Duplicate without user-selected
   canonical* and *Crawled – currently not indexed*.

3. **No sitemap generated.** `@astrojs/sitemap` was not installed. Google had
   link-only discovery.

4. **www not canonicalized.** `https://www.intentsolutions.io/` served 200 with no
   301 to non-www — relied solely on the canonical tag.

5. **Field-note posts are intentional cross-post alternates.** All 51 field-note
   `.md` files carry `canonical: https://startaitools.com/...`. They legitimately
   show as *Alternate page with proper canonical tag* and must **not** be pushed for
   indexing here. **startaitools.com is the canonical publisher (user-confirmed).**

6. **Lost migration redirects.** `/survey`, `/survey/**` → `/` and `/learn/pricing`
   → `/learn` existed in `firebase.json` but were never carried into the Caddy
   config — now soft-404 to homepage. Likely source of the 1 *Not found (404)* and
   some redirect noise.

7. **Duplicate `<title>` (found by the regression script).** `/infrastructure/` and
   `/private-ai/` both used the title "Private AI Infrastructure" — a genuine
   contributor to *Duplicate without user-selected canonical*.

## 3. Fixes applied

### Repo (this PR)

| Area | Change |
|---|---|
| `astro.config.mjs` | `trailingSlash: 'always'` + `build.format: 'directory'` (explicit/deterministic); added `@astrojs/sitemap` with a content-aware `filter` |
| Sitemap filter | Excludes `/thank-you/`, `/404/`, and every `/field-notes/<slug>/` whose frontmatter `canonical` host ≠ `intentsolutions.io` (reads frontmatter at config-load). Keeps the `/field-notes/` index |
| `public/robots.txt` | New — `Allow: /` + `Sitemap: https://intentsolutions.io/sitemap-index.xml` |
| `SiteNav.astro`, `Footer.tsx` | All internal links → slash form (no redirect hops). Anchors + external URLs unchanged |
| `src/pages/**`, `Layout.astro` | Swept remaining internal `href="/..."` CTAs to slash form; field-notes index card links slash-terminated |
| `Layout.astro` | Added `Organization` + `WebSite` JSON-LD (once per page); added `noindex` prop wired to astro-seo |
| `src/pages/404.astro` | New branded 404 with `noindex` → builds to `dist/404.html` |
| `contact.astro` | Added single semantic `<h1>` (page rendered 0 H1; shared `Contact.tsx` heading left as `<h2>` because it renders on 5 pages that already have an H1) |
| `infrastructure.astro` | Retitled "Cloud Infrastructure in Your Own Account" to resolve the duplicate title |
| `scripts/audit-indexability.mjs` | New regression guard (Node built-ins) wired as `audit:indexability` and a CI step in `deploy-vps.yml` |

**Sitemap result:** 25 canonical, indexable, slash-form, self-canonical 200 URLs.
0 field-note cross-post URLs. Audit passes with 25 unique titles.

### VPS Caddyfile (`/etc/caddy/Caddyfile`, applied via SSH)

1. Killed the SPA homepage-fallback; unmatched paths now serve a real **404** via
   `handle_errors { rewrite * /404.html; file_server }`.
2. `www.intentsolutions.io/*` → `intentsolutions.io/{uri}` **301 permanent**.
3. Restored migration redirects: `/survey` + `/survey/*` → `/` (301);
   `/learn/pricing` → `/learn/` (301).
4. Trailing-slash: directory-format file_server already 308s no-slash → slash
   (matches `trailingSlash: 'always'`).

> Reconcile these with `intent-os/ops/ingress/` (follow-up, non-blocking).

## 4. Intentional alternates — do not "fix"

The 3 *Alternate page with proper canonical tag* entries are field-note cross-posts.
They render on intentsolutions.io but canonicalize to startaitools.com. This is
**correct and intended** — startaitools is the canonical publisher. They are excluded
from the sitemap and will **remain** as alternates in GSC. Do not request indexing for
them here.

## 4a. "Blocked by robots.txt" on subdomains — also intentional (2026-06-09)

GSC's *Blocked by robots.txt* category started appearing 2026-06-09. Verified
diagnosis:

| Host | `/robots.txt` content | Verdict |
|---|---|---|
| `intentsolutions.io` | `User-agent: *` + `Allow: /` + sitemap ref | fully permissive — does not block anything |
| `analytics.intentsolutions.io` (Umami) | `User-agent: *` + `Allow: /q/` + **`Disallow: /`** | **intentional** — Umami dashboard must not be indexed |
| `projects.intentsolutions.io` (Plane) | returns `text/html` SPA at `/robots.txt` | Google treats as "no robots.txt → allow all" (not flagged) |
| `crm.intentsolutions.io` (Twenty) | returns `text/html` SPA at `/robots.txt` | same as Plane |
| `partners.intentsolutions.io` | empty (basicauth-gated) | not flagged |

**Source of discovery**: Certificate Transparency / DNS, not internal links —
verified no `analytics.intentsolutions.io` reference in any `src/` file or live HTML.

**Why this surfaces in GSC**: the property is a *domain* property (covers all
subdomains). Google's crawler discovers subdomains via CT logs, tries
`analytics.intentsolutions.io/`, sees Umami's `Disallow: /`, reports it as
"Blocked by robots.txt." This is **expected behavior, not a bug**.

**Do not "fix"** by removing Umami's `Disallow: /` — that would expose the
analytics dashboard to indexing, which is the opposite of what we want.

**Recommended GSC action**: accept the report as intentional. There's no
"Validate Fix" because nothing is broken. The flagged entries will eventually
drop off as Google deprioritizes them.

### Defense-in-depth applied (2026-06-09)

To prevent any future drift (e.g., an Umami / Plane / Twenty upgrade changing
its default `robots.txt`), the VPS Caddyfile now sends
`X-Robots-Tag: noindex, nofollow, noarchive` on every response from the
internal subdomains. This works **belt-and-suspenders** with the upstream
`Disallow: /` — even if robots.txt drifts, the header keeps these out of the
index categorically.

Implementation: new reusable Caddy snippet `(noindex-headers)` in
`/etc/caddy/Caddyfile`, imported by:

- `analytics.intentsolutions.io` (Umami)
- `projects.intentsolutions.io` (Plane)
- `crm.intentsolutions.io` (Twenty)
- `mandy.intentsolutions.io` (basicauth-gated command center)
- `partners.intentsolutions.io` (partner-portal, basicauth per slug)

**Deliberately NOT imported** by the public marketing sites
(`intentsolutions.io`, `tonsofskills.com`, `scorecardecho.com`,
`hustlestats.io`) — those are brand surfaces that must index.

Verified live: `curl -sI https://analytics.intentsolutions.io/ | grep -i x-robots`
→ `noindex, nofollow, noarchive`. Backup of the previous Caddyfile saved
under `/etc/caddy/Caddyfile.bak.*`.

### CTO-grade GSC action (you, 60 seconds)

The technical hardening above eliminates any *real* indexing risk. The
remaining piece is a console-only change to clean up the GSC report itself:

1. In Search Console → **Settings → Property type**
2. Either: change `https://intentsolutions.io/` from **Domain** to
   **URL-prefix** (so the report only covers the marketing site, not
   subdomains), or
3. Or: verify each internal subdomain as a separate URL-prefix property and
   mark "Blocked by robots.txt" as expected there.

Option 2 is faster and matches the brand reality — the marketing site is
the brand surface; the dashboards are infrastructure. Either way, the
hardening above means a real indexing leak from a subdomain is no longer
possible without an explicit code/config change.

## 5. Manual Search Console follow-up (Jeremy, after deploy)

1. Resubmit `sitemap-index.xml`.
2. "Validate Fix" on: Page with redirect, Not found (404), Duplicate without
   user-selected canonical, Crawled – currently not indexed.
3. Request indexing only for important pages: home, `/learn/`, `/agents/`,
   `/automation/`, `/cloud/`, `/private-ai/`, `/colab/`, `/contact/`, `/projects/`.
4. Expect the 3 *Alternate page with proper canonical tag* (field-note cross-posts)
   to **remain** — that is correct.

## 6. Out of scope / accept

- Field-note cross-posts will not index on intentsolutions.io by design.
- Old no-slash inbound links keep 308-redirecting (intentional; no longer advertised
  internally).
