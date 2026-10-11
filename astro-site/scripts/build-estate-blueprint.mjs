import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { atlasPages, atlasPath, atlasDate, chapterNames } from '../src/data/operating-atlas.mjs';
import { renderPage, renderDiagram, esc } from '../src/diagrams/atlas-render.mjs';

const root = new URL('../', import.meta.url).pathname;
const fragment = readFileSync(join(root, '../estate-bar/fragments/estate-bar.company.html'), 'utf8').trim();
const estateStyle = readFileSync(join(root, '../estate-bar/estate-bar.css'), 'utf8').replace(
  'url("fonts/JetBrainsMono-Medium.woff2")',
  `url("data:font/woff2;base64,${readFileSync(join(root, '../estate-bar/fonts/JetBrainsMono-Medium.woff2')).toString('base64')}")`,
);
const brandMark = readFileSync(join(root,'public/favicon.svg'),'utf8').replace('<svg ', '<svg class="atlas-brand-mark" role="img" aria-label="Intent Solutions mark" ');
const stylesheet = readFileSync(join(root, 'src/diagrams/operating-atlas.css'), 'utf8');
const graph = {schema_version:'1',name:'Intent Solutions operating atlas',date:atlasDate,scope:'Company operating model; mixed existing and proposed capabilities',nodes:[],edges:[],pages:atlasPages.map(({mermaid,...page})=>page)};
function toMermaid(page) {
  const id = value => value.replaceAll('-', '_');
  const label = value => String(value).replaceAll('"', "'").replaceAll('\n',' ');
  return ['flowchart TB', ...page.diagram.nodes.map(n=>`  ${id(n.id)}["${label(n.title)}${n.status ? ` (${label(n.status)})` : ''}"]`), ...page.diagram.edges.map(e=>`  ${id(e.from)} ${e.kind==='flow'?'-->':'-.->'}${e.label || e.kind !== 'flow' ? `|"${label([e.label, e.kind !== 'flow' ? e.kind : ''].filter(Boolean).join(' / '))}"|` : ''} ${id(e.to)}`), ''].join('\n');
}
for (const page of atlasPages) {
  const ids = new Set(page.diagram.nodes.map(n=>n.id));
  if(ids.size!==page.diagram.nodes.length) throw new Error(`Duplicate node ID: ${page.id}`);
  for(const edge of page.diagram.edges) if(!ids.has(edge.from)||!ids.has(edge.to)) throw new Error(`Unresolved edge: ${page.id} ${edge.from} -> ${edge.to}`);
  const output = renderPage(page,{stylesheet,estateBar:fragment,estateStyle,brandMark});
  writeFileSync(join(root,'public',atlasPath(page.id)),output.replace(/[ \t]+$/gm,''));
  writeFileSync(join(root,'public',atlasPath(page.id).replace('.html','.mmd')),toMermaid(page));
  graph.nodes.push(...page.diagram.nodes.map(n=>({id:`${page.id}/${n.id}`,label:n.title,role:n.shape==='gate'?'security':'external',semanticRole:n.eyebrow,color:n.color,group:page.id,status:n.status||'unspecified',pageStatus:page.status,source:`astro-site/src/data/atlas-${['estate','compounding','spine','evidence'].includes(page.id)?'foundation':page.id==='delivery'?'delivery':'network'}.mjs#${page.id}/${n.id}`,sources:page.sources})));
  graph.edges.push(...page.diagram.edges.map(e=>({...e,relationship:e.kind,kind:'unknown',source:`atlas:${page.id}`,from:`${page.id}/${e.from}`,to:`${page.id}/${e.to}`})));
}
writeFileSync(join(root,'public/estate-blueprint.graph.json'),JSON.stringify(graph,null,2)+'\n');
const contentHash = createHash('sha256').update(JSON.stringify(atlasPages)).digest('hex');
writeFileSync(join(root,'public/estate-blueprint.manifest.json'),JSON.stringify({date:atlasDate,contentSha256:contentHash,pages:atlasPages.map(p=>({id:p.id,href:atlasPath(p.id),nodes:p.diagram.nodes.length,edges:p.diagram.edges.length,sources:p.sources})),scope:'Content hash includes labels, status, sources, geometry and explanatory text. Structural fingerprints are maintained separately.'},null,2)+'\n');
const print = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Printable Intent Solutions Operating Atlas</title><style>${estateStyle}\n${stylesheet}</style></head><body class="operating-atlas">${fragment}\n${atlasPages.map((page,i)=>`<section class="atlas-print-sheet"><header class="atlas-heading"><p class="atlas-kicker">INTENT SOLUTIONS · OPERATING ATLAS · ${page.number} / 08 · ${esc(chapterNames[page.id])}</p><${i?'h2':'h1'}>${esc(page.title)}</${i?'h2':'h1'}><p class="atlas-lead">${esc(page.lead)}</p></header><figure class="atlas-figure">${i ? '' : '<h2 class="atlas-sr-only">Company architecture</h2>'}${renderDiagram(page)}<figcaption>${esc(page.takeaway)}</figcaption></figure><p class="atlas-print-note">Solid: work / artifacts · Dashed: feedback · Dotted: control / support · Dashed boundary: proposed. Review ${atlasDate}. Sources and scope: https://intentsolutions.io${atlasPath(page.id)}</p></section>`).join('\n')}</body></html>`;
writeFileSync(join(root,'public/estate-blueprint.print.html'),print.replace(/[ \t]+$/gm,''));
mkdirSync(join(root,'../.arch'),{recursive:true});
console.log(`estate-blueprint: ${atlasPages.length} self-contained chapters, print edition, Mermaid sources and ${graph.nodes.length}-node graph`);
