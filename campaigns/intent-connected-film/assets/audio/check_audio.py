"""Independent delivered-WAV duration, beat-grid and dynamic-range checks."""
from pathlib import Path
import subprocess,json,numpy as np
from scipy import signal
A=Path('assets/audio');Q=Path('qa');out={}
for name in ['primary-music-only','primary-final-mix','alternate-music-only','alternate-final-mix']:
 p=A/(name+'.wav')
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
 x=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-ac','1','-ar','12000','-f','f32le','-']),dtype=np.float32)
 rms=[float(20*np.log10(np.sqrt(np.mean(x[i*12000:(i+1)*12000]**2))+1e-12)) for i in range(30)]
 result={'probe':probe,'rms_dbfs_per_second':rms,'rms_spread_first_29_seconds_db':max(rms[:29])-min(rms[:29])}
 if 'music-only' in name:
  y=signal.sosfilt(signal.butter(4,150,fs=12000,output='sos'),x);hop=12;n=len(y)//hop
  env=np.sqrt(np.mean(y[:n*hop].reshape(n,hop)**2,axis=1));onset=np.maximum(0,env[5:]-env[:-5]);onset=signal.savgol_filter(onset,11,2)
  corr=signal.correlate(onset-onset.mean(),onset-onset.mean(),method='fft')[len(onset)-1:]
  lag=np.argmax(corr[470:530])+470
  result['dominant_beat_period_ms']=int(lag);result['measured_bpm']=60000/lag
  beats=[]
  for t in np.arange(2.5,30,2.5):
   i=int(t*1000);a=max(0,i-100);b=min(len(onset),i+100);k=np.argmax(onset[a:b])+a
   beats.append({'scene_boundary_s':float(t),'nearest_bass_attack_s':float(k/1000),'offset_ms':int(k-i)})
  result['bass_attack_checks']=beats
 out[name]=result
 logs=subprocess.run(['bash','motion-video-kit/business-motion-film/scripts/loudness.sh',str(p)],capture_output=True,text=True,check=True)
 (Q/f'audio-{name}-ebur128.txt').write_text(logs.stdout)
 print(name,probe['format']['duration'],result.get('measured_bpm'),logs.stdout.split('short-term')[0].strip(),flush=True)
(Q/'audio-verification.json').write_text(json.dumps(out,indent=2))
