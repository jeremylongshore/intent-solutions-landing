# Shared film build contract

Each builder writes only assigned JS under film/scenes/. It is a plain script loaded after GSAP, before main.js. Export `window.buildA = ctx => [scenes]` or buildB. Each scene object `{id, node, timeline}`. `node` is a div.scene appended to ctx.stage; timeline is a paused:false GSAP timeline created inside builder, duration2.5s, then nested in root. Do NOT start own raf/timeouts/audio or auto-play. Root initializes all timeline children before seeking0. No random values. Fact copy must be in FACTS.json.

ctx: {W,H,P,gsap,stage,el,svg,logo,frame,scene,animate,copy}. P true forportrait. `el(tag,attrs,parent)` supports style object/text/className/innerHTML. `svg(viewBox,inner,style,parent)` helper. `logo(size,parent,style)` builds canonical branching mark. `scene(id)` returns positioned node. `frame` is array of12 {x,y,w,h} actor poses. Root owns the same orange outline across entire film and transitions it (no cut jumps); build graphics to complement it, not duplicate it. Frame coordinates in next paragraph. Root handles scene visibility, title arrival/exit, and slow push on each scene; component timeline should animate inner graphics to visibly produce outcomes using gsap.fromTo with immediateRender:false. Titles must have class title; supporting groups optional class content. Keep huge subject, 1-2 reading targets. Avoid fake UI output states/scores. Label all diagram scenes via root Illustrated workflow.

Landscape 1920x1080, margin120. Title usually y180, graphregion x160 y420 w1600 h460; varylayouts with macrotype, broadsvg, asymmetrictitle, largecodeglyph. Brand lock top(100,65), concept bottom(100,1000). Portrait1080x1920 text safe x88..960,y290..1510; brand top(88,190), concept bottom(88,1670). Titles font~90, body~36; atmost2lines. Put landscape reading phrase max1200width and portraitmax900width. End CTA shouldbe readable3sec ifpossible root30total.

Actor poses landscape/portrait:
0 (1240,320,430,430)/(230,420,620,620)
1 (230,350,1460,450)/(110,580,860,700)
2 (950,330,700,560)/(110,730,860,630)
3 (260,360,1400,530)/(110,630,860,700)
4 (270,300,1380,640)/(110,560,860,850)
5 (650,290,1030,650)/(110,610,860,750)
6 (230,330,1460,570)/(110,620,860,720)
7 (680,260,850,680)/(190,660,700,700)
8 (110,170,1700,780)/(90,430,900,1050)
9 (740,400,440,300)/(290,780,500,300)
10 (690,240,550,550)/(230,610,620,620)
11 (200,320,220,220)/(430,380,220,220)

Current user steering: allproperties fuse intoone cool Intent world. NOT a role-by-role explanation. Subtle Demos/Learn/OMA/TonsofSkills labels woven into active surfaces; no repeated website chaptercards. Persistent traces connect all work. BRAND ORANGE #f97316, charcoal#09090b, offwhite#fafafa. No unverifiedmetricsonscreen. Neither builder grades output; labs rendered and independently reviewed after.
