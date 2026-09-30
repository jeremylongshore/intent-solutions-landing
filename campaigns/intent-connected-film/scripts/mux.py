from pathlib import Path
import subprocess,sys
root=Path(__file__).resolve().parents[1];out=root/'deliverables';out.mkdir(exist_ok=True)
for fmt in (sys.argv[1:] or ['landscape','portrait']):
 for suffix,stem in [('', 'primary-final-mix.wav'),('-music-only','primary-music-only.wav'),('-alternate-music','alternate-final-mix.wav')]:
  target=out/f'intent-solutions-{fmt}-1080p60{suffix}.mp4'
  subprocess.run(['ffmpeg','-v','error','-y','-i',str(root/f'renders/{fmt}-silent.mp4'),'-i',str(root/'assets/audio'/stem),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','256k','-ar','48000','-t','30','-movflags','+faststart',str(target)],check=True)
  print(target,flush=True)
