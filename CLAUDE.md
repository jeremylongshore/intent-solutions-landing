# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Task Tracking (Beads / bd)

Use `bd` for all tasks/issues (no markdown TODO lists). Root-level `AGENTS.md` defines the
session-end workflow and tracker context. The landing-local database currently requires
repair (`bd_000-projects-dxtq.9`); on the owner's workstation use the established umbrella
tracker at `/home/jeremy/000-projects`. Do not initialize, import or migrate the local database
to work around it. Code pushes and Beads data pushes are separate operations.

```bash
bd -C /home/jeremy/000-projects prime          # Refresh context
bd -C /home/jeremy/000-projects ready          # Start of session
bd -C /home/jeremy/000-projects update <id> --claim
bd -C /home/jeremy/000-projects close <id> --reason "Done"
bd -C /home/jeremy/000-projects dolt push      # Sync issue data
```

Elsewhere, establish the maintainer-designated tracker before making issue mutations.
The passive `.beads/issues.jsonl` export is not the source of truth.

## Repository Overview

Intent Solutions company site: accountable AI implementation. Lead with the customer's work, a defined outcome, inspectable evidence, and operating responsibility. The current conversion is **Request an outcome**, not a calendar booking. Practitioner access lives at learn.intentsolutions.io. Do not restore the old service brochure, vendor-led identity, static project counts, or unfinished partner offers.

Current authority: `000-docs/084-AT-DSGN-brand-family-contract.md`, `000-docs/085-AT-ARCH-site-map.md`, and `astro-site/src/data/site-map.mjs`. Older design and service documents are historical where they conflict. The route contract individually classifies every page; legacy URLs are non-indexable handoffs, not advertised services. Run `npm run build`, `npm run audit:indexability`, and `npm run audit:site-map` from `astro-site` before release. Browser checks: `python scripts/test-brand-polish.py <local-preview-url>` (Playwright Python with Chromium).

- **Active Project**: `astro-site/` (Astro 5.14 + React 19 + Tailwind 4)
- **Hosting**: Contabo VPS `intentsolutions` (167.86.106.29) via Caddy `file_server` at `/srv/intentsolutions/dist`. Deploy: push to `main` triggers `.github/workflows/deploy-vps.yml` (Tailscale OIDC + force-command SSH `/usr/local/sbin/deploy-intentsolutions`). No GCP / Firebase dependency — the marketing site is fully self-hosted as of 2026-06-10.
- **Analytics**: Umami at `https://analytics.intentsolutions.io` (self-hosted on the same VPS). Site ID `474bce85-f97d-409c-aba5-1e1ff36ee571`. Custom events via `window.umami.track('event_name', { props })`.
- **Deployed at**: https://intentsolutions.io
- **Plugin Marketplace**: https://tonsofskills.com/ (verify current catalog rather than hardcoding counts).
- **Customer action**: `/contact/?door=outcome`; no calendar funnel.
- **Proof**: link identifiable public artifacts and qualify what each demonstrates. No unverified counts, exclusivity claims, provider endorsements, or transplanted personal biography.
- **Legacy**: `99-Archive/` contains old React/Vite SPA (not in production).

## Commands

### Estate session recovery

Read `000-docs/089-AT-DSGN-financial-atlas.md` for the published atlas, release evidence,
source map and private presenter/AAR delivery status. The financial diagrams use Cathryn
Lavery's `diagram-design` v2.6 with 44 diagram grammars, pinned in that record; they are not
44 interchangeable themes. Preserve the fictional-example and proposed-model disclosures.
No successful website deployment proves adopted partner terms or completed legal agreements.

Presenter scripts were delivered privately; do not recreate them as a new unfinished task
or publish the source notebooks, scripts or email receipts into this repository.

### Development and verification

All commands run from `astro-site/` directory:

```bash
# Development
bun install              # Install dependencies
bun run dev              # Dev server at localhost:4321
bun run build            # Production build → dist/
bun run preview          # Preview production build
bun run audit:indexability  # SEO regression guard (sitemap/canonical/title/404)

# Testing (Playwright)
bun run test             # All E2E tests headless
bun run test:ui          # Interactive Playwright UI
bun run test:headed      # Run with visible browser
bun run test:debug       # Step-through debugging
bun run test:chromium    # Desktop Chrome only
bun run test:mobile      # Mobile Chrome + Safari
bun run test:report      # Open last HTML report
npx playwright test tests/<spec-file>.spec.ts  # Single test
```

## Architecture

### Astro + React Islands Pattern

Pages are static Astro files; interactive sections use React islands with `client:load` (immediate) or `client:visible` (lazy) hydration:

