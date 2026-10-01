from pathlib import Path
root=Path(__file__).parent
for portrait in [False,True]:
 fmt='portrait' if portrait else 'landscape';w,h=(1080,1920) if portrait else (1920,1080)
 for lab in [None,*range(12)]:
  name=f'{fmt}.html' if lab is None else f'lab-{lab}-{fmt}.html';dur=30 if lab is None else 2.5;attr='' if lab is None else f' data-scene="{lab}"'
  html=f'''<!doctype html><html data-format="{fmt}"{attr}><head><meta charset="utf-8"><title>Intent Solutions · One connected company</title><script src="assets/gsap-3.15.0.min.js"></script><link rel="stylesheet" href="shared.css"></head><body><main id="film" data-composition-id="film" data-width="{w}" data-height="{h}" data-duration="{dur}" data-fps="60"></main><script>window.__timelines={{}};</script><script src="facts.js"></script><script src="scenes/a.js"></script><script src="scenes/b.js"></script><script src="main.js"></script></body></html>'''
  (root/'film'/name).write_text(html)
(root/'film/index.html').write_text((root/'film/landscape.html').read_text())
