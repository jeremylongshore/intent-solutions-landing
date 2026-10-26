# Full-film portrait critic — R1

**ONE MORE PASS.** The company story, carried evidence, mark continuity and CTA work. Two short assembly collisions and the audio dynamics miss the supplied bar.

Reviewed `deliverables/intent-solutions-portrait-1080p60.mp4`: 30.000s, 1080×1920, 60fps, 1,800 frames; stereo AAC/48kHz. SHA-256: `8b578944e1e92f6b61c16ef1abff0af9086ca065ec93537db358c103b881316a`. The music-only hash is in `full-portrait-r1-evidence/hashes.json`. Both hashes were unchanged at review completion. No implementation read or edited.

**Method:** independently extracted 150 samples at 0.2s intervals, 1/30s sampling across ±0.4s of all eleven 2.5s boundaries, plus each boundary's immediately preceding/following 60fps frame: 399 unique overview/transition samples. Inspected 53 native frames, including frame 0, frame 1799 and additional 60fps collision details. All eleven dense sheets were viewed. Visual conclusions are sampled; measurements are named separately. **No human listening or realtime playback certification.** Evidence: `qa/full-portrait-r1-evidence/`.

## Ranked findings and fixes

1. **MEDIUM — audio, 0–30s.** Independent ebur128: **−17.0 LUFS, LRA 0.9 LU, true peak −5.3 dBFS**. Music-only: −17.0 LUFS / 0.9 LU / −5.4 dBFS. Peak headroom passes; dynamics fall below even the kit's calm 1.5–3 LU range, and level is below its approximately −16 LUFS calm target. Revise the musical envelope/arrangement to create contrast, then target the selected loudness profile; raising gain alone will not fix LRA. In 50ms comparisons, maximum final-versus-music lift was 1.02dB broadband and 2.73dB in 2–8kHz. These broad measurements are not each effect's own-band certification. Larger lifts cluster near cut times; no 10dB treble spike was measured. Music retains energy into the final second. Musical fit and harshness still require listening.

2. **MEDIUM — frame/text collisions during assembly.** At **2.500s**, the moving left frame edge hides the first letter of “Inputs” around x170/y815. At **2.533s**, the bottom edge crosses “Result” around y1220; the label is clear by approximately 2.567s. At **22.433–22.467s**, the contracting frame crosses the O of “Open source”; **22.450s** also crosses the top of “Services.” These are visible fading glyphs, despite clean settled layouts. Delay the workflow-label reveal until the frame clears them, and finish category-text exit before frame contraction reaches it. Native evidence: `native-003.png`, `detail-native-03.png`, `detail-native-10.png` through `detail-native-12.png`.

3. **LOW — small secondary copy / brief hollow transition.** The disclosure sits near y1680, approximately 8px type at a 360px-wide presentation, making it weaker than the main hierarchy and vulnerable to lower platform captions. Main messages and CTA have ample top/bottom room; no actual platform overlay was supplied or tested. At 20.000–20.017s only the persistent frame/brand remain before category type appears. This two-frame hollow interior is cosmetic, not a prolonged empty hold.

## Scene assessment

Empty-space estimates below concern unused space *inside the central usable field*, exclude intentionally reserved platform margins, and are visual estimates rather than pixel statistics. “Trim” is optional editorial capacity, not a required cut.

| Time | Screen/business job | Empty | Trim | Assessment |
|---|---|---:|---:|---|
| 0–2.5 | Mark; Applied AI engineering | 30% | 0s | Finished first frame; category immediate |
| 2.5–5 | Inputs → Work → Result | 25% | 0s | Clear cause/effect; entry collision above |
| 5–7.5 | Selected Outcome enlarges | 40% | 0.2s | Biggest title/actor gap; meaning clear |
| 7.5–10 | Outcome / Constraints / Evidence | 25% | 0s | Truthful labelled schematic |
| 10–12.5 | Demos, code and evidence | 25% | 0s | Same evidence anchors new surface |
| 12.5–15 | Learn loop | 25% | 0s | Loop completes; labels stay separate |
| 15–17.5 | OMA desktop surface | 30% | 0s | Purposeful construction, no reset |
| 17.5–20 | Tons of Skills package | 35% | 0s | Reuse follows from carried artifact |
| 20–22.5 | Services / Products / Open source | 15% | 0s | Strong scale change; exit collision |
| 22.5–25 | Connected company diagram | 25% | 0s | All properties visibly belong to Intent |
| 25–27.5 | Mark; Built. Tested. Shared. | 35% | 0.2s | Coherent consolidation, somewhat familiar |
| 27.5–30 | Request an outcome; URL | 35% | 0s | Both clear by ~27.8s: ~2.2s dwell |

## Prior findings and continuity

- **R1/R2 readability, initialization, layering and settling: FIXED in portrait samples.** No repeat collapse/reset, headline overlap or foreground-obscuring ambient path. Kit freeze scan (10fps, 320px grayscale, mean delta <0.35): **0 samples / 0.0s**.
- **R2–R4 scene-8 entrance clipping/divider overrun: FIXED.** Full glyphs and contained divider during entry/settling. The later assembly exit collision is a separate regression.
- **Evidence handoffs 3→7: FIXED/VERIFIED at boundaries.** The three-bar artifact survives 10, 12.5, 15 and 17.5s, including native boundary−1/boundary/boundary+1 frames; no sampled disappearance.
- **Actual mark 9→11: FIXED/VERIFIED at 25 and 27.5s**, including adjacent native frames. Network contracts into the existing mark; mark moves to the end card. No sampled blank-mark frame. This is continuity, not literal network-branch morphing.

On mute this reads as one applied AI engineering company whose building, testing, demos, teaching and reusable tools reinforce each other. The single next action is unmistakable. Flat diagrams supply the needed information; 3D would add no explanatory value.

**ONE MORE PASS — fix audio dynamics/level and the two frame-clearance windows; preserve the successful handoffs and CTA.**
