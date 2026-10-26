from pathlib import Path
from PIL import Image,ImageDraw
import subprocess,io,sys
root=Path(__file__).resolve().parents[1];out=root/'deliverables';out.mkdir(exist_ok=True)
for fmt in (sys.argv[1:] or ['landscape','portrait']):
 movie=out/f'intent-solutions-{fmt}-1080p60.mp4'
 tw,th,cols=(480,270,3) if fmt=='landscape' else (270,480,4)
 sheet=Image.new('RGB',(tw*cols,(th+32)*(12//cols)),(9,9,11));d=ImageDraw.Draw(sheet)
 for i in range(12):
  t=i*2.5+1.15
  png=subprocess.check_output(['ffmpeg','-v','error','-ss',str(t),'-i',str(movie),'-frames:v','1','-f','image2pipe','-vcodec','png','pipe:1'])
  im=Image.open(io.BytesIO(png));im.thumbnail((tw,th));x=i%cols*tw;y=i//cols*(th+32);sheet.paste(im,(x,y));d.text((x+12,y+th+9),f'{t:05.2f}s',fill='#d4d4d8')
 sheet.save(out/f'intent-solutions-{fmt}-contact-sheet.jpg',quality=94)
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(movie),'-frames:v','1',str(out/f'intent-solutions-{fmt}-poster.png')],check=True)
