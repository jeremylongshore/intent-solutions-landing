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
- **Hosting**: Contabo VPS `intentsolutions` (167.86.106.29) via Caddy `file_server` at `/srv/intentsolutions/dist`. Deploy: push to `main` triggers `.github/workflows/deploy-vps.yml` (Tailscale OIDC + force-command SSH `/usr/local/sbin/deploy-intentsolutions`). Migration off Firebase landed 2026-05-07.
- **GCP Project (legacy)**: `intent-landing-page` — billing disabled; Firebase Hosting + Functions retired. `firebase-deploy.yml` renamed to `.disabled`.
- **Deployed at**: https://intentsolutions.io
- **Plugin Marketplace**: https://claudecodeplugins.io (270+ plugins)
- **Booking Link**: https://calendar.app.google/Wqbt8EJuEh5xvvV58
- **Proof Points**: 1,550+ GitHub stars, 270+ plugins, 1,537 agent skills, only external Google Agent Starter Pack contributor, 20+ years ops
- **Legacy**: `99-Archive/` contains old React/Vite SPA (not in production)

## Commands

All commands run from `astro-site/` directory:

```bash
# Development
bun install          # Install dependencies
bun run dev          # Dev server at localhost:4321
bun run build        # Production build
bun run preview      # Preview production build

# Cloud Functions (from astro-site/functions/)
cd functions && npm install && npm run build   # Build functions (TypeScript → lib/)
cd functions && npm run build:watch            # Watch mode for function dev
cd functions && npm run logs                   # View function logs

# Firebase Deployment (from astro-site/)
firebase deploy                    # Deploy all (hosting, functions, firestore)
firebase deploy --only hosting     # Deploy static site only
firebase deploy --only functions   # Deploy Cloud Functions only
firebase emulators:start           # Local dev with emulators

# Testing (Playwright, from astro-site/)
bun run test                  # All E2E tests headless
bun run test:ui               # Interactive Playwright UI
bun run test:headed           # Run with visible browser
bun run test:debug            # Step-through debugging
bun run test:chromium         # Desktop Chrome only
bun run test:mobile           # Mobile Chrome + Safari
bun run test:api              # API specs only (legacy netlify config)
bun run test:report           # Open last HTML report
npx playwright test tests/<spec-file>.spec.ts  # Single test
```

## Architecture

### Astro + React Islands Pattern

Pages are static Astro files; interactive sections use React islands with `client:load` (immediate) or `client:visible` (lazy) hydration:

```astro
<Hero client:load />           <!-- Hydrates immediately (above fold) -->
<ClaudeCodeTiers client:visible />  <!-- Hydrates when scrolled into view -->
```

- **Pages**: `src/pages/*.astro` — File-based routing, static content
- **Layout**: `src/layouts/Layout.astro` — SEO (astro-seo), fonts, Firebase Analytics
- **React Islands**: `src/components/*.tsx` — Interactive sections with Framer Motion + GSAP
- **Styles**: `src/styles/global.css` — Tailwind 4 + charcoal slate theme

### Form Submission Flow (VPS forms-api)

```
User submits form → POST /api/forms/contact (or /api/forms/partner)
  → Caddy reverse_proxy on tonsofskills VPS to 127.0.0.1:8090
  → forms-api.service (Node, /srv/forms-api/server.mjs)
  → Honeypot check + zod validation + per-IP rate limit
  → SQLite insert (/srv/forms-api/forms.db) [B3 follow-up]
  → Slack webhook (operation-hired channel)
  → Resend email: thank-you + lead notification [B3 follow-up]
  → Return JSON response
```

**Caddy block** (in `/etc/caddy/Caddyfile`):
- `handle /api/forms/* { reverse_proxy 127.0.0.1:8090 }` (must come BEFORE the static `handle { ... }` block — see runbook tonsofskills-forms-api.md for the directive-ordering gotcha)
- Frontend was migrated from `/api/contact`+`/api/partner` to `/api/forms/contact`+`/api/forms/partner` on 2026-05-07.

The legacy Cloud Functions (`submitContact`, `submitPartnerInquiry`) in `astro-site/functions/` remain in the tree as reference for the canonical zod schemas and Resend email templates, but are no longer deployed.

### Cloud Functions

Located in `astro-site/functions/src/` (separate `package.json`, Node 20, compiled to `lib/`):

- `index.ts` — Function exports (submitContact, submitPartnerInquiry)
- `services/firestore.ts` — Firestore write operations
- `services/email.ts` — Resend email templates
- `services/slack.ts` — Slack notifications for Learn intake
- `services/vertexai.ts` — Vertex AI Gemini analysis for Learn intake
- `types/index.ts` — TypeScript interfaces (ContactSubmission, PartnerInquiry, LearnIntake, LearnAnalysis)
- `types/learn.ts` — Learn-specific types (LearnIntake, LearnAnalysis, SlackActionPayload)
- `utils/rate-limit.ts` — IP-based rate limiting (Firestore transactional, 1hr sliding window, fail-open)

