#!/usr/bin/env node
// Renders the canonical estate bar fragment for every carrier site from
// links.json, and writes manifest.sha256. No dependencies.
//   node estate-bar/render.mjs          write fragments/ + manifest
//   node estate-bar/render.mjs --check  fail if fragments/ or manifest is stale
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const spec = JSON.parse(readFileSync(join(root, 'links.json'), 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

export function renderBar(site) {
  if (!spec.carriers.includes(site)) throw new Error(`unknown carrier site: ${site}`);
  const links = spec.links.map(({ site: s, label, href }) =>
    `    <a href="${esc(href)}"${s === site ? ' aria-current="page"' : ''}>${esc(label)}</a>`);
  return [
    `<!-- estate-bar:start v${spec.version} site=${site} -->`,
    `<nav class="is-estate-bar" aria-label="${esc(spec.aria_label)}">`,
    `  <div class="is-estate-bar__inner">`,
    ...links,
    `  </div>`,
    `</nav>`,
    `<!-- estate-bar:end -->`,
    '',
  ].join('\n');
}

const sha = (buf) => createHash('sha256').update(buf).digest('hex');

function build() {
  const out = new Map();
  for (const site of spec.carriers) out.set(`fragments/estate-bar.${site}.html`, renderBar(site));
  const tracked = ['links.json', 'estate-bar.css', 'fonts/JetBrainsMono-Medium.woff2'];
  const lines = [];
  for (const f of tracked) lines.push(`${sha(readFileSync(join(root, f)))}  ${f}`);
  for (const [f, body] of out) lines.push(`${sha(Buffer.from(body))}  ${f}`);
  out.set('manifest.sha256', lines.join('\n') + '\n');
  return out;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes('--check');
  let stale = 0;
  for (const [f, body] of build()) {
    const p = join(root, f);
    if (check) {
      if (!existsSync(p) || readFileSync(p, 'utf8') !== body) { console.error(`stale: ${f}`); stale++; }
    } else {
      writeFileSync(p, body);
      console.log(`wrote ${f}`);
    }
  }
  if (stale) { console.error('Run: node estate-bar/render.mjs'); process.exit(1); }
  if (check) console.log('estate-bar: fragments and manifest are current');
}
