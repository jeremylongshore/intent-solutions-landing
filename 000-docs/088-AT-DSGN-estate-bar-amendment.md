# Estate bar: amendment to the brand family contract (084)

Date: 2026-09-19. Status: approved by the owner. Amends `084-AT-DSGN-brand-family-contract.md`; 084 is left unedited as the historical record.
Tracking: epic "Unify the Intent Solutions web estate brand architecture" (`bd_000-projects-dxtq`).

## Why

A live check on 2026-09-19 found the top network strip different on every property: five link sets and orders across six sites, no strip at all on Omarchy, and only the home page carrying it on Learn. The strips had been hand-synced on 2026-09-07 and 2026-09-13 and drifted again within days. There was no shared source and no test that failed on drift.

## What changes in 084

| 084 row | Was | Now |
|---|---|---|
| Network destinations: labels | Company, Labs, Evals, Demos, Learn, Omarchy | Intent Solutions, Labs, Evals, Demos, Learn, Omarchy, Tons of Skills, in that order |
| Network destinations: permitted variation | "Compact navigation may place the complete directory in a menu/footer" | None for the top strip. It is identical on every carrier. A site's own header, footer and menus are unaffected. |
| Tokens: permitted variation | Product-specific accents | Unchanged, and the accent of the current-property link is the only thing that may vary in the strip |
| Current location | "never color alone" | Unchanged. The strip uses accent color plus underline. |

Decisions taken by the owner on 2026-09-19: the seven-link set; "Omarchy" spelled out rather than "OMA"; self-hosted JetBrains Mono; one row that scrolls sideways on narrow screens; Tons of Skills is a destination but does not carry the strip.

## Source of truth

`estate-bar/` in this repository. It was placed here rather than in a new repository because this repo already owns the brand contract and a new repo does not meet the intent-os new-repository conditions (intent-os `000-docs/046` section 3.4). Consumers vendor the files and run `check_estate_bar.py` in CI; a scheduled live check in intent-os compares the six live strips to `links.json`.

## Scope per property

The strip goes on first-party public pages. Exempt: client and prospect one-off pages on Demos, the signed-in Learn classroom, and Omarchy's child-facing Beacon play page, redirect page and prebuilt app bundles.

## Not changed

Each property keeps its own header, palette, type and layout, as 084 requires. JeremyLongshore.com and Start AI Tools stay out of the strip.

## Unfinished at the time of writing

This record lands with the canonical files only. Each property adopts the strip in its own change: Demos, this site, Omarchy, Labs and Evals, then Learn (manual deploy on the VPS).