### Rate Limiting

- Firestore `rateLimits` collection stores IP-hashed request timestamps
- Transactional writes for atomicity; fail-open if check errors
- 3 requests per IP per hour per endpoint (contact, partner)

### Firestore Schema

Collection: `contactSubmissions` (discriminated by `formType` field)
```typescript
{
  name: string, email: string, message: string,
  company?: string, phone?: string,
  interest: 'consulting' | 'learn' | 'colab' | 'other',
  projectType?: 'ai-ml' | 'workflow-automation' | 'gcp' | 'strategy',
  budget?: 'under-5k' | '5k-15k' | '15k-50k' | '50k-plus' | 'discuss',
  timeline?: 'immediate' | 'this-month' | 'this-quarter' | 'exploring',
  formType: 'enhanced-contact' | 'partner-inquiry',
  status: 'new' | 'contacted' | 'converted' | 'closed',
  createdAt: Timestamp,
  emailsSent?: { thankYou?: Timestamp, leadNotification?: Timestamp }
}
```

Composite indexes defined in `firestore.indexes.json` (formType+createdAt, status+createdAt, email+createdAt, formType+status+createdAt).

### Environment/Secrets

Secrets managed via Firebase:
```bash
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set RESEND_FROM_EMAIL
```

### Testing Infrastructure

- Playwright config at `astro-site/playwright.config.ts`. `tests/` contains `fixtures/`, `helpers.cjs`, `PRE-LAUNCH-CHECKLIST.md`, `TESTING-QUICK-START.md`, and artifact dirs — no `*.spec.*` files yet (spec scaffolding still needed)
- Legacy `playwright-netlify.config.cjs` exists alongside the primary `playwright.config.ts` — the `test:api` script targets the netlify config
- Test server auto-starts on port 8080 (`bun run dev --port 8080`)
- Projects: Desktop Chrome/Firefox/Safari, iPhone 12/12 Pro, Pixel 5, iPad Pro
- Failure artifacts: `tests/screenshots/`, `tests/videos/`, `tests/reports/`

### CI/CD (GitHub Actions)

**Firebase Deploy** (`.github/workflows/firebase-deploy.yml`):
- Triggers on push to main, PRs to main, manual dispatch
- Builds Astro site, then deploys hosting + functions via Workload Identity Federation
- PRs get Firebase preview channel deployments with URL comment

**Release** (`.github/workflows/release.yml`):
- Auto-detects version bump from commit messages (BREAKING→major, feat→minor, else patch)
- Updates package.json, creates git tag + GitHub Release with changelog

### Local Emulator Ports

| Service | Port |
|---------|------|
| Emulator UI | 4000 |
| Hosting | 5000 |
| Functions | 5001 |
| Firestore | 8081 |

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
| `/learn` | Learn with Jeremy — training, coaching, workshops |
| `/colab` | Colab with Jeremy — partnerships, joint ventures |
| `/contact` | Standalone contact page |
| `/agents` | AI Agents (Intent Agent Models — M1/M2/M3) |
| `/private-ai` | Private AI infrastructure |
| `/automation` | Workflow automation (Claude Code + Cloud Functions + Vertex AI) |
| `/cloud` | Google Cloud services |
| `/resellers` | Distribution partner program |
| `/learn/security` | Vertex vs self-hosted comparison |
| `/learn/models` | Model-agnostic delivery |

## Content Guidelines

**Do**:
- Lead with Claude Code Systems as the primary service
- Emphasize "build + train" positioning and discovery-first engagement
- Reference 270+ plugins, 1,550+ GitHub stars, 1,537 agent skills as proof of capability
- All CTAs point to discovery call booking (calendar link), not pricing
- Offer flexible contact options (Discord, WhatsApp, LinkedIn, X, phone)
- Show tiered packages clearly

**Don't**:
- Bury Claude Code under other services
- Show public pricing (discovery-first model — all pricing is private)
- Require rigid form fields (let people choose their contact method)
- Over-emphasize secondary services on homepage

## Testing baseline (2026-05-01 — Intent Solutions Testing SOP)

This repo participates in the **Intent Solutions Testing SOP** per `~/.claude/CLAUDE.md` § "Intent Solutions Testing SOP" and the VPS-as-the-home program (`OPS-5nm`, Priority 6).

**Installed**: `@intentsolutions/audit-harness v0.1.0` vendored at `.audit-harness/` with wrapper at `scripts/audit-harness`.

**Commands**: `scripts/audit-harness {verify, init, list, escape-scan --staged}`.

**Next step**: run `/audit-tests` to produce `TEST_AUDIT.md`. See `000-docs/078-OD-SOPS-audit-harness-baseline-2026-05-01.md`.

**Upgrade**: `AUDIT_HARNESS_VERSION=vX.Y.Z curl -sSL https://raw.githubusercontent.com/jeremylongshore/audit-harness/main/install.sh | bash`. Or run `/sync-testing-harness` from any session.
