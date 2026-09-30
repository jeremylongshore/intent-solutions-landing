# Intent Solutions — One connected company

A 30-second company film, authored as deterministic GSAP compositions in the Intent Solutions visual system. Landscape is 1920×1080 and portrait is independently composed at 1080×1920; final exports run at 60 fps. The shared work and evidence artifacts connect the company, public tools, learning, demos, and open source. This is an illustrated brand film, not a recording of product functionality or a customer result.

## Files

- `deliverables/`: upload-ready video versions, posters and contact sheets.
- `film/`: scene source, pinned fonts and GSAP, shared timeline, per-scene labs.
- `FACTS.json`: permitted on-screen language and supporting sources.
- `BRIEF.md`, `STORYBOARD.md`: scope and shot logic.
- `qa/QUALITY.md`, `qa/CRITIC-LEDGER.md`: final measured checks, independent review and limits. Both final formats received independent SHIP verdicts. Final-review contact sheets and numeric evidence are included; full native extraction archives remain in the local production workspace.
- `assets/AUDIO-LICENSES.md`, `assets/VISUAL-LICENSES.md`: provenance and allowed use.

## Render

Requires Node 22.12 or later in the Node 22 line, Python 3.11 or later, FFmpeg and a Chromium environment supported by HyperFrames. Validated here with Node22.23.1 and FFmpeg6.1.1. JavaScript dependencies are pinned in the lockfile; Python analysis/audio dependencies are pinned in requirements.txt. No API keys are needed.

```sh
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
npm ci
npm run check:syntax
npm run render:landscape
npm run render:portrait
```

The renderer creates one isolated composition entry per format to avoid conflicting root pages. All animated values come from a paused GSAP timeline; there are no timers, simulation history, remote fonts or runtime network assets in the composition. The five-second renderer proof was completed before full production.

The kit supplied the workflow and HyperFrames-compatible lab contract, but contains no renderer implementation. Production uses pinned HyperFrames 0.8.95 for browser capture at each timeline frame, then FFmpeg for audio muxing, inspection and measurement. The kit commit and MIT notice are recorded under `assets/`.

## Audio rebuild

Only synchronized videos may be distributed. Raw library recordings and isolated music/effect stems are intentionally excluded from this public source bundle. Retrieve the named sources from the official URLs in `assets/AUDIO-LICENSES.md`, place them using `assets/audio/SOURCES.json`, then run `assets/audio/build_audio.py` and `assets/audio/check_audio.py`. They use the pinned Python environment and FFmpeg. Run them as `python assets/audio/build_audio.py` then `python assets/audio/check_audio.py`. `scripts/mux.py` combines each silent render with either the picture mix or music-only stem.

## Inspect or adapt

Serve the project root with a local static HTTP server and open `film/landscape.html` or `film/portrait.html`. The page is intentionally paused for deterministic capture. Seek using `window.__film.timeline.seek(seconds)` in the browser console. The lab pages isolate each scene; `make-pages.py` regenerates them from the shared runtime.

`FACTS.json` is the approved copy allowlist, checked against every visible text node by `node scripts/qa-dom.cjs`. Scene text is authored explicitly in `film/scenes/*.js` and `film/main.js`; it is not generated from the allowlist. After an approved copy change, update those scene strings and both `FACTS.json` and its browser export `film/facts.js`, render both formats, and repeat the independent review. Run `python scripts/verify-delivery.py` after muxing all six exports. No publication to YouTube or a production website is performed by these scripts.

For webpage playback, use the final MP4 with `controls`, `playsinline`, `preload="metadata"` and its matching poster. The H.264/AAC files include fast-start metadata. `deliverables/UPLOAD-NOTES.md` includes suggested YouTube copy and the final human watch/listen check.
