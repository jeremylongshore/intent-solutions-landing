# Intent Solutions website

This is the active Astro application for [intentsolutions.io](https://intentsolutions.io).
Intent Solutions is an applied AI engineering company: its services, products, research,
education and reusable tools connect around reliable production work. The primary customer
action is **Request an outcome**. Practitioner access lives at
[Learn](https://learn.intentsolutions.io/).

Read the repository [agent workflow](../AGENTS.md), [orientation](../CLAUDE.md),
[brand contract](../000-docs/084-AT-DSGN-brand-family-contract.md) and
[current route map](../000-docs/085-AT-ARCH-site-map.md) before changing the site.
Older IAM packages, Netlify deployment instructions and historical performance claims
are not current operating authority. Release history is maintained in the
[root changelog](../CHANGELOG.md); the application package version is not the estate release number.

## Development

Run these commands from `astro-site/`. CI uses the committed npm lockfile.

```bash
npm ci
npm run dev
npm run build
npm run preview
```

The application uses Astro, React islands and Tailwind. Preserve the existing charcoal/navy
surfaces, orange branching-arrow identity, Syne display and Inter body typography.
The contact form is an interactive island; core company content is static HTML.

## Estate and teaching sources

| Public surface | Implementation |
| --- | --- |
| [Estate](https://intentsolutions.io/estate/) | `src/pages/estate.astro` |
| [Operating blueprint](https://intentsolutions.io/estate-blueprint.html) | `src/data/operating-atlas.mjs`, `scripts/build-estate-blueprint.mjs` |
| [Financial atlas](https://intentsolutions.io/estate/economics/) | `src/pages/estate/economics/`, `src/data/economics-teaching.mjs` |
| Fictional case ledgers | `src/data/estate-economics-cases.mjs` |
| Institutional model and public citations | `src/data/network-economy.mjs`, `src/data/economics-research.mjs` |
| Financial figures and standalone downloads | `src/diagrams/economics-charts.mjs`, `scripts/build-financial-diagrams.mjs` |

The [financial atlas record](../000-docs/089-AT-DSGN-financial-atlas.md) documents the
Cathryn Lavery Diagram Design pin, eleven chapters, baseline/downside examples, release
checks and completed private presenter delivery. Preserve the distinction between proposed
arrangements, fictional examples and actual business results. Private source research,
presenter files and email receipts belong outside this public repository.

`npm run build` first synchronizes the canonical estate bar and regenerates the blueprint
and financial downloads. Change their source data/renderers, not generated HTML or hashes.
The shared network strip is maintained in the root `estate-bar/` directory.

## Verification

The deployment workflow is the executable release authority. Its deterministic checks include:

```bash
npm run test:economics
npm run build
npm run audit:indexability
npm run audit:site-map
npm run audit:estate-bar
```

It also runs the intercepted browser journeys in `scripts/test-brand-polish.py` and
`scripts/test-economics-browser.mjs` against a local preview. These require the browser
runtime configured by the workflow; financial checks use its `ECONOMICS_CHROME` executable.
Do not use real customer submissions for verification. Root and application README-only
changes do not require inventing new tests.

## Deployment and operating boundary

Production is a static Caddy site on the Intent VPS. The repository
[deployment workflow](../.github/workflows/deploy-vps.yml) runs its gate, then the reusable
VPS deploy workflow performs the authorized update. Application-path changes on `main`,
including this README, trigger that workflow. Verify its result rather than inferring a
deployment from a commit. The secondary Hugging Face mirror has a separate workflow and
failure state; its known PDF/LFS issue does not establish failure of the canonical VPS site.

Marketing forms use the existing VPS forms API. Their detailed operating contract belongs
in [CLAUDE.md](../CLAUDE.md) and the operations runbooks. Website documentation or diagram
publication does not authorize new offers, pricing promises, legal terms or data collection.
