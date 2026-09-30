# Visual assets and production tools

Intent Solutions owns the company identity; the branching-arrow geometry comes from its public website favicon and current brand contract. No customer footage, AI-generated imagery, or third-party brand logos are used.

Syne and Inter are pinned local variable TrueType fonts fetched from the [Google Fonts repository](https://github.com/google/fonts), at `ofl/syne/Syne[wght].ttf` and `ofl/inter/Inter[opsz,wght].ttf`. Their SIL Open Font License texts are adjacent to the fonts in `film/assets/fonts/`. Asset checksums are in `asset-manifest.json`.

GSAP 3.15.0 is pinned in package-lock.json and copied locally for rendering. Its package declares the [GSAP Standard No-Charge License](https://gsap.com/standard-license/); the minified source retains its copyright/license header. HyperFrames 0.8.95 is the pinned frame renderer. The [motion-video-kit](https://github.com/echris6/motion-video-kit) is pinned at commit `255562b04b1e5ecaa4ba98e5c9aa191d5ba7f6fa`; its MIT license is retained in `licenses/motion-video-kit-MIT.txt`.

All vector diagrams and scene layouts were written for this film. The persistent evidence graphic is an illustration, not a recording of a product, evaluation result, or customer system.
