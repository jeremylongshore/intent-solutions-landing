# Contributing

This repository is the source for [intentsolutions.io](https://intentsolutions.io)
— the Intent Solutions marketing site. It's primarily authored and
maintained by Jeremy Longshore, but external contributions are welcome
for bug fixes, typo corrections, broken links, accessibility
improvements, and SEO/performance issues.

## Quick start

```bash
git clone https://github.com/jeremylongshore/intent-solutions-landing.git
cd intent-solutions-landing/astro-site
bun install
bun run dev          # localhost:4321
bun run build        # production build → dist/
bun run audit:indexability   # SEO regression guard
```

Project conventions live in `CLAUDE.md` (root) and `astro-site/CLAUDE.md`
— read those first.

## What's a good PR here

- ✅ Typo / grammar / link fixes in `astro-site/src/`
- ✅ Accessibility improvements (semantic HTML, contrast, focus order)
- ✅ SEO fixes that pass `bun run audit:indexability`
- ✅ Field-note corrections (factual errors, broken code snippets)
- ✅ Small Tailwind / styling polish that matches the existing design system

## What needs prior discussion

- Anything that changes the IA (page list, nav structure, routing)
- New service offerings or copy changes to existing offerings
- Pricing changes (we don't show public pricing — discovery-first model)
- Reintroducing GCP / Firebase dependencies (this site is fully
  self-hosted on the Intent Solutions VPS as of 2026-06-10; don't add
  those back)

Open an issue first for these — saves you the rebase cost if the
direction doesn't fit.

## Pre-flight checklist

Every PR has to pass these gates before merge:

- `bun run build` — clean Astro build
- `bun run audit:indexability` — sitemap / canonical / title / 404 regression guard
- HTML line-length cap < 50000 chars in `dist/index.html`
- Internal links use the trailing-slash form (`/contact/`, not `/contact`)
- Field-notes cross-posted to startaitools.com use
  `canonical: https://startaitools.com/...` in their frontmatter (this
  excludes them from the sitemap automatically)

CI runs the same checks on every PR via `.github/workflows/deploy-vps.yml`.

## Security

For vulnerability reports, see `SECURITY.md` — do **not** open a public
issue.

## Behaviour

See `CODE_OF_CONDUCT.md`.

## Attribution

PR descriptions and commits should sign off as the author. Don't add
"Co-Authored-By" tags for AI tools; the human contributor is the author
of record.
