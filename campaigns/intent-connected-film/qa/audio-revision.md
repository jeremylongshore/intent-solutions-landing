# Audio revision — section dynamics / 2026-09-30

The constant-gain original failed the kit's calm-score dynamics target: primary LRA was 0.8 LU by loudnorm and 0.9 LU by independent EBU R128. The revised primary and alternate now meet approximately −16 LUFS, 1.5–3 LU LRA, and true peak ≤−1 dBTP. This is an editorial gain revision to the same licensed recordings.

## Exact before / after

Each arrow compares the archived original with the final decoded 24-bit delivery WAV. Loudnorm columns use **input** measurements; its hypothetical normalized output is discarded. EBU R128 uses independent gating/rounding, so its values differ slightly. The old full-cut critic's 0.9 LU primary result matches the archived independent EBU result.

| File | Integrated LUFS, loudnorm | LRA LU, loudnorm | True peak dBTP | EBU integrated LUFS / LRA LU |
| --- | ---: | ---: | ---: | ---: |
| primary music | -17.00 → -16.03 | 0.8 → 2.4 | -5.25 → -3.77 | -16.9 / 0.9 → -15.9 / 2.6 |
| primary mix | -17.00 → -16.03 | 0.8 → 2.4 | -5.25 → -3.77 | -16.9 / 0.9 → -15.9 / 2.6 |
| alternate music | -17.01 → -16.02 | 1.0 → 2.4 | -4.23 → -2.95 | -16.9 / 0.8 → -15.9 / 2.5 |
| alternate mix | -17.00 → -16.01 | 1.0 → 2.4 | -4.23 → -2.95 | -16.9 / 0.8 → -15.9 / 2.5 |

All four files are 30.000 seconds, 48,000 Hz, stereo, 24-bit PCM, 1,440,000 samples per channel. Primary/alternate mix integrated loudness differs by only 0.02 LU. No compressor, limiter, synthesized sound, new library item, resampling of the beat grid, or new transition was introduced.

## Purposeful musical arc

The same smooth section gain is applied to both options before a constant mastering adjustment:

| Picture section | Time | Musical gain before mastering |
| --- | --- | --- |
| Finished opening and first work frame | 0–2.5 s | −1.6 dB |
| Define / test / show work | 5 / 7.5 / 10 s | −0.7 / −0.5 / −0.3 dB |
| Learn / public tools / reusable package | 12.5 / 15 / 17.5 s | 0.0 / +0.2 / +0.65 dB |
| Large type and connected company network | 20–22.5 s | +1.1 dB |
| Logo resolution | 25 s | +0.55 dB |
| CTA landing and reading body | 27.5–29.25 s | −0.3 dB |
| Existing final fade | 29.25–30 s | Hold section gain; preserve original 0.75 s fade |

The curve uses shape-preserving cubic interpolation with a continuous first derivative, no overshoot, and maximum gain change 0.510 dB/second. It rises with the accumulating work and gently returns for the CTA. It does not react to individual drum hits. The opening-to-peak automation span is 2.7 dB. There are no stepped gains or added dead stops.

The primary still starts at source 15.973 s with `atempo=120/121`; the alternate still starts at 15.556 s with `atempo=120/124`. The nominal 120 BPM / 0.5 s grid, every 2.5 s scene boundary, and all eleven effect starts at cut minus 0.165 s remain unchanged. The source groove is preserved, including its previously documented small onset offsets. Both begin with the existing 5 ms fade.

## Decoded balance and ending checks

Each effect is independently compared against the music-only WAV over that effect's exact 420 ms window. Every event passes the owner's strict effect peak ≤ local music peak requirement. The builder also limits the 150 ms body lift to 3.9 dB and keeps one repeated SFX gain per option. This reduced the alternate's SFX by about 1.45 dB from the first shaped trial to avoid exposing the opening swoosh against the quieter opening. The primary's SFX level is unchanged from that first trial.

| Option | Highest effect minus local music peak | Maximum 220 Hz–9.5 kHz body lift | Maximum 2–8 kHz lift | CTA body RMS, 27.5–29.25 s | Clipped samples |
| --- | ---: | ---: | ---: | ---: | ---: |
| primary | -14.52 dB | 1.69 dB | 0.18 dB | -17.07 dBFS | 0 |
| alternate | -11.88 dB | 3.90 dB | 0.25 dB | -17.65 dBFS | 0 |

Music stays present through 29.25 s. The last pre-fade quarter second is 0.65 dB louder than the original primary / 0.68 dB louder than the original alternate. The final sample peaks are −102.77 / −107.84 dBFS. The decoded music and effect stems reconstruct their mixes within 24-bit quantization tolerance. No early tail dropout or clipped samples were found.

## Preservation and rebuild

The original WAVs, original rebuild/check scripts, and original reports were copied **before editing** into the private production folder `assets/audio/older-versions/2026-09-29-before-section-shaping/`. Its SHA-256 manifest has been verified. The intermediate first shaped trial is preserved separately under `assets/audio/older-versions/2026-09-30-section-shaping-first-pass/`. Original library recordings and license evidence were not modified; all three source-file hashes still match `assets/audio/SOURCES.json`. Keep source recordings, isolated stems, and both archive folders private to production under the existing terms in `assets/AUDIO-LICENSES.md`.

Rebuild and verify from the project root:

```sh
OPENBLAS_NUM_THREADS=1 python3 assets/audio/build_audio.py
OPENBLAS_NUM_THREADS=1 python3 assets/audio/check_audio.py
OPENBLAS_NUM_THREADS=1 python3 assets/audio/check_audio_revision.py
```

`qa/audio-revision.json` contains exact file hashes, full before/after measurements, all decoded event comparisons, section RMS measurements, ending checks, and archive checks. `qa/audio-metrics.json`, `qa/audio-verification.json`, and the independent `qa/audio-*-ebur128.txt` files describe the current delivery WAVs. The original copies remain in the archive. Final video muxing uses these WAVs with AAC at 256 kb/s and should measure the encoded result separately.

**No human listening review was performed or claimed.** These checks establish measurable level, duration, dynamics, timing and tail behavior; actual playback remains necessary to assess taste and subjective comfort.
