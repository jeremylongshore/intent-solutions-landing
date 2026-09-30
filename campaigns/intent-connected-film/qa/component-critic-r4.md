# Component critic — round 4

**SHIP** — component 8 is ready for assembly in both formats.

Independently reviewed only `renders/components-r4/landscape-8.mp4` and `portrait-8.mp4`, BRIEF, the kit's quality bar and gauntlet, and the prior critic report. No implementation inspected. Each proof is 2.500s / 75 frames / 30fps, at 1920×1080 and 1080×1920 respectively.

Decoded every frame independently. Inspected 0.2s contact sheets, every 1/30s frame from 0–0.600s and 2.100–2.467s, native-resolution first/final frames, and unscaled boundary-detail strips. Evidence is in `qa/component-r4-critic-evidence/`; `pixel-measurements.json` records per-frame text bounds and clip SHA-256 hashes.

| Prior finding | Status | Native-pixel evidence |
|---|---|---|
| Clipped initial S/O and moving text crossing the orange border | **FIXED** | Complete S and O contours from frame 0 throughout entry. At 0s, landscape S/O begin at x227/232; portrait at x163/147. At 2.467s, the portrait O begins at x111, still about 16px inside the frame's inner edge. Products, punctuation, ascenders and descenders remain complete in both formats. |
| Portrait lower divider overruns right frame edge | **FIXED** | Final divider ends around x933, roughly 51px before the frame's inner edge near x984. No overrun in the dense closing window. |
| Landscape lower bracket approaches/meets outer frame | **STILL PRESENT — cosmetic** | The bracket joins the left frame near the end. This is an orange-on-orange decorative junction; no glyph is cut or crossed. Final text begins at x197 or farther right, about 82px inside the frame's inner edge. It does not warrant another component pass. |

No new text clipping, truncated meaningful strokes, text collisions, blank frames or visual pops were found. Frame 0 is complete and legible. The three rows remain clearly separated through their skew settle and slow push. Portrait is independently composed with room above and below. Divider and bracket motion stays clear of text.

Freeze measurement using the kit script (10fps, width 320, greyscale consecutive-frame mean difference threshold 0.35): **landscape 0 samples / ≈0.0s; portrait 0 samples / ≈0.0s**. Neither clip has audio. This approval covers the component proofs; full-film transitions, audio, CTA dwell and 60fps delivery still need their assembly review.

**SHIP**
