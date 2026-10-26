# Audio report — Intent Solutions / 30 seconds

Current revision: section dynamics, 2026-09-30. Exact before/after evidence: [audio-revision.md](audio-revision.md) and `audio-revision.json`. Original report and WAVs are preserved privately in `assets/audio/older-versions/2026-09-29-before-section-shaping/`.

## Delivery

All delivery WAVs are 30.000 seconds, 48 kHz, stereo, 24-bit PCM (1,440,000 samples/channel). The primary edit uses Mixkit “Hazy After Hours”; the alternate uses “Deep Urban.” Sources and scope of permitted use are documented in `assets/AUDIO-LICENSES.md`.

| File | Purpose | Integrated (loudnorm analysis) | True peak | EBU R128 independent check |
| --- | --- | ---: | ---: | ---: |
| `assets/audio/primary-final-mix.wav` | Picture mix | -16.03 LUFS | -3.77 dBTP | −15.9 LUFS |
| `assets/audio/primary-music-only.wav` | Music-only fallback | -16.03 LUFS | -3.77 dBTP | −15.9 LUFS |
| `assets/audio/alternate-final-mix.wav` | Picture mix | -16.01 LUFS | -2.95 dBTP | −15.9 LUFS |
| `assets/audio/alternate-music-only.wav` | Music-only fallback | -16.02 LUFS | -2.95 dBTP | −15.9 LUFS |

The independent EBU R128 runs are saved as `qa/audio-*-ebur128.txt`; their roughly 0.1 LU difference from `loudnorm` is analysis-method rounding/filter behavior. Every output is approximately −16 LUFS and below the −1 dBTP ceiling. Smooth section-level gain preserves the source pulse while lifting LRA to 2.4 LU (loudnorm), independently 2.6 LU primary / 2.5 LU alternate (EBU R128). No compressor or limiter was needed; both options retain more than 1.9 dB of headroom below the ceiling.

## Music editing

- Primary: source starts at 15.973 s, after its intro. Native pulse measured approximately 121 BPM; pitch-preserving `atempo=120/121` aligns the edit to a nominal 120 BPM grid. Speed change: −0.83%.
- Alternate: source starts at 15.556 s. Native pulse measured approximately 124 BPM; `atempo=120/124` produces the same nominal 120 BPM grid. Speed change: −3.23%.
- Both begin with a 5 ms fade, maintain music through the final card, and fade over the final 0.75 s. Low bass below 28 Hz is removed. No added drop, trailer hit, sting, voiceover, or click layer.
- The scene boundaries 2.5, 5.0, …, 27.5 s are beats 5, 10, …, 55 on the 0.5 s grid. Native instrumental phrasing/swing is preserved; attacks are not individually quantized. Bass-envelope checks find most primary attacks within 19 ms of the scene grid, with two laid-back bass attacks at +54/+55 ms. The alternative has three early bass accents around −49 to −59 ms. These are groove accents, not a drift correction. A crude single-lag bass autocorrelation reads 120.48/119.05 BPM, so it is retained as diagnostic evidence rather than treated as authoritative over the longer native beat spacing.
- The revised music rises gently from the opening through work and build sections, peaks over type/network at 20–22.5 s, then settles for the CTA. The 2.7 dB section-gain span uses smooth cubic interpolation with a maximum 0.510 dB/s slope. Music remains present through 29.25 s before the final fade; detailed section levels are in `audio-revision.json`.

## Transition design

The library WAV “Short wind swoosh” is cropped to 420 ms, high-passed at 220 Hz, low-passed at 9.5 kHz, and faded at both edges. Each effect begins 165 ms before its transition, placing its 10 ms RMS peak at the cut. One identical effect level is retained throughout each option. No effect is synthesized. The filtered sample has only 0.0534% of spectral energy below 150 Hz; it avoids a repeated low-frequency impact.

| Option | Effects | Loudest effect relative to local music peak | Maximum 150 ms body lift (220 Hz–9.5 kHz) | Maximum 2–8 kHz lift |
| --- | ---: | ---: | ---: | ---: |
| Primary | 11 | -14.52 dB | 1.69 dB | 0.18 dB |
| Alternate | 11 | -11.88 dB | 3.90 dB | 0.25 dB |

Effect-to-music comparison uses the effect’s exact 420 ms local window. Body/ear-sensitive lift uses 150 ms centered on each transition and measures the sum against music alone. Full per-event results are in `qa/audio-metrics.json`. The isolated diagnostic layers are `assets/audio/primary-sfx-only.wav` and `alternate-sfx-only.wav`; they are internal production assets.

## Validation and review status

`qa/audio-verification.json` records codec/sample count, one-second RMS values and individual bass-attack checks. `qa/audio-metrics.json` records normalization measurements, source edit parameters, the filtered effect spectrum, and all eleven event comparisons. The analysis fields named `output_*` in the loudnorm probe refer to a discarded hypothetical normalized stream; the delivered file measurements are the `input_*` fields.

Automated duration, spectrum, level, peak and rhythm analysis completed. **No human listening review has been performed in this environment.** Instrumental selection follows Mixkit’s electronic/bass/drums metadata; absence of vocal artifacts and the subjective music/picture fit still need an actual playback review. Measurements alone cannot approve taste.

Rebuild from project root: `OPENBLAS_NUM_THREADS=1 python3 assets/audio/build_audio.py`; verify: `OPENBLAS_NUM_THREADS=1 python3 assets/audio/check_audio.py`, then `OPENBLAS_NUM_THREADS=1 python3 assets/audio/check_audio_revision.py`. These scripts only edit downloaded recordings. The original library recordings and the music-only/effect-only files should stay private to production; publish only a properly synchronized film on a licensed channel.
