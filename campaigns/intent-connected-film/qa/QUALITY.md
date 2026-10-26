# Final delivery measurements

Film: Intent Solutions — One Connected Company. Final R3, 30 seconds, independently composed at 1920×1080 and 1080×1920, 60 frames/second. Six synchronized MP4 exports: primary picture mix, music-only picture, alternate-music picture for each format. `delivery-metadata.json` identifies exact delivered media; `source-sha256.json` identifies the composition.

| Check | Result | Evidence and limits |
|---|---|---|
| Delivery format | 30s, 1,800 frames, H.264/yuv420p, AAC stereo48kHz, fast-start | `delivery-metadata.json`; all six encodes inspected. Picture is byte-identical across audio choices within each format; matching audio choice is identical across formats. |
| Near-frozen screen | Landscape0.7s; portrait1.0s; longest stretch0.1s in both | Exact pinned kit `frozen-time.sh`, FFmpeg10fps, grayscale320px, mean-difference threshold0.35. Both meet the requested approximately1s/30s and maximum0.5s hold. |
| Every-frame numeric scan | 1,800 frames/format | `landscape-motion.csv`, `portrait-motion.csv`: per-frame mean luminance, edge detail and change at320px. These are screening metrics, not native-resolution aesthetic judgments. |
| Settled text contrast | Minimum7.098:1 among palette pairs | `contrast.json`; exceeds4.5:1. Transitional fades excluded as specified by the kit. Independent visual review checks actual rendered legibility; palette math alone does not certify every antialiased pixel. |
| Text bounds, overlap and approved copy | Zero errors over3,600 timeline frames | `dom-and-determinism.json`; checks actual text ranges at≥0.9 effective opacity, viewport bounds, text/text intersections and the facts allowlist. Moving frame/graphic intersections are separately reviewed in dense rendered samples. |
| Seek consistency | Identical pixels at five repeated timestamps/format, reached in different orders | `dom-and-determinism.json`; includes both revised20.3/22.3s handoffs. Representative sampled determinism, not every possible seek permutation. No timers, real-time physics, unseeded randomness or runtime asset requests. |
| Primary audio | Approximately−15.9LUFS,2.6LU LRA,−3.9dBFS true peak in final AAC | Independent full-film reviews; calm-score target≈−16LUFS,1.5–3LU LRA, peak≤−1. No clipping. No human listening certification. |
| Effects relative to music | Isolated SFX peak below concurrent music peak: max−14.52dB primary,−11.88dB alternate | `audio-revision.json` and `audio-revision.md`; user’s stricter effects-below-music rule overrides kit's suggested effect lift. Source event measurements and encoded mixture band comparisons are distinct. |
| Beat alignment | Eleven transitions at2.5s intervals on120BPM grid | Scene timing and audio event records. Whoosh energy is aligned to handoff centers; transitions overlap beats as intentional motion. |
| Renderer | Pinned HyperFrames0.8.95, GSAP3.15.0, strict render completed | `hyperframes-lint.json`; 5-second1080p60 renderer proof completed before full construction. Kit supplies workflow/lab contracts, but no renderer implementation; HyperFrames captures the timeline frame by frame. |
| Brand and factual boundary | Actual logo geometry, local Syne/Inter, charcoal/orange palette; approved on-screen copy | `FACTS.json`, `brand-research.md`, `assets/asset-manifest.json`. Diagrams marked “Illustrated workflow”; no customer results, metrics, testimonials or certifications invented. No3D or generated footage used. |
| Licensing | Synchronized web/social video; source recordings and isolated stems excluded from public bundle | `assets/AUDIO-LICENSES.md`, `assets/VISUAL-LICENSES.md`. Music-only deliverables are videos, not standalone music recordings. |

## Independent visual review

**Final verdict: SHIP in both formats**, from separate fresh reviewers. Required issues from prior rounds are fixed; optional cosmetic observations are recorded rather than presented as absent.

Storyboard and all24 component proofs were reviewed independently before assembly. Subsequent fresh full-film critics inspect contact sheets every0.2s, dense1/30s samples around all11 transitions, native detail frames and60fps boundary samples. See `CRITIC-LEDGER.md` and final `full-landscape-critic-r3.md` / `full-portrait-critic-r3.md` for exact verdicts and optional cosmetic observations. Frame zero, text collisions, empty handoffs, continuing artifacts, company story on mute and phone-scale CTA are visual judgments, not inferred from syntax or encoding success.

No external reference videos were supplied. The benchmark used the kit's written motion grammar and launch-film notes; no claim of a measured side-by-side comparison with those films is made.

## Measurement sensitivity

`landscape-motion.json` and `portrait-motion.json` retain a second diagnostic that samples frames0,6,12,… rather than FFmpeg's10fps filter phase. It reports1.2s and1.3s respectively, with the same0.1s longest interval. Near-threshold single-sample counts depend on sampling phase. Acceptance follows the exact user-requested pinned kit; the alternate measurements are retained, and no threshold was relaxed to obtain a pass. This does not establish literal visual stillness at every flagged sample.

## Human handoff

Watch once on a phone and listen once on ordinary speakers/headphones before publication. Automated loudness and visual review do not establish personal taste, perceived SFX softness, or platform-specific UI/caption overlay clearance. The video communicates without narration and includes visible CTA/domain; no YouTube upload or production website deployment is part of this delivery.
