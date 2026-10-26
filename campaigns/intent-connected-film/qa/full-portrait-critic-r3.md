# Full-film portrait critic — R3

**SHIP.** Both required R2 category-handoff repairs work. The orange evidence survives the package exit and becomes a divider; the company mark now occupies the category exit. Neither repair reintroduces the former text collisions. Remaining concerns are minor.

Reviewed immutable `deliverables/intent-solutions-portrait-1080p60.mp4`: **30.000s, 1080×1920, 60fps, 1,800 frames**, stereo AAC/48kHz. SHA-256: `9cab6a851633b2387c35bf53530697c4855584a3bdb3c59bd785def076bb16e3`. Primary and both companion files were stable before decoding and unchanged at completion. Extracted H.264 bitstreams match across all three. Manifests: `qa/full-portrait-r3-evidence/`.

**Method and limits:** independently decoded all 1,800 frames; extracted **150 overview samples at 0.2s**, **25 frames at 1/30s across ±0.4s of all eleven boundaries**, exact boundary−1/boundary/boundary+1 frames, targeted 60fps category swaps, and **71 native frames**: **411 unique sampled frames** overall. Inspected every overview and transition sheet, all exact-boundary detail triplets, selected native frames, prior/new comparisons, and the 360px-wide opening/CTA sheet. Visual findings remain sampled, not exhaustive certification of every native frame. No implementation inspected or media edited. References were the supplied written kit, brief, facts and storyboard; no reference films watched. **No realtime playback or human-listening claim.**

## Prior findings verified

| R2 finding | Status and evidence |
|---|---|
| Hollow package → categories, 20.000–20.333s | **FIXED.** Three evidence bars survive 20.000s, stretch into the first divider, and persist until category typography arrives. `transition-20.0.jpg`, `prior-vs-r3.jpg`. |
| Hollow category → network, 22.200–22.483s | **FIXED.** Mark appears at 22.200s after the words disappear and carries through 22.500s. Adjacent 60fps samples show no text/mark overlap. `new-handoff-60fps.jpg`. |
| Workflow labels crossed at 2.500/2.533s | **FIXED.** Labels enter after frame clearance; sampled former collision frames remain clean. |
| Frame crosses Services/Open source, 22.433–22.467s | **FIXED.** Words leave first; the mark supplies continuity. |
| Component clipping, divider overrun, headline collisions, initialization resets, foreground layering | **FIXED for prior readability failures.** No clipped glyph, headline splice or foreground disappearance found. Cosmetic shape intersections remain, below. |
| Evidence handoffs | **FIXED / RETAINED.** Orange bars remain visible in adjacent frames at 10, 12.5, 15 and 17.5s. |
| Finished logo merely surrounded by network | **FIXED / RETAINED.** Network strokes change position and thickness at 24.700–25.167s to construct the final mark; formation survives the exact 25s boundary. |
| Audio level/range | **FIXED / RETAINED.** All final AAC measurements pass below. |
| Small disclosure/platform exposure | **STILL PRESENT — low.** Disclosure is approximately 8px high at 360px width, near native y1680. Actual platform overlays were not supplied or tested. |
| Settling/freeze | **FIXED to target.** 1.0s aggregate; longest detected run 0.1s. |

## Measurements

Exact kit `frozen-time.sh`, default threshold **0.35**, 10fps/320px grayscale: **ten isolated samples = 1.0s**, at **2.8, 4.8, 5.3, 7.3, 10.3, 12.8, 14.8, 22.8, 25.3, 27.8s**. No sampled run approaches 0.6s. This measures low frame differences, not literal stillness.

| Final AAC | Integrated | LRA | True peak |
|---|---:|---:|---:|
| Primary | −15.9 LUFS | 2.6 LU | −3.9 dBFS |
| Music-only | −15.9 LUFS | 2.6 LU | −3.8 dBFS |
| Alternate | −16.0 LUFS | 2.5 LU | −3.1 dBFS |

Final-second RMS is −19.35dBFS primary/music and −20.72dBFS alternate: energy continues into the ending. Independent 50ms windowed FFT comparisons find maximum final/music lifts of **7.56dB at 7.5s in 250–2000Hz**, and **1.17dB in 2–8kHz**. These broad-band power measurements do not certify the kit’s isolated-effect own-band peak target or subjective musical fit.

## Scene assessment

Empty percentages estimate unused usable central field, excluding platform margins; trims are optional editorial judgments.

| Time | Content | Empty | Trim |
|---|---|---:|---:|
| 0–2.5 | Finished name/category/logo | 30% | 0s |
| 2.5–5 | Causal build workflow | 25% | 0s |
| 5–7.5 | Outcome selection | 40% | 0.2s |
| 7.5–10 | Evaluation/evidence | 25% | 0s |
| 10–12.5 | Demos | 25% | 0s |
| 12.5–15 | Learn loop | 25% | 0s |
| 15–17.5 | OMA surface | 30% | 0s |
| 17.5–20 | Reusable package | 35% | 0s |
| 20–22.5 | Services/products/open source | 15% | 0s |
| 22.5–25 | Connected company | 25% | 0s |
| 25–27.5 | Network becomes mark | 35% | 0.2s |
| 27.5–30 | Clear CTA/URL | 35% | 0s |

No new blocking defect. Ranked optional polish: **(1)** enlarge/raise the disclosure; **(2)** remove brief shape-only grazes—the frame intersects the lower-left workflow node at 2.500–2.517s, and category corners/dividers cross the shrinking frame near 22.45–22.483s; **(3)** tighten the large title/actor gap in the outcome beat. These do not obstruct the business message.

Muted comprehension passes: applied AI engineering with connected services, products, open source, evidence, demos, education and reusable tools. OMA/Learn/Demos/Tons of Skills belong to the shared work. Frame zero is finished. CTA and URL are comfortably readable by 28s, giving approximately two seconds at phone scale. The persistent evidence and branch formation supply the strongest mechanisms; equal 2.5s sections remain regular. No informative need for 3D.

**SHIP**
