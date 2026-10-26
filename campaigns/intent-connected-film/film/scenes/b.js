/* Intent film, scenes 06–11. All coordinates are authored for each format. */
(function () {
  'use strict';

  window.buildB = function buildB(ctx) {
    const {P, W, H, gsap, el, svg, logo} = ctx;
    const ink = '#fafafa', zinc = '#71717a', orange = '#f97316';
    const box = (parent, className, x, y, w, h, extra = {}) => el('div', {
      className,
      style: {position: 'absolute', left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`, ...extra}
    }, parent);
    const label = (parent, text, x, y, w, extra = {}) => el('div', {
      className: 'label', text,
      style: {left: `${x}px`, top: `${y}px`, width: `${w}px`, ...extra}
    }, parent);
    const title = (parent, text, x, y, w, extra = {}) => el('h2', {
      className: 'title', text,
      style: {left: `${x}px`, top: `${y}px`, width: `${w}px`, whiteSpace: 'pre-line', ...extra}
    }, parent);
    const timeline = () => gsap.timeline().to({}, {duration: 2.5}, 0);
    const reveal = (tl, targets, from, to, at) => tl.fromTo(targets, from,
      {...to, immediateRender: true}, at);
    function pathReveal(tl, paths, start, duration = .75) {
      paths.forEach((path, i) => {
        const n = path.getTotalLength();
        reveal(tl, path, {strokeDasharray: n, strokeDashoffset: n},
          {strokeDashoffset: 0, duration, ease: 'power2.out'}, start + i * .065);
      });
    }

    function buildPublic() {
      const node = ctx.scene(6), tl = timeline();
      title(node, 'Build in public.', P ? 88 : 120, P ? 300 : 170, P ? 904 : 1550,
        {fontSize: P ? '100px' : '118px'});
      const desktop = box(node, 'content b-desktop', P ? 138 : 258, P ? 648 : 358,
        P ? 804 : 1404, P ? 664 : 514,
        {background: '#111113', borderRadius: '12px', overflow: 'hidden'});
      const dw = P ? 804 : 1404, dh = P ? 664 : 514;
      label(desktop, 'OMA', 36, 28, 190, {fontSize: P ? '37px' : '30px', letterSpacing: '.08em'});
      const topLine = box(desktop, '', 36, 86, dw - 72, 2, {background: '#52525b'});
      const sidebar = svg('0 0 130 310',
        '<path d="M30 18H98M30 98H70M30 178H98M30 258H70" fill="none" stroke="#71717a" stroke-width="8" stroke-linecap="round"/>',
        {position: 'absolute', left: '24px', top: P ? '140px' : '138px', width: '106px', height: P ? '410px' : '266px'}, desktop);
      const terminal = box(desktop, '', P ? 180 : 206, P ? 132 : 122, P ? 562 : 630, P ? 326 : 300,
        {background: '#18181b', border: '2px solid #52525b', borderRadius: '14px'});
      const code = svg('0 0 620 290',
        '<path class="b-prompt" d="M90 66L192 145L90 224" fill="none" stroke="#fafafa" stroke-width="22" stroke-linecap="square" stroke-linejoin="miter"/>' +
        '<path class="b-cursor" d="M262 224H394" fill="none" stroke="#f97316" stroke-width="22"/>' +
        '<path class="b-code-line" d="M306 68H492M350 118H534M435 169H534" fill="none" stroke="#52525b" stroke-width="10"/>',
        {width: '100%', height: '100%'}, terminal);
      const toolRail = box(desktop, '', P ? 183 : 892, P ? 489 : 123, P ? 557 : 444, P ? 110 : 300);
      const rail = svg(P ? '0 0 557 110' : '0 0 444 300', P ?
        '<path class="b-tool-path" d="M15 55H539" stroke="#52525b" stroke-width="3"/><path class="b-tool-path" d="M60 25L30 55L60 85M98 25L128 55L98 85" fill="none" stroke="#fafafa" stroke-width="8"/><path class="b-tool-path" d="M245 20H317V92H245Z" fill="#18181b" stroke="#fafafa" stroke-width="7"/><path class="b-tool-path" d="M472 17V93M434 55H510" stroke="#f97316" stroke-width="9"/>' :
        '<path class="b-tool-path" d="M20 50H397V252H20" fill="none" stroke="#52525b" stroke-width="3"/><path class="b-tool-path" d="M67 16L28 51L67 86M111 16L150 51L111 86" fill="none" stroke="#fafafa" stroke-width="9"/><path class="b-tool-path" d="M225 18H299V91H225Z" fill="#18181b" stroke="#fafafa" stroke-width="7"/><path class="b-tool-path" d="M262 188V269M222 229H303" stroke="#f97316" stroke-width="10"/><path class="b-tool-path" d="M61 198H122V259H61Z" fill="#18181b" stroke="#71717a" stroke-width="7"/>',
        {width: '100%', height: '100%'}, toolRail);
      reveal(tl, desktop, {clipPath: 'inset(0 95% 0 0)'}, {clipPath: 'inset(0 0% 0 0)', duration: .64, ease: 'power3.out'}, .08);
      reveal(tl, terminal, {x: -65, scale: .93}, {x: 0, scale: 1, duration: .8, ease: 'power3.out'}, .14);
      pathReveal(tl, Array.from(code.querySelectorAll('path')), .3, .65);
      pathReveal(tl, Array.from(rail.querySelectorAll('.b-tool-path')), .4, .7);
      reveal(tl, sidebar, {y: 24, opacity: .25}, {y: 0, opacity: 1, duration: .7, ease: 'power2.out'}, .28);
      reveal(tl, code.querySelector('.b-cursor'), {x: -12}, {x: 12, duration: 1.5, ease: 'sine.inOut'}, .86);
      return {id: 6, node, timeline: tl};
    }

    function buildReusable() {
      const node = ctx.scene(7), tl = timeline();
      title(node, P ? 'Make it\nreusable.' : 'Make it\nreusable.', P ? 88 : 120, P ? 300 : 200,
        P ? 904 : 600, {fontSize: P ? '105px' : '108px'});
      const x = P ? 229 : 719, y = P ? 699 : 299, w = P ? 622 : 772, h = P ? 622 : 602;
      const packageGroup = box(node, 'content b-package', x, y, w, h);
      const leaves = [];
      for (let i = 0; i < 3; i++) {
        leaves.push(box(packageGroup, 'b-package-leaf', P ? 51 : 86, P ? 76 : 51, P ? 520 : 598, P ? 456 : 453,
          {background: i === 2 ? '#18181b' : '#111113', border: `3px solid ${i === 2 ? '#71717a' : '#52525b'}`,
            borderRadius: '15px', transformOrigin: '50% 100%'}));
      }
      const face = leaves[2];
      const glyph = svg('0 0 600 445',
        '<path class="b-bracket" d="M173 124L72 222L173 320M427 124L528 222L427 320" stroke="#fafafa" stroke-width="22" fill="none" stroke-linejoin="miter"/>' +
        '<path class="b-slash" d="M350 91L248 350" stroke="#f97316" stroke-width="25" fill="none"/>' +
        '<path class="b-package-register" d="M27 47H76M27 47V96M524 397H573M573 348V397" stroke="#71717a" stroke-width="5" fill="none"/>',
        {position: 'absolute', inset: '0', width: '100%', height: '100%'}, face);
      label(packageGroup, 'Tons of Skills', 0, P ? 568 : 536, w,
        {fontSize: P ? '38px' : '34px', textAlign: 'center'});
      reveal(tl, leaves[0], {rotation: 0, x: 0, y: 25}, {rotation: -12, x: P ? -27 : -32, y: -15, duration: .85, ease: 'power3.out'}, .13);
      reveal(tl, leaves[1], {rotation: 0, x: 0, y: 25}, {rotation: 10, x: P ? 30 : 32, y: -16, duration: .9, ease: 'power3.out'}, .18);
      reveal(tl, face, {scale: .78, y: 42}, {scale: 1, y: 0, duration: .8, ease: 'power3.out'}, .12);
      pathReveal(tl, Array.from(glyph.querySelectorAll('path')), .27, .74);
      reveal(tl, glyph.querySelector('.b-slash'), {y: 10}, {y: -9, duration: 1.35, ease: 'sine.inOut'}, .92);
      return {id: 7, node, timeline: tl};
    }

    function buildBreadth() {
      const node = ctx.scene(8), tl = timeline();
      const rows = P ? [
        {word: 'Services.', x: 165, y: 525, w: 820, size: 151, offset: -40},
        {word: 'Products.', x: 175, y: 810, w: 770, size: 145, offset: 100},
        {word: 'Open source.', x: 118, y: 1110, w: 844, size: 120, offset: -10}
      ] : [
        {word: 'Services.', x: 225, y: 213, w: 1500, size: 195, offset: -65},
        {word: 'Products.', x: 408, y: 453, w: 1270, size: 185, offset: 145},
        {word: 'Open source.', x: 225, y: 700, w: 1600, size: 165, offset: -65}
      ];
      rows.forEach((r, i) => {
        const row = title(node, '', r.x, r.y, r.w,
          {fontSize: `${r.size}px`, letterSpacing: P ? '-7px' : '-9px', overflow: 'visible', lineHeight: '.98'});
        const word = el('span', {text: r.word, style: {display: 'block'}}, row);
        reveal(tl, word, {x: r.offset, skewX: i === 1 ? -7 : 6, scaleX: .92},
          {x: 0, skewX: 0, scaleX: 1, duration: .76, ease: 'power4.out'}, .12 + i * .11);
      });
      const mark = svg(P ? '0 0 840 790' : '0 0 1540 655', P ?
        '<path class="b-breadth-rule" d="M15 232H777M97 522H832" stroke="#52525b" stroke-width="3"/><path class="b-breadth-rule" d="M700 209H776V133M18 501V576H94" fill="none" stroke="#f97316" stroke-width="9"/>' :
        '<path class="b-breadth-rule" d="M0 224H1490M244 465H1515" stroke="#52525b" stroke-width="3"/><path class="b-breadth-rule" d="M1331 0H1490V159M0 306V465H159" fill="none" stroke="#f97316" stroke-width="11"/>',
        {position: 'absolute', left: P ? '120px' : '158px', top: P ? '530px' : '221px', width: P ? '780px' : '1540px', height: P ? '734px' : '655px'}, node);
      pathReveal(tl, Array.from(mark.querySelectorAll('path')), .3, .85);
      return {id: 8, node, timeline: tl};
    }

    function buildConnected() {
      const node = ctx.scene(9), tl = timeline();
      title(node, P ? 'One connected\ncompany.' : 'One connected company.', P ? 88 : 120, P ? 300 : 173,
        P ? 904 : 1660, {fontSize: P ? '97px' : '107px'});
      const center = P ? {x: 540, y: 932} : {x: 960, y: 550};
      const points = P ? [
        {text: 'Labs / Evals', x: 288, y: 648, width: 350},
        {text: 'Demos', x: 793, y: 648, width: 240},
        {text: 'Learn', x: 807, y: 1224, width: 230},
        {text: 'OMA', x: 281, y: 1224, width: 180},
        {text: 'Tons of Skills', x: 540, y: 1445, width: 400}
      ] : [
        {text: 'Labs / Evals', x: 400, y: 398, width: 390},
        {text: 'Demos', x: 1455, y: 398, width: 240},
        {text: 'Learn', x: 1520, y: 785, width: 230},
        {text: 'OMA', x: 400, y: 785, width: 190},
        {text: 'Tons of Skills', x: 969, y: 880, width: 430}
      ];
      const paths = points.map((p, i) => {
        const endY = p.y + (p.y < center.y ? 48 : -24);
        const midY = center.y + (endY - center.y) * .56;
        return `<path class="b-network-path" d="M${center.x} ${center.y}C${center.x} ${midY} ${p.x} ${midY} ${p.x} ${endY}" fill="none" stroke="${i === 0 || i === 4 ? orange : zinc}" stroke-width="${P ? 5 : 4}"/>`;
      }).join('');
      const network = svg(`0 0 ${W} ${H}`, paths,
        {position: 'absolute', inset: '0', width: '100%', height: '100%'}, node);
      const core = box(node, 'content', P ? 332 : 780, P ? 810 : 425, P ? 416 : 360, P ? 245 : 250,
        {background: '#09090b'});
      const sign = logo(P ? 115 : 106, core,
        {position: 'absolute', left: P ? '151px' : '127px', top: P ? '8px' : '5px'});
      label(core, 'Intent Solutions', 0, P ? 154 : 152, P ? 416 : 360,
        {fontSize: P ? '42px' : '37px', textAlign: 'center', fontFamily: 'Syne, sans-serif', fontWeight: '700'});
      points.forEach((p, i) => {
        const g = box(node, 'b-network-node', p.x - p.width / 2, p.y - 20, p.width, 70,
          {background: '#09090b'});
        label(g, p.text, 0, 0, p.width,
          {textAlign: 'center', fontSize: P ? '42px' : '42px', fontWeight: '600', letterSpacing: '-.025em'});
        const d = box(g, '', p.width / 2 - 5, p.y < center.y ? 62 : -19, 10, 10,
          {background: orange, borderRadius: '50%'});
        reveal(tl, g, {y: p.y < center.y ? -18 : 18, opacity: 0},
          {y: 0, opacity: 1, duration: .55, ease: 'power2.out'}, .08 + i * .045);
      });
      pathReveal(tl, Array.from(network.querySelectorAll('path')), .07, .8);
      points.forEach((p,i)=>{const g=node.querySelectorAll('.b-network-node')[i];tl.to(g,{x:center.x-p.x,y:center.y-p.y,scale:.15,opacity:0,duration:.4,ease:'power3.in'},2.08)});
      tl.to(network,{scale:.15,opacity:0,duration:.4,ease:'power3.in',transformOrigin:`${center.x}px ${center.y}px`},2.08);
      reveal(tl, sign, {scale: .7, rotation: -8}, {scale: 1, rotation: 0, duration: .75, ease: 'power3.out'}, .16);
      return {id: 9, node, timeline: tl};
    }

    function buildSignature() {
      const node = ctx.scene(10), tl = timeline();
      const size = P ? 492 : 430;
      const mark = logo(size, node, {position: 'absolute', left: P ? '294px' : '750px', top: P ? '674px' : '300px'});
      title(node, P ? 'Built. Tested.\nShared.' : 'Built. Tested. Shared.', P ? 88 : 200, P ? 1320 : 850,
        P ? 904 : 1580, {fontSize: P ? '99px' : '111px', textAlign: 'center', letterSpacing: '-4px'});
      reveal(tl, mark, {scale: .78, rotation: -7}, {scale: 1, rotation: 0, duration: .86, ease: 'power3.out'}, .04);
      const rays = svg('0 0 1600 900',
        '<path class="b-converge" d="M170 440H490M830 80V125M1100 440H1430M830 730V785" fill="none" stroke="#52525b" stroke-width="3"/>' +
        '<path class="b-converge" d="M290 190L514 366M1360 190L1121 376" fill="none" stroke="#71717a" stroke-width="3"/>',
        {position: 'absolute', left: P ? '-62px' : '160px', top: P ? '570px' : '50px', width: P ? '1205px' : '1600px', height: P ? '678px' : '900px', zIndex: '-1'}, node);
      pathReveal(tl, Array.from(rays.querySelectorAll('path')), .04, .8);
      reveal(tl, rays, {opacity: .8, scale: 1.06}, {opacity: .28, scale: 1, duration: 1.6, ease: 'power2.out'}, .8);
      return {id: 10, node, timeline: tl};
    }

    function buildClose() {
      const node = ctx.scene(11), tl = timeline();
      const mark = logo(162, node, {position: 'absolute', left: P ? '459px' : '229px', top: P ? '409px' : '349px'});
      title(node, 'Request an\noutcome', P ? 88 : 540, P ? 795 : 326, P ? 904 : 1220,
        {fontSize: P ? '119px' : '142px', lineHeight: '.99', textAlign: P ? 'center' : 'left', letterSpacing: '-6px'});
      const url = label(node, 'intentsolutions.io', P ? 88 : 547, P ? 1135 : 691, P ? 904 : 1090,
        {fontSize: P ? '59px' : '57px', fontWeight: '500', textAlign: P ? 'center' : 'left', letterSpacing: '-1.5px'});
      const rule = box(node, '', P ? 310 : 548, P ? 1263 : 788, P ? 460 : 670, 5, {background: orange});
      reveal(tl, mark, {scale: .94}, {scale: 1, duration: .6, ease: 'power3.out'}, 0);
      reveal(tl, url, {opacity: 0, y: 14}, {opacity: 1, y: 0, duration: .45, ease: 'power2.out'}, .12);
      reveal(tl, rule, {scaleX: .05, transformOrigin: P ? 'center' : 'left center'},
        {scaleX: 1, duration: .75, ease: 'power3.out'}, .07);
      return {id: 11, node, timeline: tl};
    }

    return [buildPublic(), buildReusable(), buildBreadth(), buildConnected(), buildSignature(), buildClose()];
  };
})();
