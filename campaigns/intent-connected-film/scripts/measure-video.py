#!/usr/bin/env python3
"""Every-frame luma/motion/edge metrics, plus kit-compatible 10fps freeze screen."""
import argparse,csv,json,subprocess,re
from pathlib import Path
import numpy as np
p=argparse.ArgumentParser();p.add_argument('video');p.add_argument('prefix');a=p.parse_args()
meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height,r_frame_rate,nb_frames,duration','-of','json',a.video]))['streams'][0]
fps=eval(meta['r_frame_rate'],{'__builtins__':{}});w=320;h=round(int(meta['height'])/int(meta['width'])*w/2)*2
cmd=['ffmpeg','-v','error','-i',a.video,'-vf',f'scale={w}:{h},format=gray','-f','rawvideo','-pix_fmt','gray','pipe:1'];proc=subprocess.Popen(cmd,stdout=subprocess.PIPE)
rows=[];prev=None;sampleprev=None;freeze=[];i=0
while True:
 buf=proc.stdout.read(w*h)
 if len(buf)!=w*h:break
 f=np.frombuffer(buf,dtype=np.uint8).reshape(h,w).astype(np.float32)
 diff=0 if prev is None else float(np.abs(f-prev).mean());edge=float((np.abs(np.diff(f,axis=0)).mean()+np.abs(np.diff(f,axis=1)).mean())/2)
 rows.append([i,round(i/fps,6),round(diff,6),round(float(f.mean()),6),round(edge,6)])
 if i%round(fps/10)==0:
  if sampleprev is not None:freeze.append(float(np.abs(f-sampleprev).mean())<.35)
  sampleprev=f
 prev=f;i+=1
proc.wait();longest=run=0
for frozen in freeze:
 run=run+1 if frozen else 0;longest=max(longest,run)
prefix=Path(a.prefix);prefix.parent.mkdir(parents=True,exist_ok=True)
with prefix.with_suffix('.csv').open('w') as f:
 out=csv.writer(f,lineterminator="\n");out.writerow(['frame','time_s','mean_delta_255','mean_luma_255','mean_edge_255']);out.writerows(rows)
result={'video':a.video,'width':int(meta['width']),'height':int(meta['height']),'fps':fps,'frames_measured':i,'duration_s':i/fps,'frozen_screen':{'sample_fps':10,'width':w,'height':h,'threshold_luma_delta':.35,'total_s':sum(freeze)/10,'longest_s':longest/10,'passes':sum(freeze)<=10 and longest<=5},'all_frame_mean_luma':float(np.mean([r[3] for r in rows])),'all_frame_mean_edge':float(np.mean([r[4] for r in rows])),'method':'All frames decoded at native frame rate and spatially downsampled to 320px. Freeze follows kit 10fps threshold; not a native-resolution perceptual judgement.'}
result['phase0_diagnostic']=result.pop('frozen_screen')
kit=Path(__file__).resolve().parents[1]/'motion-video-kit/business-motion-film/scripts/frozen-time.sh'
kit_output=subprocess.check_output(['bash',str(kit),a.video],text=True)
times=[float(x) for x in kit_output.split('near-frozen samples:')[0].split()];n=len(times);longest=run=0;last=None
for t in times:
 run=run+1 if last is not None and abs(t-last-.1)<.0001 else 1
 longest=max(longest,run);last=t
result['frozen_screen']={'source':'Pinned motion-video-kit/scripts/frozen-time.sh','sample_fps':10,'threshold_luma_delta':.35,'total_s':n/10,'longest_s':longest/10,'sample_times_s':times,'passes':n<=10 and longest<=5}
result['method']='Native-rate every-frame numeric scan at320px. Acceptance freeze screen runs the exact pinned kit FFmpeg fps10 filter; phase0_diagnostic preserves a separate sample phase (frames0,6,...). Sampling phase can change near-threshold counts; no threshold was changed.'
prefix.with_suffix('.json').write_text(json.dumps(result,indent=2));print(json.dumps(result))
