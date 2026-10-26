"""Build internal synchronization stems from licensed Mixkit library recordings.
Run from the project root. No synthesized audio; only editorial filtering/gain/fades.
"""
from pathlib import Path
import subprocess,json,re
import numpy as np
from scipy import signal
from scipy.interpolate import PchipInterpolator
ROOT=Path(__file__).resolve().parents[2]
A=ROOT/'assets/audio';Q=ROOT/'qa';SR=48000;N=SR*30
TARGET_LUFS=-16.0
# Gentle musical arc mapped to scene groups; PCHIP prevents overshoot and gives
# continuous gain/slope. This is musical gain automation, never per-hit ducking.
# Existing source phrasing, 120 BPM edit, and the 29.25–30 s fade are unchanged.
SECTION_GAIN_POINTS=[
 (0.0,-1.6),(2.5,-1.6),                 # Finished opening / first work frame
 (5.0,-0.7),(7.5,-0.5),(10.0,-0.3),    # Define / test / show the work
 (12.5,0.0),(15.0,0.2),(17.5,0.65),    # Learn / public tools / reusable package
 (20.0,1.1),(22.5,1.1),                # Large type into the connected network
 (25.0,0.55),(27.5,-0.3),              # Logo resolution / CTA landing
 (29.25,-0.3),(30.0,-0.3),             # Hold body until the original final fade
]
gain_points=np.asarray(SECTION_GAIN_POINTS,dtype=float)
gain_curve=PchipInterpolator(gain_points[:,0],gain_points[:,1])
section_gain_db=gain_curve(np.arange(N)/SR)
section_gain=10**(section_gain_db/20)

def decode(p,filters=None):
 cmd=['ffmpeg','-v','error','-i',str(p)]
 if filters:cmd+=['-af',filters]
 return np.frombuffer(subprocess.check_output(cmd+['-ar',str(SR),'-ac','2','-f','f32le','-']),dtype='<f4').reshape(-1,2).astype(float)
def write(p,x,codec='pcm_s24le'):
 subprocess.run(['ffmpeg','-y','-v','error','-f','f32le','-ar',str(SR),'-ac','2','-i','pipe:0','-c:a',codec,str(p)],input=x.astype('<f4').tobytes(),check=True)
def measure(p):
 r=subprocess.run(['ffmpeg','-hide_banner','-i',str(p),'-af',f'loudnorm=I={TARGET_LUFS}:TP=-1:LRA=3:print_format=json','-f','null','-'],capture_output=True,text=True,check=True)
 m=json.loads(r.stderr[r.stderr.rfind('{'):]);return {k:(v if k=='normalization_type' else float(v)) for k,v in m.items()}
def band(x,lo,hi):return signal.sosfilt(signal.butter(4,[lo,hi],fs=SR,btype='bandpass',output='sos'),x,axis=0)
def db(v):return float(20*np.log10(max(v,1e-12)))
def rms(x):return float(np.sqrt(np.mean(x*x)))
def peak(x):return float(np.max(np.abs(x)))

