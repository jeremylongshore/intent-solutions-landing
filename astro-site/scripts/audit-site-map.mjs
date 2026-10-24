import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pages, legacy, properties, staticPages } from '../src/data/site-map.mjs';

const root = new URL('../', import.meta.url);
const entries = [...pages, ...legacy];
const sourceFiles = fs.readdirSync(new URL('src/pages/', root), { recursive: true }).filter((p) => /\.(astro|ts)$/.test(p));
const sourceRoute = (file) => {
  const route = '/' + file.replace(/\.(astro|ts)$/, '').replace(/(^|\/)index$/, '$1');
  return route.endsWith('.xml') ? route : route.replace(/\/?$/, '/');
};
assert.equal(new Set(entries.map((e) => e.path)).size, entries.length, 'Duplicate route contract');

// A property named in the canonical estate bar must carry the same label here.
// The footer reads the list directly; this file adds purposes, so it is checked.
const estate = JSON.parse(fs.readFileSync(new URL('../estate-bar/links.json', root), 'utf8'));
const canonicalLabel = new Map(estate.links.map((link) => [link.href, link.label]));
for (const property of properties) {
  const expected = canonicalLabel.get(property.href);
  if (expected) assert.equal(property.label, expected, `site-map label for ${property.href} must match the estate bar`);
}
assert.deepEqual(sourceFiles.map(sourceRoute).sort(), entries.map((e) => e.path).sort(), 'Every source page needs an individual contract');
const sitemap = fs.readFileSync(new URL('dist/sitemap-0.xml', root), 'utf8');
const fileFor = (path) => new URL('dist/' + (path === '/404/' ? '404.html' : path.slice(1) + 'index.html'), root);
let links = 0;
for (const entry of entries.filter((e) => !e.path.includes('[') && !e.path.endsWith('.xml'))) {
  const html = fs.readFileSync(fileFor(entry.path), 'utf8');
  assert.equal(/<h1\b/g.test(html), true, `Missing h1: ${entry.path}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Multiple h1: ${entry.path}`);
  const robots = html.match(/<meta[^>]+name="robots"[^>]*>/)?.[0] || '';
  if (entry.index === false) {
    assert.match(robots, /noindex/, `Non-indexable route needs noindex: ${entry.path}`);
    assert.ok(!sitemap.includes(`https://intentsolutions.io${entry.path}</loc>`), `Excluded page leaked: ${entry.path}`);
  } else {
    assert.ok(!robots.includes('noindex'), `Indexable page blocked: ${entry.path}`);
    assert.ok(sitemap.includes(`https://intentsolutions.io${entry.path}</loc>`), `Indexable page absent: ${entry.path}`);
  }
  for (const match of html.matchAll(/href="([^"<>]+)"/g)) {
    const href = match[1];
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, `https://intentsolutions.io${entry.path}`);
    if (url.pathname.endsWith('.xml')) continue;
    const isAsset = /\.[a-z0-9]+$/i.test(url.pathname);
    const target = isAsset ? new URL('dist' + url.pathname, root) : fileFor(url.pathname.replace(/\/?$/, '/'));
    assert.ok(fs.existsSync(target), `Broken internal link ${entry.path} -> ${href}`);
    if (url.hash && !isAsset) {
      const content = fs.readFileSync(target, 'utf8');
      assert.ok(content.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor ${entry.path} -> ${href}`);
    }
    links++;
  }
}
// Standalone HTML in public/: each file is classified exactly once, indexable
// pages are self-canonical and in the XML sitemap, the rest are noindex and absent.
const publicDir = new URL('public/', root);
const publicHtml = fs.readdirSync(publicDir, { recursive: true }).filter((p) => p.endsWith('.html')).map((p) => '/' + p.split('\\').join('/'));
const covers = (entry, path) => (entry.path.endsWith('*') ? path.startsWith(entry.path.slice(0, -1)) : path === entry.path);
assert.equal(new Set(staticPages.map((e) => e.path)).size, staticPages.length, 'Duplicate static page contract');
for (const path of publicHtml) {
  const matches = staticPages.filter((entry) => covers(entry, path));
  assert.equal(matches.length, 1, `Public HTML needs exactly one static contract: ${path} (${matches.length} match)`);
  const entry = matches[0];
  const html = fs.readFileSync(new URL('dist' + path, root), 'utf8');
  const robots = html.match(/<meta[^>]+name="robots"[^>]*>/)?.[0] || '';
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1];
  const loc = `https://intentsolutions.io${path}</loc>`;
  if (entry.index === true) {
    assert.ok(!robots.includes('noindex'), `Indexable public page blocked: ${path}`);
    assert.equal(canonical, `https://intentsolutions.io${path}`, `Indexable public page must be self-canonical: ${path}`);
    assert.ok(sitemap.includes(loc), `Indexable public page absent from sitemap: ${path}`);
  } else {
    assert.match(robots, /noindex/, `Non-indexable public page needs noindex: ${path}`);
    assert.ok(!sitemap.includes(loc), `Excluded public page leaked into sitemap: ${path}`);
  }
}
for (const entry of staticPages.filter((e) => !e.path.endsWith('*'))) {
  assert.ok(publicHtml.includes(entry.path), `Static contract names a missing file: ${entry.path}`);
}
const indexedStatic = publicHtml.filter((path) => staticPages.find((e) => covers(e, path)).index === true).length;

console.log(`PASS: ${entries.length} individually mapped routes; ${links} internal links and anchors; ${publicHtml.length} public HTML files (${indexedStatic} indexable); indexing contract.`);
