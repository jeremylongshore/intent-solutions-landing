# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Task Tracking (Beads / bd)

Use `bd` for all tasks/issues (no markdown TODO lists). Root-level `AGENTS.md` defines the "landing the plane" session-end workflow — work is not complete until `git push` succeeds (pull --rebase → `bd sync` → push → verify "up to date with origin").

```bash
bd ready                                    # Start of session
bd create "Title" -p 1 --description "..."  # Create work
bd update <id> --status in_progress         # Begin task
bd close <id> --reason "Done"               # Complete task
bd sync                                     # End of session
```

After upgrading `bd`: run `bd info --whats-new` and `bd hooks install` if warned.

## Repository Overview

Intent Solutions landing page — **Discovery-first engagement model**. Three core offerings: **Learn with Jeremy**, **Consulting**, and **Building (Claude Code Systems)**. No public pricing — potential clients book a discovery call.

- **Active Project**: `astro-site/` (Astro 5.14 + React 19 + Tailwind 4)
- **Hosting**: Contabo VPS `intentsolutions` (167.86.106.29) via Caddy `file_server` at `/srv/intentsolutions/dist`. Deploy: push to `main` triggers `.github/workflows/deploy-vps.yml` (Tailscale OIDC + force-command SSH `/usr/local/sbin/deploy-intentsolutions`). No GCP / Firebase dependency — the marketing site is fully self-hosted as of 2026-06-10.
- **Analytics**: Umami at `https://analytics.intentsolutions.io` (self-hosted on the same VPS). Site ID `474bce85-f97d-409c-aba5-1e1ff36ee571`. Custom events via `window.umami.track('event_name', { props })`.
- **Deployed at**: https://intentsolutions.io
- **Plugin Marketplace**: https://claudecodeplugins.io (430+ plugins)
- **Booking Link**: https://calendar.app.google/Wqbt8EJuEh5xvvV58
- **Proof Points**: 2,200+ GitHub stars, 430+ plugins, 2,750+ agent skills, 300+ forks, ~53k monthly npm downloads across `@intentsolutionsio/*`, only external Google Agent Starter Pack contributor, 20+ years ops.
- **Legacy**: `99-Archive/` contains old React/Vite SPA (not in production).

## Commands

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
- **Known issue**: when the Tailscale OIDC trust credential at `login.tailscale.com/admin/settings/trust-credentials` is broken, automated deploy fails at the "Connect Tailscale" step (HTTP 403). Manual fallback: `ssh intentsolutions; sudo /usr/local/sbin/deploy-intentsolutions`. Tracked as bead `OPS-b78`.

**Release** (`.github/workflows/release.yml`):
- Auto-detects version bump from commit messages (BREAKING→major, feat→minor, else patch).
- Updates package.json, creates git tag + GitHub Release with changelog.

## Design System

Theme in `src/styles/global.css` (Charcoal Slate / Theme 7):

| Class | Purpose |
|-------|---------|
| `card-slate` | Semi-transparent cards with backdrop blur |
| `btn-primary` | Zinc-200 background buttons |
| `btn-secondary` | Transparent with zinc border |
| `btn-sm` | Smaller button padding |
| `text-hero` | 3.5rem/2.5rem mobile hero text |
| `text-h1`, `text-h2` | Heading sizes with tight tracking |
| `transition-smooth` | Cubic-bezier transitions |

Colors: Zinc palette (950-50), Inter font family. Animation: Framer Motion (React islands), GSAP (scroll/page), Lenis (smooth scroll).

## Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage — Claude Code Systems + Learn/Colab + secondary services |
| `/learn/` | Learn with Jeremy — training, coaching, workshops |
| `/colab/` | Colab with Jeremy — partnerships, joint ventures |
| `/contact/` | Standalone contact page |
| `/agents/` | AI Agents (Intent Agent Models — M1/M2/M3) |
| `/private-ai/` | Private AI infrastructure (deployed in your own cloud tenancy) |
| `/automation/` | Workflow automation (Claude Code + custom tooling) |
| `/cloud/` | Cloud services |
| `/projects/` | Projects portfolio (includes Kobiton client engagement) |
| `/field-notes/` | Engineering blog index (posts cross-post to startaitools.com; canonical there) |
| `/resellers/` | Distribution partner program |
| `/infrastructure/` | Cloud infrastructure deployment focus (distinct title from /private-ai/) |
| `/learn/security/` | Vertex vs self-hosted comparison |
| `/learn/models/` | Model-agnostic delivery |

All internal routes are slash-terminated; the audit guard rejects any sitemap URL whose canonical isn't self-referential.

## Content Guidelines

**Do**:
- Lead with Claude Code Systems as the primary service.
- Emphasize "build + train" positioning and discovery-first engagement.
- Reference 430+ plugins, 2,200+ GitHub stars, 2,750+ agent skills, ~53k monthly npm downloads as proof of capability.
- All CTAs point to discovery call booking (calendar link), not pricing.
- Offer flexible contact options (Discord, WhatsApp, LinkedIn, X, phone).
- Show tiered packages clearly.

**Don't**:
- Bury Claude Code under other services.
- Show public pricing (discovery-first model — all pricing is private).
- Require rigid form fields (let people choose their contact method).
- Over-emphasize secondary services on homepage.
- Reintroduce Firebase / GCP dependencies on the marketing site — it's fully self-hosted now (Umami analytics, VPS hosting, forms-api on the VPS).

## Testing baseline (2026-05-01 — Intent Solutions Testing SOP)

This repo participates in the **Intent Solutions Testing SOP** per `~/.claude/CLAUDE.md` § "Intent Solutions Testing SOP" and the VPS-as-the-home program (`OPS-5nm`, Priority 6).

**Installed**: `@intentsolutions/audit-harness v0.1.0` vendored at `.audit-harness/` with wrapper at `scripts/audit-harness`.

**Commands**: `scripts/audit-harness {verify, init, list, escape-scan --staged}`.

**Next step**: run `/audit-tests` to produce `TEST_AUDIT.md`. See `000-docs/078-OD-SOPS-audit-harness-baseline-2026-05-01.md`.

**Upgrade**: `AUDIT_HARNESS_VERSION=vX.Y.Z curl -sSL https://raw.githubusercontent.com/jeremylongshore/audit-harness/main/install.sh | bash`. Or run `/sync-testing-harness` from any session.

## Reference docs

- `000-docs/079-OD-AUDT-search-console-indexing-audit.md` — SEO posture, robots.txt rationale, subdomain noindex hardening (§ 4a), GSC actions.
- `000-docs/078-OD-SOPS-audit-harness-baseline-2026-05-01.md` — testing harness baseline.
- `000-docs/search-console-url-audit.csv` — per-URL audit data from the SEO regression cleanup.