sfx=decode(A/'source/mixkit-sfx-1461.wav','atrim=start=0:end=0.42,asetpts=PTS-STARTPTS,highpass=f=220:p=2,lowpass=f=9500:p=2,afade=t=in:d=0.012,afade=t=out:st=0.30:d=0.12')
sfx=np.pad(sfx,((0,max(0,int(.42*SR)-len(sfx))),(0,0)))[:int(.42*SR)]
# Stock-source peak (10 ms RMS window) lands on transition center.
hop=480;n=len(sfx)//hop;env=np.sqrt(np.mean(sfx[:n*hop].reshape(n,hop,2)**2,axis=(1,2)));sfx_peak_s=(np.argmax(env)+.5)*.01
write(A/'transition-sweep-filtered.wav',sfx*10**(-24/20)/peak(sfx))
results={}
for label,id,bpm,start in [('primary',132,121.0,15.973),('alternate',623,124.0,15.556)]:
 m=decode(A/f'source/mixkit-{id}.mp3',f'atrim=start={start},asetpts=PTS-STARTPTS,atempo={120/bpm:.12f},atrim=duration=30,highpass=f=28:p=2,afade=t=in:d=0.005,afade=t=out:st=29.25:d=0.75')
 m=np.pad(m,((0,max(0,N-len(m))),(0,0)))[:N]
 m*=section_gain[:,None]
 tmp=A/f'.{label}-measure.wav';write(tmp,m,'pcm_f32le');meas=measure(tmp);m*=10**((TARGET_LUFS-.05-meas['input_i'])/20)
 events=[];gains=[]
 for t in np.arange(2.5,30,2.5):
  i=int(round((t-sfx_peak_s)*SR));j=i+len(sfx);ref=m[i:j]
  # Set effect body about 10 dB below music in band, plus a strict sample-peak cap.
  gain=min(rms(band(ref,220,9500))*.32/max(rms(band(sfx,220,9500)),1e-9),peak(ref)*10**(-9/20)/peak(sfx))
  # Protect ear-sensitive high mids; conservative energy-only cap.
  gain=min(gain,rms(band(ref,2000,8000))*.40/max(rms(band(sfx,2000,8000)),1e-9))
  events.append({'transition':float(t),'start':i/SR,'end':j/SR,'i':i,'j':j});gains.append(gain)
 gain=float(min(gains)) # one repeatable level; no pumping between transitions
 # Opening music is intentionally quieter. Keep its effect body as restrained
 # as the original: solve the exact 150 ms band-energy ceiling, then retain
 # one shared SFX gain for every transition. No extra effect or music ducking.
 for event in events:
  k=int(round(event['transition']*SR));half=int(.075*SR)
  bm=band(m[k-half:k+half],220,9500)
  be=band(sfx[k-half-event['i']:k+half-event['i']],220,9500)
  aa=float(np.sum(be*be));bb=float(2*np.sum(bm*be))
  cc=float((1-10**(3.9/10))*np.sum(bm*bm))
  gain=min(gain,(-bb+np.sqrt(bb*bb-4*aa*cc))/(2*aa))
 e=np.zeros_like(m)
 for event in events:e[event['i']:event['j']]+=sfx*gain
 mix=m+e
 write(tmp,mix,'pcm_f32le');mixmeas=measure(tmp);master=10**((TARGET_LUFS-mixmeas['input_i'])/20)
 m*=master;e*=master;mix=m+e
 names={'music':f'{label}-music-only.wav','mix':f'{label}-final-mix.wav','sfx':f'{label}-sfx-only.wav'}
 for role,arr in [('music',m),('mix',mix),('sfx',e)]:write(A/names[role],arr)
 stats=[]
 for event in events:
  i,j=event['i'],event['j'];mr=m[i:j];er=e[i:j];combined=mr+er
  k=int(round(event['transition']*SR));sl=slice(max(0,k-int(.075*SR)),min(N,k+int(.075*SR)))
  bmusic=band(m[sl],220,9500);bmix=band(mix[sl],220,9500)
  hmusic=band(m[sl],2000,8000);hmix=band(mix[sl],2000,8000)
  stats.append({'transition_s':event['transition'],'effect_start_s':event['start'],'effect_end_s':event['end'],'effect_peak_dbfs':db(peak(er)),'local_music_peak_dbfs':db(peak(mr)),'effect_minus_music_peak_db':db(peak(er)/peak(mr)),'band_body_lift_150ms_db':db(rms(bmix)/rms(bmusic)),'sensitive_band_lift_150ms_db':db(rms(hmix)/rms(hmusic)),'effect_rms_dbfs':db(rms(er)),'local_music_rms_dbfs':db(rms(mr))})
 result={'source_mixkit_id':id,'source_bpm':bpm,'source_start_s':start,'atempo_ratio':120/bpm,'target_bpm':120,'duration_s':30,'target_lufs':TARGET_LUFS,'section_gain':{'interpolation':'shape-preserving cubic (PCHIP), continuous first derivative','points_time_s_gain_db':SECTION_GAIN_POINTS,'maximum_slew_db_per_second':float(np.max(np.abs(gain_curve.derivative()(np.arange(N)/SR)))),'final_fade_start_s':29.25,'final_fade_duration_s':0.75},'files':names,'metrics':{role:measure(A/name) for role,name in names.items() if role!='sfx'},'event_count':len(events),'repeat_gain':gain*master,'event_metrics':stats}
 for role,metrics in result['metrics'].items():
  assert abs(metrics['input_i']-TARGET_LUFS)<=.1,(label,role,'loudness',metrics)
  assert 1.5<=metrics['input_lra']<=3.0,(label,role,'LRA',metrics)
  assert metrics['input_tp']<=-1.0,(label,role,'true peak',metrics)
 assert all(event['effect_minus_music_peak_db']<=0 for event in stats),(label,'SFX peak cap')
 assert all(event['band_body_lift_150ms_db']<=3.900001 for event in stats),(label,'SFX body cap')
 results[label]=result;tmp.unlink()
 print(label,json.dumps(result['metrics']),flush=True)
# Analyze the filtered effect itself; no extra audio is generated.
f,p=signal.welch(sfx.mean(axis=1),SR,nperseg=8192)
results['effect_source']={'mixkit_id':1461,'peak_offset_s':sfx_peak_s,'duration_s':len(sfx)/SR,'energy_below_150hz_percent':float(100*p[f<150].sum()/p.sum()),'energy_above_6000hz_percent':float(100*p[f>6000].sum()/p.sum()),'highpass_hz':220,'lowpass_hz':9500}
(Q/'audio-metrics.json').write_text(json.dumps(results,indent=2))
print('Files written; audio-metrics.json complete.')
