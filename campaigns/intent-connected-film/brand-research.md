# Intent Solutions motion: source and brand notes

Verified 29 September 2026. Read-only research of the current landing source and public network pages. No source repositories, accounts, or publishing state changed.

The user’s film positioning is **an applied AI engineering company whose work produces services, products, open-source tools, evaluations, demonstrations, and practitioner learning**. The public sites support showing these as connected outputs of one engineering practice. This is broader than a consultancy film.

## Recommended on-screen copy

Every phrase below is seven words or fewer. The connecting language is proposed film copy, distinguished from existing published wording.

| Phrase | Basis and exact source |
|---|---|
| **Applied AI engineering.** | User-supplied positioning; supported by the company’s build-and-operate description at `/home/jeremy/000-projects/intent-solutions-landing/astro-site/src/pages/index.astro:74` and [company home](https://intentsolutions.io/). |
| **Services. Products. Open-source tools.** | User-supplied whole-company categories. Company work: `astro-site/src/pages/index.astro:74`; marketplace: `astro-site/src/pages/index.astro:22`; live [OMA](https://oma.intentsolutions.io/) shows public desktop tools and product projects; [Tons of Skills](https://tonsofskills.com/) identifies open-source agent tooling. |
| **The same work. Connected outputs.** | Proposed synthesis of the user’s central message. [Demos](https://demos.intentsolutions.io/) connects systems, Labs, Evals, Learn, OMA, and marketplace; [Labs](https://labs.intentsolutions.io/) explicitly connects its testing to Demos and Learn. |
| **Build. Test. Teach. Share.** | Proposed concise synthesis of the team’s roles at `astro-site/src/pages/index.astro:182`, published evaluations at `:8`, and public tooling at `:22`. |
| **Frame. Build. Prove. Operate.** | Existing method; `astro-site/src/pages/index.astro:37` and `/home/jeremy/000-projects/intent-solutions-landing/000-docs/084-AT-DSGN-brand-family-contract.md:9`. |
| **Request an outcome.** | Established primary action at `astro-site/src/pages/index.astro:78` and `astro-site/src/components/SiteNav.astro:20`. |
| **Intent Solutions** | Published brand name; `astro-site/src/components/SiteNav.astro:15`. |
| **intentsolutions.io** | End-card destination; owned company domain. |

Paths beginning `astro-site/` above are relative to `/home/jeremy/000-projects/intent-solutions-landing/`.

## Connected outputs to show

Use short name labels in a connected visual composition, with the same active path or work object visibly moving between them. The relationship is the film’s core; these should not feel like unrelated service cards.

| Label | Factual role | Source |
|---|---|---|
| **Labs** | Tests AI work and publishes inspectable results. | [Live Labs](https://labs.intentsolutions.io/); `astro-site/src/data/site-map.mjs:41` |
| **Evals** | Maintains versioned definitions for test results. | [Live Evals](https://evals.intentsolutions.io/); `astro-site/src/data/site-map.mjs:42` |
| **Demos** | Opens working systems and their supporting evidence. | [Live Demos](https://demos.intentsolutions.io/); `astro-site/src/data/site-map.mjs:40` |
| **Learn** | Teaches the shared engineering and evaluation method. | [Live Learn](https://learn.intentsolutions.io/); `astro-site/src/data/site-map.mjs:43` |
| **OMA** | Public Omarchy desktop tools, source, previews, and shipping status. | [Live OMA](https://oma.intentsolutions.io/); canonical navigation label is **Omarchy** at `astro-site/src/data/site-map.mjs:45`. Demos uses **OMA**. |
| **Marketplace** | Tons of Skills distributes open-source agent tooling. | [Live marketplace](https://tonsofskills.com/); `astro-site/src/pages/index.astro:22` and `astro-site/src/data/site-map.mjs:44` |

OMA’s current hero is “Omarchy plugins. Built in public.” It also presents The Beacon Wakes as a playable browser game project and BLUE GOLD as an active product build that is not ready for customer use. These support the company’s product dimension; do not imply all listed projects are ready to buy or production-proven. The public Demos page explicitly connects OMA, Learn, Labs, Evals, and Tons of Skills.

Public verification: company home, site map, marketplace, Labs, and Learn opened successfully in web tools. OMA, Demos, Evals, and Learn were independently retrieved over HTTPS with HTTP 200 and parsed on this date. No adoption, project, installation, performance, or customer counts are recommended for the film.

## Visual system and assets

Current authority: `/home/jeremy/000-projects/intent-solutions-landing/CLAUDE.md` and `/home/jeremy/000-projects/intent-solutions-landing/000-docs/084-AT-DSGN-brand-family-contract.md`. Preserve the orange branching-arrow mark, charcoal surfaces, Syne display type, and Inter supporting type.

| Use | Value / file |
|---|---|
| Main background | `#09090B` (current home background); alternate charcoal `#18181B` |
| Raised neutral | `#27272A` |
| Primary foreground | `#FAFAFA` |
| Secondary foreground | `#D4D4D8`; muted `#A1A1AA` |
| Brand orange | `#F97316`; brighter orange `#FB923C`; darker orange `#EA580C` |
| Navigation wordmark accent | `#FF7A1A` in current `SiteNav.astro:83` |
| Display font | **Syne**, weights 400–800; prefer 700/800 for film titles |
| Supporting font | **Inter**, weights 400–900; prefer 500/600 for labels |
| Typography authority | `astro-site/src/layouts/Layout.astro:66`; `astro-site/src/styles/global.css:44`; current wordmark `astro-site/src/components/SiteNav.astro:76` |
| Palette authority | `astro-site/src/styles/global.css:16`; current home background `astro-site/src/pages/index.astro:215` |
| Raster mark | `/home/jeremy/000-projects/intent-solutions-landing/astro-site/public/images/logo-mark.png` — 311×310 RGBA, inspected visually: orange dimensional branching arrow on a dark square with faint orbital lines. Do not assume a clean transparent cutout. |
| Crisp vector identity | `/home/jeremy/000-projects/intent-solutions-landing/astro-site/public/favicon.svg` — owned flat branching-arrow geometry on charcoal. Suitable source geometry for a large motion mark. |
| Social composition reference | `/home/jeremy/000-projects/intent-solutions-landing/astro-site/public/og-image.svg` — vector orange mark and company wordmark. Its Arial text is an export fallback, not the display-font authority. |
| Optional existing scene support | `/home/jeremy/000-projects/intent-solutions-landing/astro-site/public/images/logo-podium.png` — 440×150; not needed for the connected-work concept. |

The site loads the font families from Google Fonts in `Layout.astro:66`; no local font assets were found in the landing public directory.

## End card

**Intent Solutions** / **Applied AI engineering.** / **intentsolutions.io**

The primary business CTA is **Request an outcome**, linked to [the existing request form](https://intentsolutions.io/contact/?door=outcome). A film centered on the company’s whole practice can keep the visible URL short and use this request URL in its surrounding player or description.
