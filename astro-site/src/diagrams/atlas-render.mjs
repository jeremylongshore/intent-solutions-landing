import { atlasPages, atlasPath, atlasDate, chapterNames } from '../data/operating-atlas.mjs';

export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const statusLabels = {existing:'Existing capability',mixed:'Existing + developing',proposed:'Proposed model','in-progress':'In development','in-development':'In development',unproven:'Unvalidated outcome'};
const palette = {orange:'#ffab70',cyan:'#73d6df',green:'#90d4ae',purple:'#c3a4ef',blue:'#8abcf5',amber:'#ecd080',slate:'#b2bfce'};
const color = key => palette[key] || palette.slate;
const loc = n => `left:${n.x}px;top:${n.y}px;width:${n.w}px;height:${n.h}px;--tone:${color(n.color)}`;

export function renderDiagram(page) {
  const d = page.diagram;
  const id = `atlas-${page.id}`;
  const regions = (d.regions || []).map(r=>`<div class="atlas-region" style="${loc(r)}"><span>${esc(r.label)}</span></div>`).join('\n');
  const nodes = d.nodes.map(n=>`<article class="atlas-node shape-${esc(n.shape || 'card')} status-${esc(n.status || 'unspecified')}" data-node-id="${esc(n.id)}" tabindex="0" aria-label="${esc(n.title)}${n.status ? `: ${esc(statusLabels[n.status] || n.status)}` : ''}" style="${loc(n)}">
    ${n.eyebrow ? `<p class="node-eyebrow">${esc(n.eyebrow)}</p>` : ''}
    <h3>${n.href ? `<a href="${esc(n.href)}">${esc(n.title)} <span aria-hidden="true">↗</span></a>` : esc(n.title)}</h3>
    ${n.body ? `<p class="node-body">${esc(n.body)}</p>` : ''}
    ${n.items?.length ? `<ul class="node-items">${n.items.map(item=>`<li>${item.href ? `<a href="${esc(item.href)}">${esc(item.label)} <span aria-hidden="true">↗</span></a>` : esc(item.label)}</li>`).join('')}</ul>` : ''}
    ${n.status && n.status !== 'existing' ? `<span class="node-status">${esc(statusLabels[n.status] || n.status)}</span>` : ''}
  </article>`).join('\n');
  const paths = d.edges.map((e,i)=>`<path class="atlas-edge edge-${esc(e.kind)}" data-edge-from="${esc(e.from)}" data-edge-to="${esc(e.to)}" d="${esc(e.path)}" stroke="${color(e.color)}" marker-end="url(#${id}-arrow-${e.color || 'slate'})"/><title>${esc(e.label || `${e.from} to ${e.to}`)}</title>`).join('\n');
  const labels = d.edges.filter(e=>e.label).map(e=>`<text class="edge-label" x="${e.labelX}" y="${e.labelY}" text-anchor="middle">${esc(e.label)}</text>`).join('\n');
  return `<div class="diagram-scroll" tabindex="0" aria-label="${esc(page.title)} diagram. Scroll horizontally for the full drawing."><div class="diagram-stage" style="width:${d.width}px;height:${d.height}px;min-width:${d.width}px" data-page="${esc(page.id)}">
    ${regions}
    <svg class="atlas-arrows" viewBox="0 0 ${d.width} ${d.height}" role="img" aria-labelledby="${id}-title ${id}-desc" xmlns="http://www.w3.org/2000/svg">
      <title id="${id}-title">${esc(page.title)} — relationships</title><desc id="${id}-desc">${esc(d.description)}</desc>
      <defs>${Object.entries(palette).map(([name,hex])=>`<marker id="${id}-arrow-${name}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M1 1 L7 4 L1 7" fill="none" stroke="${hex}" stroke-width="1.4"/></marker>`).join('')}</defs>
      ${paths}${labels}
    </svg>
    ${nodes}
    ${(d.notes || []).map(n=>`<p class="atlas-stage-note" style="left:${n.x}px;top:${n.y}px;width:${n.w}px">${esc(n.text)}</p>`).join('\n')}
  </div></div>`;
}

export function renderPage(page, {stylesheet,estateBar,estateStyle,brandMark}) {
  const i = atlasPages.indexOf(page);
  const previous = atlasPages[i-1]; const next = atlasPages[i+1];
  const graphStem = atlasPath(page.id).replace('.html','');
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(chapterNames[page.id])} | Intent Solutions Operating Atlas</title>
<meta name="description" content="${esc(page.lead)}"><link rel="canonical" href="https://intentsolutions.io${atlasPath(page.id)}">
<meta name="theme-color" content="#0f1117"><style>${estateStyle}\n${stylesheet}</style></head>
<body class="operating-atlas"><a class="atlas-skip" href="#atlas-content">Skip to the diagram</a>
${estateBar}
<div class="atlas-layout">
<aside class="atlas-rail" aria-label="Atlas navigation">
  <a class="atlas-brand" href="/estate/">${brandMark}<span>INTENT<br>SOLUTIONS</span></a>
  <p class="rail-caption">THE OPERATING ATLAS<br><span>Macro → micro · October 2026</span></p>
  <nav aria-label="Eight views of the estate"><ol class="atlas-chapters">${atlasPages.map(p=>`<li><a href="${atlasPath(p.id)}" ${p.id===page.id ? 'aria-current="page"' : ''}><span>${p.number}</span>${esc(chapterNames[p.id])}</a></li>`).join('')}</ol></nav>
  <div class="rail-invariants"><p class="rail-label">ONE OPERATING STANDARD</p><ul><li>Start with the outcome.</li><li>Make the claim testable.</li><li>Name who owns the result.</li><li>Leave capability with the customer.</li></ul></div>
  <a class="rail-home" href="/estate/">← Company overview</a>
