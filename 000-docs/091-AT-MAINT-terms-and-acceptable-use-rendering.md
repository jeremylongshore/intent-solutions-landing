# Terms and acceptable use rendering repair

Recorded October 24, 2026. Tracker: `bd_000-projects-dxtq.22.3`. Precedent and method:
[090 privacy policy rendering repair](090-AT-MAINT-privacy-policy-rendering.md).

## Finding and authority

`/terms/` and `/acceptable-use/` returned a heading and an empty GetTerms embed in the HTTP
response; the body appeared only after the GetTerms script ran in a JavaScript-enabled
browser. Crawlers, no-JS readers and anyone with the policy CDN blocked saw no policy. The
three legal pages also used "- intent solutions io" titles and shared the site-wide default
description. This was an availability problem, not missing published content.

Published authority, captured from the live pages after rendering
(`.getterms-document-embed`, document ids `terms-of-service` and `acceptable-use`, account
`wH2cn`):

- <https://intentsolutions.io/terms/>: "Terms and Conditions", last updated September 12, 2026.
- <https://intentsolutions.io/acceptable-use/>: "Acceptable Use Policy", last reviewed
  September 12, 2026.

All wording and dates are unchanged. The duplicate embedded H1, the outer wrapper and the
empty framework comments were removed, each block was put on its own line and lines were
wrapped at 110 columns. The page H1s ("Terms of Service", "Acceptable Use Policy") are the
headings the pages already published.

| Document | Captured rendered HTML SHA256 | Static source SHA256 | Words |
|---|---|---|---|
| Terms | `2ece351903cc08a66dbc3b067767f300ddadeae931ffa95acbd730b3d5dacd7e` | `b87d33746ef6aa9fb222a848cf31a2fa3414b6499124b272642a229f335e977b` | 3,536 |
| Acceptable use | `520bc209ace84a8dd1b48bf6774eac2718195359e386507dc31e71b1e8a4a4d4` | `bae83c59628e86c32986e395d7829217ac509e7ac7dee699d01cfacce3709704` | 1,186 |

Browser-test body digests (whitespace-normalized article text):
terms `ef4ac4d3fac83a81da68fef86b6a235699a0401afaa241d74d05295d4609b3ed`,
acceptable use `98e66e44d5c9f0a9cb1fa8b162de924df2ba7a78b728df750b0cf0d5c533ab44`.
The privacy digest stays `7129d3d98dc26a17c3018837be7d8e1b504ddb07d67fcd0a53f4ecaea0d7da08`.

The static sources are `astro-site/src/content/legal/terms-of-service.html` and
`acceptable-use-policy.html`, rendered by `src/components/LegalDocument.astro`, which the
privacy page now shares. The pages no longer follow GetTerms edits automatically; an approved
policy change updates the source file and its digest in `scripts/test-brand-polish.py`
together.

## Method check

The capture method was proven on the policy captured earlier. Rendering the GetTerms privacy
embed through the same script on October 24 produced text identical, word for word (2,769
words), to the October 17 static privacy source. GetTerms had not changed it, and the method
reproduces a published document exactly. The terms and acceptable use static files were then
compared with their renders the same way: identical, 3,536 and 1,186 words.

## Scope and evidence limits

This republishes existing text. It is not a legal review and authors no new commitment. Two
observations against the company record (`intent-os/business-plan/company-details.md`) are
left for that review, not edited here:

- The terms name the company "Intent solutions io llc ... trading as intent solutions io";
  the canonical name is "intentsolutions.io LLC". The Delaware registration in the terms
  matches the record.
- The documents carry an effective date of July 6, 2025, before the recorded formation date
  of September 11, 2025.

Both are tracked in Beads as a follow-up under `bd_000-projects-dxtq.22`.

## Verification

`scripts/test-brand-polish.py` checks each of the three policies at 320, 390 and 1440 pixels
with JavaScript disabled and enabled while every GetTerms request is blocked: HTTP 200, one
H1, the final heading, the exact body digest, no GetTerms script or iframe, no horizontal
overflow, and 200% text reflow. A planted one-word change to the built terms page fails it
with `('/terms/', 'published text changed')`. Build, indexability (now 31 unique titles) and
site-map audits remain required.

## Addendum: company name and dates (October 25, 2026)

Closes the two observations above, on the owner's instruction to decide them.

- **Name.** All three policies now use the canonical presentation `intentsolutions.io LLC`
  (first mention in the terms: "intentsolutions.io LLC (...), a Delaware limited liability
  company") and `intentsolutions.io` where the text said "intent solutions io". The company
  record states that this presentation does not change a document's substantive terms. The
  "trading as" clause was dropped because the trading name is now the same string.
- **Date.** Only the privacy policy carried the July 6, 2025 effective date; the terms and
  acceptable use policy carry only a last-updated or last-reviewed date. A policy cannot have
  been in effect for the LLC before its formation on September 11, 2025, so the privacy
  policy is now effective as of this revision, October 25, 2026. All three documents and their
  page descriptions are dated October 25, 2026.

No other wording changed. New body digests: privacy
`5636f7547429619aaeaed7db4e3d2cebeb28e43c44de776a9f57c80313ec9065` (2,769 words), terms
`f15df6bd6008172777a3efba59f2d6a1e5e361e581f5c381f5ee064bb1d36069` (3,525 words, 11 fewer:
the name and clause change), acceptable use
`5fba5b61efb99d92f68a7dbf3c5e1ad986a58903f08bc4a9c15dbc4f1d020514` (1,174 words, 12 fewer:
six three-word names became one word). The GetTerms account still holds the old text; it no
longer feeds the site. This remains a presentation correction, not a legal review.
