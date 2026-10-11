# Intent Solutions operating atlas

Eight linked company-architecture views, published through the existing company
site at `/estate/`. Each chapter is a self-contained HTML artifact with HTML node
cards, accessible SVG relationships, source boundaries, explanations and a text
alternative. `.arch/` links to the skill outputs.

## Content and authority

- `../data/atlas-foundation.mjs`: company functions, asset loop, operating spine,
  evaluation architecture.
- `../data/atlas-delivery.mjs`: the declared delivery method and its handoffs.
- `../data/atlas-network.mjs`: practice entry, proposed commercial network,
  principles and unresolved operating choices.
- `../data/operating-atlas.mjs`: chapter order and URL contract.

Public sources establish the referenced properties and bounded capabilities.
The owner supplied the commercial vision. A drawn relationship is a documented
responsibility or intended flow; it does not imply a deployed automated
integration. Do not convert proposed models, credentials, membership or adoption
into claims of available capacity, revenue or completed contracts. Personal names,
private economics and internal access details do not belong in this public atlas.

## Generate and inspect

From `astro-site`, `bun run build` regenerates HTML, exact node/edge Mermaid
exports, the complete graph and a content-hash manifest before building Astro.
The source graph uses the diagram skill's structural fields plus page-level
content. `relationship` preserves business-flow semantics; `kind: unknown`
explicitly avoids inventing a network protocol. The skill fingerprint is local
state; the public manifest also detects content/status/provenance changes.

From the repository root:

```sh
python3 scripts/check-operating-atlas.py --browser-path /usr/bin/chromium-browser
python3 scripts/export-operating-atlas.py --browser-path /usr/bin/chromium-browser
```

The browser path is optional where Playwright has a bundled browser. Geometry
checks run the eight chapters at three desktop widths and inspect content bounds,
node collisions, non-endpoint edge crossings, ARIA references and containment of
horizontal scrolling. Review the screenshots as well: those measurements cannot
certify the claims, visual hierarchy or every label collision. The main `/estate/`
page remains responsive; the detailed drawings intentionally use a wide stage.

Export the PDF after changing chapter content. It is a committed distribution
artifact rather than a Chromium dependency in every site build. Confirm eight
pages and inspect the result before committing it. Run the site's indexability,
site-map and estate-bar audits after the build. Every standalone HTML, including
the print edition, must retain the canonical estate bar.
