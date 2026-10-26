# Component critic — round 2

**ONE MORE PASS. One remaining component blocker: scene 8’s entrance crosses its frame in both formats.**

Reviewed all **24 immutable labs**, landscape/portrait 0–11, in `renders/components-r2-final/`: 1920×1080 / 1080×1920, 30fps, 2.5s each. Independently verified every SHA256 against `MANIFEST.json`. Evidence and exact reviewed hashes: `qa/component-review-r2/`. No builder source read. Earlier source stills were preflight evidence; the verdict uses these immutable clips.

**Method:** independently extracted native frames every 0.2s throughout every lab; dense native 1/30s windows at 0–0.433s and 2.067–2.467s; inspected contact sheets and native details. Freeze scan: 320px-wide grayscale, 10fps, consecutive mean absolute difference <0.35.

**R1 verification**

- **1 — Readability: FIXED.** Landscape 11’s URL has its own unobstructed row, readable from approximately 0.3s through 2.467s. Landscape 8’s Products/Open source remain inside the canvas and separate from the disclosure throughout the samples.
- **2 — Headline/frame collisions: FIXED at the cited locations.** Landscape 0/1/5/7 have distinct headline and actor regions throughout 0–2.467s. Landscape 10’s closing line is fully in frame. A different scene-8 entrance collision remains below.
- **3 — Initialization resets: FIXED.** Landscape 4’s backing grows continuously; landscape 6 no longer appears complete and collapses at 0.1s, nor resets its chevron at 0.3s. Dense opening samples verify both.
- **4 — Layering: FIXED.** Landscape 11’s ambient curve stays behind readable glyphs; portrait 4’s completed code surface occludes the curve. Faint paths through dark surrounding panels do not obstruct information.
- **5 — Prolonged settling: FIXED.** Landscape: **0.1s/30s** near-frozen; portrait: **0.2s/30s**. Longest measured run: **0.1s**. Component reveal, framing movement and departure remain perceptible.
- **6 — Registered transformations: PARTLY / assembly verification pending.** The evidence-bar identity recurs through scenes 3–7; scene 9’s network contracts at 2.3–2.467s. These isolated labs cannot verify the 3→4→5 or 9→10 handoffs. Scene 10 alone shows an already-complete logo with retracting rays. This is a full-film review question, not an additional component blocker.

**Required fix — medium severity.** In landscape 8, Services crosses the orange left border at approximately x112 during 0–0.267s; Open source crosses it through approximately 0.4s. Portrait 8 repeats this near x92. Keep both entrance positions inset from the frame, or reveal the frame after the words clear it. Settled layouts are readable. Evidence: both `labs/*-8/dense.jpg` and native opening samples.

The early portrait-5 Test/loop collision is **FIXED** in the final clip. The components speak a consistent Intent visual language. For assembly review, explicitly inspect the carried bars/logos at cut boundaries: several are absent at local 0.000s and present at 0.033s. No audio, seek determinism, or complete-film certification is implied.

**ONE MORE PASS**
