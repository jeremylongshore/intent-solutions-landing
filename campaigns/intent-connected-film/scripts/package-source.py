from pathlib import Path
import shutil,sys
root=Path(__file__).resolve().parents[1];out=Path(sys.argv[1]);out.mkdir(parents=True,exist_ok=True)
for name in ['BRIEF.md','STORYBOARD.md','FACTS.json','brand-research.md','README.md','package.json','package-lock.json','make-pages.py','requirements.txt']:
 shutil.copy2(root/name,out/name)
shutil.copytree(root/'film',out/'film',dirs_exist_ok=True,ignore=shutil.ignore_patterns('*.woff2'))
for name in ['render-components.py','render-full.py','measure-video.py','contrast.py','mux.py','stills.cjs','qa-dom.cjs','browser-path.cjs','contact-sheets.py','verify-delivery.py','package-source.py']:
 (out/'scripts').mkdir(exist_ok=True);shutil.copy2(root/'scripts'/name,out/'scripts'/name)
(out/'assets/audio').mkdir(parents=True,exist_ok=True)
for name in ['AUDIO-LICENSES.md','VISUAL-LICENSES.md','asset-manifest.json']:
 shutil.copy2(root/'assets'/name,out/'assets'/name)
for name in ['SOURCES.json','build_audio.py','check_audio.py']:
 shutil.copy2(root/'assets/audio'/name,out/'assets/audio'/name)
shutil.copytree(root/'assets/licenses',out/'assets/licenses',dirs_exist_ok=True)
shutil.copytree(root/'motion-video-kit',out/'motion-video-kit',ignore=shutil.ignore_patterns('.git'),dirs_exist_ok=True)
(out/'qa').mkdir(exist_ok=True)
for p in (root/'qa').iterdir():
 if p.suffix in ['.md','.json','.csv'] and p.is_file():shutil.copy2(p,out/'qa'/p.name)
for name in ['full-landscape-r3-evidence','full-portrait-r3-evidence']:
 src=root/'qa'/name
 if src.exists():
  dest=out/'qa'/name;dest.mkdir(exist_ok=True)
  for p in src.iterdir():
   if p.is_file() and p.suffix in ['.jpg','.json','.txt']:shutil.copy2(p,dest/p.name)
if (root/'deliverables').exists():shutil.copytree(root/'deliverables',out/'deliverables',dirs_exist_ok=True)
(out/'.gitignore').write_text('node_modules/\n.venv/\n.render-stage*/\n.lint-stage/\nrenders/\nqa/components/\nqa/component-review*/\nassets/audio/source/\nassets/audio/*.wav\nassets/audio/*.mp3\nassets/audio/*.html\n__pycache__/\n*.log\n')
print(out)