```astro
<Hero client:load />                 <!-- Hydrates immediately (above fold) -->
<ClaudeCodeTiers client:visible />   <!-- Hydrates when scrolled into view -->
```

- **Pages**: `src/pages/*.astro` — File-based routing, static content
- **Layout**: `src/layouts/Layout.astro` — SEO (astro-seo), Organization + WebSite JSON-LD, Umami analytics, `noindex` prop for utility pages
- **React Islands**: `src/components/*.tsx` — Interactive sections with Framer Motion + GSAP
- **Styles**: `src/styles/global.css` — Tailwind 4 + charcoal slate theme

### SEO posture (pinned 2026-05-25, see `000-docs/079-OD-AUDT`)

- `trailingSlash: 'always'` + `build.format: 'directory'` — every URL canonical form ends with `/`. Internal links must match (no redirect hops).
- `@astrojs/sitemap` with content-aware filter — excludes `/thank-you/`, `/404/`, and every `/field-notes/<slug>/` whose frontmatter `canonical` host ≠ `intentsolutions.io` (the 50+ field-notes that cross-post to startaitools.com).
- `public/robots.txt` references `https://intentsolutions.io/sitemap-index.xml`.
- Branded `src/pages/404.astro` with `noindex` → `dist/404.html`; Caddy `handle_errors` serves it on unmatched paths (real 404 status, not soft-404 homepage).
- Regression guard `scripts/audit-indexability.mjs` runs in CI before deploy.

### Form Submission Flow (VPS forms-api)

```
User submits form → POST /api/forms/contact (or /api/forms/partner)
  → Caddy reverse_proxy on the VPS to 127.0.0.1:8090
  → forms-api.service (Node, /srv/forms-api/server.mjs)
  → Honeypot check + lightweight enum validation + per-IP rate limit (3/hr on lead forms)
  → Slack webhook (#operation-hired) with all submitted fields formatted as a block
  → Return JSON response
```

**Slack-only by design.** No Resend email auto-reply, no Firestore persistence, no Cloud Functions — Slack is the source of truth for lead notifications. The submitter sees a thank-you message in the form UI; Jeremy gets the structured Slack ping.

Caddy block in `/etc/caddy/Caddyfile`:
- `handle /api/forms/* { reverse_proxy 127.0.0.1:8090 }` (must come BEFORE the static `handle { ... }` block — see runbook `tonsofskills-forms-api.md` for the directive-ordering gotcha).
- Frontend was migrated from `/api/contact`+`/api/partner` to `/api/forms/contact`+`/api/forms/partner` on 2026-05-07.

The legacy `astro-site/functions/` Cloud Functions directory was removed on 2026-06-10 — see the SEO/cleanup audit doc. Canonical zod schemas for the form payloads live next to each form component (`src/components/Contact.tsx`, `src/pages/resellers.astro`).

### Testing Infrastructure

- Playwright config at `astro-site/playwright.config.ts`. `tests/` contains `fixtures/`, `helpers.cjs`, `PRE-LAUNCH-CHECKLIST.md`, `TESTING-QUICK-START.md`, and artifact dirs — no `*.spec.*` files yet (spec scaffolding still needed).
- Test server auto-starts on port 8080 (`bun run dev --port 8080`).
- Projects: Desktop Chrome/Firefox/Safari, iPhone 12/12 Pro, Pixel 5, iPad Pro.
- Failure artifacts: `tests/screenshots/`, `tests/videos/`, `tests/reports/`.

### CI/CD (GitHub Actions)

**Deploy VPS** (`.github/workflows/deploy-vps.yml`):
- Triggers on push to main (paths `astro-site/**` or the workflow itself) and manual dispatch.
- Pre-deploy gate runs `npm ci` + `npm run build` + `npm run audit:indexability` + line-length cap check.
- Deploy job uses the reusable `jeremylongshore/.github` `vps-deploy.yml` — Tailscale OIDC → force-command SSH on the VPS → `/usr/local/sbin/deploy-intentsolutions` does `git fetch + npm ci + astro build + atomic rsync` to `/srv/intentsolutions/dist`. Health check at `https://intentsolutions.io/healthz`.
- Smoke validation: `.ok == true` on the healthz response.
- **Known issue**: when the Tailscale OIDC trust credential at `login.tailscale.com/admin/settings/trust-credentials` is broken, automated deploy fails at the "Connect Tailscale" step (HTTP 403). Manual fallback: `ssh intentsolutions '/usr/local/sbin/deploy-intentsolutions'`, run as the `intentsolutions` user exactly as the CI force-command does. **Never with sudo**: a root run leaves root-owned files in `/srv/intentsolutions/` that the next unprivileged CI deploy cannot overwrite (cleaned up 2026-10-17). The same rule applies to every `/usr/local/sbin/deploy-*` script. Tracked as bead `OPS-b78`; the Tailscale trial expiry that blocks CI deploys is intent-os bead "Tailscale trial expired".

