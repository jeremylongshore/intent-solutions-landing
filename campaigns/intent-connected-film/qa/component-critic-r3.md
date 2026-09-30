# Component critic — round 3

Verdict: REVISE. Reviewed only `renders/components-r3/landscape-8.mp4` and `portrait-8.mp4` against BRIEF, FACTS and the four requested kit references. No implementation inspected.

Both proofs are 2.500s, 75 frames, 30fps; landscape is 1920×1080 and portrait is 1080×1920. Independently decoded all frames, inspected 0.2s sheets, every 1/30s frame through 0.500s, native frames and first-letter detail crops through 0.667s. Evidence: `qa/component-r3-critic-evidence/`.

1. **HIGH — opening glyph clipping replaces the original border collision.** The initial “S” of “Services.” is visibly cut on its left from 0.000s through approximately 0.367s. The “O” of “Open source.” remains cut through 0.533s; it is fully rounded by 0.567–0.600s. This occurs in both formats. At frame 0 the landscape letters stop abruptly at x≈155–157, inside the orange frame at x≈112; portrait cutoffs are x≈118–125, inside the frame at x≈92. At 0.400s, the landscape “O” still ends in a hard vertical cutoff near x151 and portrait near x115. At 0.500s both O glyphs retain a flat left edge. These are visible fractions of letters, not a subtle antialiasing issue. **Prior finding: PARTLY fixed** — the orange border no longer cuts across the glyphs, but complete readable words are still absent during entry. Fix: keep each complete glyph inside the inset for its entire visible entrance; shorten the horizontal travel or use a whole-word fade/skew settle from an already contained position. Do not solve this by clipping the letters.

2. **LOW — late decorative clearance tightens.** At 2.467s the portrait lower grey divider extends to x≈996, beyond the orange right edge at x≈988. In landscape the lower-left orange bracket meets the outer frame and the first letters approach within about 8–12px of it. Typography remains complete. Preserve a little inset throughout the slow push and end the divider inside the frame. This is secondary to finding 1.

After roughly 0.600s the typography is clean, legible and well separated in both formats. No title/title collisions, blank frames, pops or additional clipped text were found. The landscape has confident typographic scale; portrait is recomposed with room above and below. Motion eases into readable rows, then continues with a slow push and travelling accent.

Freeze measurement: kit `frozen-time.sh`, 10fps, width 320, greyscale mean consecutive-frame difference threshold 0.35. Landscape: **0 near-frozen samples, ≈0.0s**. Portrait: **0 samples, ≈0.0s**. Neither proof contains audio, so loudness is not applicable. Full-film continuity and 60fps delivery remain outside this component review.

ONE MORE PASS
