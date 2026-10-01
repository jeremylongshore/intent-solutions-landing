from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import subprocess,sys
root=Path(__file__).resolve().parents[1]
(root/'qa/components').mkdir(parents=True,exist_ok=True)
(root/'renders/components').mkdir(parents=True,exist_ok=True)
def run(job):
 fmt,i=job
 with (root/f'qa/components/render-{fmt}-{i}.log').open('w') as log:
  p=subprocess.run([str(root/'node_modules/.bin/hyperframes'),'render',str(root/'film'),'-c',f'lab-{i}-{fmt}.html','--fps','30','--workers','1','--output',str(root/f'renders/components/{fmt}-{i}.mp4')],stdout=log,stderr=subprocess.STDOUT)
 print(fmt,i,p.returncode,flush=True)
 return p.returncode
with ThreadPoolExecutor(max_workers=3) as pool:
 jobs=[(fmt,i) for fmt in ['landscape','portrait'] for i in range(12)]
 jobs=jobs[int(sys.argv[1]):int(sys.argv[2])] if len(sys.argv)>2 else jobs
 codes=list(pool.map(run,jobs))
raise SystemExit(1 if any(codes) else 0)
