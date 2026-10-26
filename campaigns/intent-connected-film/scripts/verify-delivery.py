"""Inspect the delivered encodes; no renderer or website test suite involved."""
from pathlib import Path
import hashlib,json,subprocess,struct
from fractions import Fraction
root=Path(__file__).resolve().parents[1]
results=[]
for p in sorted((root/'deliverables').glob('*.mp4')):
 data=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
 v=next(s for s in data['streams'] if s['codec_type']=='video')
 a=next(s for s in data['streams'] if s['codec_type']=='audio')
 portrait='portrait' in p.name
 expected=(1080,1920) if portrait else (1920,1080)
 assert (v['width'],v['height'])==expected,p.name
 assert Fraction(v['r_frame_rate'])==60 and int(v['nb_frames'])==1800,p.name
 assert v['codec_name']=='h264' and v['pix_fmt']=='yuv420p',p.name
 assert a['codec_name']=='aac' and a['channels']==2 and int(a['sample_rate'])==48000,p.name
 assert abs(float(data['format']['duration'])-30)<.02,p.name
 buf=p.read_bytes();atoms=[];offset=0
 while offset+8<=len(buf):
  size,name=struct.unpack('>I4s',buf[offset:offset+8]);header=8
  if size==1:size=struct.unpack('>Q',buf[offset+8:offset+16])[0];header=16
  if size==0:size=len(buf)-offset
  assert size>=header
  atoms.append(name.decode('ascii',errors='replace'));offset+=size
 assert atoms.index('moov')<atoms.index('mdat'),p.name
 streams={}
 for kind in ['v','a']:
  streams[kind]=subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-map',f'0:{kind}:0','-c','copy','-f','hash','-hash','sha256','-'],text=True).strip().split('=')[1]
 results.append({'file':p.name,'bytes':len(buf),'sha256':hashlib.sha256(buf).hexdigest(),'width':v['width'],'height':v['height'],'frames':int(v['nb_frames']),'fps':60,'duration_s':float(data['format']['duration']),'video':'H.264/yuv420p','audio':'AAC stereo/48kHz','fast_start':True,'stream_hashes':streams})
assert len(results)==6
for fmt in ['landscape','portrait']:
 assert len({r['stream_hashes']['v'] for r in results if fmt in r['file']})==1
for suffix in ['1080p60.mp4','1080p60-music-only.mp4','1080p60-alternate-music.mp4']:
 assert len({r['stream_hashes']['a'] for r in results if r['file'].endswith(suffix)})==1
facts=json.loads((root/'FACTS.json').read_text())
embedded=(root/'film/facts.js').read_text().removeprefix('window.INTENT_FACTS = ').strip().removesuffix(';')
assert json.loads(embedded)==facts
(root/'qa/delivery-metadata.json').write_text(json.dumps({'passed':True,'facts_match':True,'video_identical_across_audio_choices':True,'audio_identical_across_formats':True,'files':results},indent=2)+'\n')
print('PASS: six 30s/1800-frame 1080p60 masters; same video per format, same audio per choice; facts match.')
