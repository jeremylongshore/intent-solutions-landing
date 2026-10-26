import json
from pathlib import Path
def L(s):
 c=[int(s[i:i+2],16)/255 for i in (1,3,5)];c=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in c];return sum(x*y for x,y in zip(c,[.2126,.7152,.0722]))
rows=[]
for fg,bg in [('#fafafa','#09090b'),('#fafafa','#18181b'),('#d4d4d8','#141416'),('#a1a1aa','#141416'),('#09090b','#f97316')]:
 a,b=sorted([L(fg),L(bg)]);rows.append({'foreground':fg,'background':bg,'ratio':round((b+.05)/(a+.05),3),'pass':(b+.05)/(a+.05)>=4.5})
Path('qa/contrast.json').write_text(json.dumps({'method':'WCAG relative luminance of specified fully-visible text fills and immediate backgrounds. Anti-aliased edges and partial-opacity transition frames are not treated as settled text.','pairs':rows},indent=2));print(rows)
