from pathlib import Path
import subprocess,sys,shutil
root=Path(__file__).resolve().parents[1];fmt=sys.argv[1]
(root/'renders').mkdir(exist_ok=True)
(root/'qa').mkdir(exist_ok=True)
stage=root/f'.render-stage-{fmt}'
if stage.exists():shutil.rmtree(stage)
shutil.copytree(root/'film',stage,ignore=shutil.ignore_patterns('*.html'))
shutil.copy2(root/f'film/{fmt}.html',stage/'index.html')
with (root/f'qa/render-{fmt}.log').open('w') as log:
 p=subprocess.run([str(root/'node_modules/.bin/hyperframes'),'render',str(stage),'--fps','60','--workers','4','--crf','16','--strict','--output',str(root/f'renders/{fmt}-silent.mp4')],stdout=log,stderr=subprocess.STDOUT)
print(fmt,p.returncode,flush=True)
raise SystemExit(p.returncode)