**Release** (`.github/workflows/release.yml`):
- Auto-detects version bump from commit messages (BREAKING→major, feat→minor, else patch).
- Updates package.json, creates git tag + GitHub Release with changelog.

## Design System

Theme in `src/styles/global.css` (Charcoal Slate / Theme 7):

| Class | Purpose |
|-------|---------|
| `card-slate` | Semi-transparent cards with backdrop blur |
| `btn-primary` | Established action styling; homepage uses scoped orange primary buttons |
| `btn-secondary` | Transparent with zinc border |
| `btn-sm` | Smaller button padding |
| `text-hero` | 3.5rem/2.5rem mobile hero text |
| `text-h1`, `text-h2` | Heading sizes with tight tracking |
| `transition-smooth` | Cubic-bezier transitions |

Current brand: orange branching-arrow mark, charcoal/zinc surfaces, Syne display and Inter body text. Preserve this identity. The contact form is a React island; core company and directory content is static Astro. Legacy animation libraries and components are not visual authority for current pages.

## Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Customer outcome, inspectable work, method, accountable team, request |
| `/contact/` | Request and inline success/error state |
| `/about/` | Team and operating responsibilities |
| `/support/` | Existing agreements and repository support channels |
| `/projects/` | Public work and evidence discovery, not a sales catalog |
| `/estate/` | Connected company and operating atlas entry point |
| `/estate-blueprint.html` | Generated eight-view operating blueprint |
| `/estate/economics/` | Financial teaching index and eleven chapter routes |
| `/field-notes/` | Engineering blog index (posts cross-post to startaitools.com; canonical there) |
| `/site-map/` | Human directory of current company pages and related properties |
| `/terms/`, `/privacy/`, `/acceptable-use/` | Existing published policies |
| Legacy service and `/learn/` routes | Individual noindex handoffs defined in `src/data/site-map.mjs` |

Astro page routes are slash-terminated; standalone generated diagrams intentionally use
`.html` URLs. The audit guard rejects any sitemap URL whose canonical isn't self-referential.

## Content Guidelines

**Do**:
- Lead with the business work the visitor needs AI to do.
- Explain how the outcome is defined, tested, and operated.
- Link the relevant evidence and state its limits and freshness.
- Keep Request an outcome as the primary customer action.
- Route practitioner access to Learn and existing customers to Support.
- Keep every source page in the route contract and test its links and indexing.

**Don't**:
- Make a model vendor the company identity.
- Publish prices, packages, partner enrollment, or response-time guarantees without an approved current offer.
- Present demos as purchasable or production-ready merely because they are listed.
- Add newsletter promises before signup, consent, delivery, and unsubscribe are verified.
- Reintroduce Firebase / GCP dependencies on the marketing site — it's fully self-hosted now (Umami analytics, VPS hosting, forms-api on the VPS).

## Testing baseline (2026-05-01 — Intent Solutions Testing SOP)

This repo participates in the **Intent Solutions Testing SOP** per `~/.claude/CLAUDE.md` § "Intent Solutions Testing SOP" and the VPS-as-the-home program (`OPS-5nm`, Priority 6).

**Installed**: `@intentsolutions/audit-harness v0.1.0` vendored at `.audit-harness/` with wrapper at `scripts/audit-harness`.

**Commands**: `scripts/audit-harness {verify, init, list, escape-scan --staged}`.

**Next step**: run `/audit-tests` to produce `TEST_AUDIT.md`. See `000-docs/078-OD-SOPS-audit-harness-baseline-2026-05-01.md`.

**Upgrade**: `AUDIT_HARNESS_VERSION=vX.Y.Z curl -sSL https://raw.githubusercontent.com/jeremylongshore/audit-harness/main/install.sh | bash`. Or run `/sync-testing-harness` from any session.

## Reference docs

- `000-docs/089-AT-DSGN-financial-atlas.md` — atlas sources, research limits, diagram authority, release and delivery status.
- `000-docs/079-OD-AUDT-search-console-indexing-audit.md` — SEO posture, robots.txt rationale, subdomain noindex hardening (§ 4a), GSC actions.
- `000-docs/078-OD-SOPS-audit-harness-baseline-2026-05-01.md` — testing harness baseline.
- `000-docs/search-console-url-audit.csv` — per-URL audit data from the SEO regression cleanup.