</aside>
<main id="atlas-content" class="atlas-main">
  <header class="atlas-heading"><div class="atlas-kicker"><span>${page.number} / 08</span>${esc(page.kicker)}</div><h1>${esc(page.title)}</h1><p class="atlas-lead">${esc(page.lead)}</p></header>
  <figure class="atlas-figure">
    <div class="atlas-toolbar"><h2>INTENT SOLUTIONS / ${esc(chapterNames[page.id]).toUpperCase()}</h2><div><button type="button" data-reset>Reset focus</button><button type="button" data-fullscreen>Expand view</button></div></div>
    ${renderDiagram(page)}
    <figcaption>${esc(page.takeaway)}</figcaption>
  </figure>
  <div class="atlas-key"><span><i class="key-flow"></i>Work / artifact flow</span><span><i class="key-feedback"></i>Feedback</span><span><i class="key-governance"></i>Control / shared support</span><span><i class="key-proposed"></i>Proposed boundary</span><span>Select a node to trace its connections.</span></div>
  <section class="atlas-details" aria-label="Interpret this view">${page.panels.map(p=>`<article><h2>${esc(p.title)}</h2><p>${esc(p.body)}</p>${p.items?.length ? `<ul>${p.items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>` : ''}</article>`).join('\n')}</section>
  ${(page.tables || []).map(t=>`<section class="atlas-table-section"><h2>${esc(t.title)}</h2><p>${esc(t.description)}</p><div class="atlas-table-scroll" tabindex="0" aria-label="Scroll the commercial model comparison"><table><thead><tr>${t.columns.map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(row=>`<tr>${row.map((v,i)=>i?`<td>${esc(v)}</td>`:`<th scope="row">${esc(v)}</th>`).join('')}</tr>`).join('')}</tbody></table></div></section>`).join('')}
  <details class="atlas-text"><summary>Read the relationships as text</summary><p>${esc(page.diagram.description)}</p><ul>${page.diagram.edges.map(e=>`<li><strong>${esc(page.diagram.nodes.find(n=>n.id===e.from)?.title || e.from)}</strong> → ${esc(page.diagram.nodes.find(n=>n.id===e.to)?.title || e.to)}${e.label ? `: ${esc(e.label)}` : ''} <span>(${esc(e.kind)})</span></li>`).join('')}</ul></details>
  <section class="atlas-sources" aria-labelledby="sources-heading"><h2 id="sources-heading">Basis and scope</h2><p>Reviewed ${atlasDate}. Public links support the named properties and capabilities. The relationships explain the operating method and owner-directed vision; they do not imply that every initiative is deployed or commercially proven.</p><ul>${page.sources.map(s=>`<li>${s.href ? `<a href="${esc(s.href)}">${esc(s.label)} ↗</a>` : esc(s.label)}</li>`).join('')}</ul><p class="atlas-downloads"><a href="${graphStem}.mmd" download>Mermaid source</a><a href="/estate-blueprint.graph.json" download>Complete source graph</a><a href="/intent-solutions-operating-atlas.pdf" download>Workshop PDF</a><a href="/estate-blueprint.print.html">Print view</a></p></section>
  <nav class="atlas-pagination" aria-label="Adjacent chapters">${previous ? `<a href="${atlasPath(previous.id)}">← ${previous.number} / ${esc(chapterNames[previous.id])}</a>` : '<span>One company. Eight complementary views.</span>'}${next ? `<a href="${atlasPath(next.id)}">${next.number} / ${esc(chapterNames[next.id])} →</a>` : '<a href="/contact/?door=outcome">Request an outcome →</a>'}</nav>
</main></div><script>${interactionScript}</script></body></html>`;
}

export const interactionScript = `
document.querySelectorAll('.diagram-stage').forEach(stage => {
  const nodes = [...stage.querySelectorAll('[data-node-id]')];
  const edges = [...stage.querySelectorAll('[data-edge-from]')];
  const reset = () => {nodes.forEach(n => n.classList.remove('is-selected','is-neighbor')); edges.forEach(e => e.classList.remove('is-active','is-quiet'));};
  const select = node => {reset(); const id = node.dataset.nodeId; node.classList.add('is-selected'); const related = new Set([id]); edges.forEach(edge=>{const active=edge.dataset.edgeFrom===id||edge.dataset.edgeTo===id; edge.classList.add(active?'is-active':'is-quiet');if(active){related.add(edge.dataset.edgeFrom);related.add(edge.dataset.edgeTo);}});nodes.forEach(n=>{if(related.has(n.dataset.nodeId)&&n!==node)n.classList.add('is-neighbor');});};
  nodes.forEach(node=>{node.addEventListener('click',event=>{if(!event.target.closest('a'))select(node);});node.addEventListener('keydown',event=>{if(event.target.closest('a'))return;if(event.key==='Enter'||event.key===' '){event.preventDefault();select(node);}if(event.key==='Escape')reset();});});
  const figure=stage.closest('figure'); figure?.querySelector('[data-reset]')?.addEventListener('click',reset);
  figure?.querySelector('[data-fullscreen]')?.addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen();else figure.requestFullscreen?.();});
});`;
