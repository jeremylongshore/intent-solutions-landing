#!/usr/bin/env node
// Indexability regression guard. Run AFTER `astro build` against ./dist.
//
// Asserts the deployed artifact can't silently regress into the Search Console
// failure modes this repo fixed in 000-docs/0NN-OD-search-console-indexing-audit.md:
//   - every sitemap URL maps to a real built file (no soft-404)
//   - every sitemap page is self-canonical and on-domain
//   - no sitemap URL carries an off-domain canonical (field-note cross-posts leak)
//   - no two indexable pages share an identical <title>
//   - robots.txt exists and points at the sitemap; 404.html exists
//
// Node built-ins only — no deps. Exits non-zero on any violation.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SITE_HOST = 'intentsolutions.io';
const distDir = fileURLToPath(new URL('../dist/', import.meta.url));

/** @type {string[]} */
const errors = [];
const fail = (msg) => errors.push(msg);

// ── Locate sitemap ──────────────────────────────────────────────────────────
const sitemapPath = `${distDir}sitemap-0.xml`;
if (!existsSync(sitemapPath)) {
  console.error(`FATAL: ${sitemapPath} not found — did the build run with @astrojs/sitemap?`);
  process.exit(1);
}
const sitemapXml = readFileSync(sitemapPath, 'utf8');
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) fail('sitemap-0.xml contains zero <loc> entries');

// Map a sitemap URL to its built file path (directory format → index.html).
function urlToFile(url) {
  const { pathname } = new URL(url);
  const clean = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  return clean === '' ? `${distDir}index.html` : `${distDir}${clean}/index.html`;
}

function extractCanonical(html) {
  const m = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i);
  if (!m) return null;
  const href = m[0].match(/href=["']([^"']+)["']/i);
  return href ? href[1] : null;
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : null;
}

// ── Per-URL assertions ───────────────────────────────────────────────────────
const titles = new Map(); // title -> first url that used it
for (const url of urls) {
  // on-domain check
  let host;
  try {
    host = new URL(url).host;
  } catch {
    fail(`sitemap URL is not a valid URL: ${url}`);
    continue;
  }
  if (host !== SITE_HOST) fail(`sitemap URL is off-domain: ${url}`);

  const file = urlToFile(url);
  if (!existsSync(file)) {
    fail(`sitemap URL has no built file (soft-404 risk): ${url} → ${file}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');

  // canonical must be self-referential + on-domain
  const canonical = extractCanonical(html);
  if (!canonical) {
    fail(`no <link rel=canonical> in ${file} (for ${url})`);
  } else {
    let canonHost;
    try {
      canonHost = new URL(canonical).host;
    } catch {
      fail(`unparseable canonical "${canonical}" in ${file}`);
      canonHost = null;
    }
    if (canonHost && canonHost !== SITE_HOST) {
      fail(`sitemap page has OFF-DOMAIN canonical (should not be indexable here): ${url} → ${canonical}`);
    }
    // self-referential: compare normalized (ignore trailing slash differences)
    const norm = (u) => u.replace(/\/+$/, '');
    if (canonical && norm(canonical) !== norm(url)) {
      fail(`canonical not self-referential: ${url} → ${canonical}`);
    }
  }

  // duplicate <title>
  const title = extractTitle(html);
  if (title) {
    if (titles.has(title)) {
      fail(`duplicate <title> "${title}" shared by ${titles.get(title)} and ${url}`);
    } else {
      titles.set(title, url);
    }
  }
}

// ── Artifact existence ───────────────────────────────────────────────────────
const robotsPath = `${distDir}robots.txt`;
if (!existsSync(robotsPath)) {
  fail('dist/robots.txt missing');
} else {
  const robots = readFileSync(robotsPath, 'utf8');
  if (!/Sitemap:\s*https?:\/\/\S+sitemap/i.test(robots)) {
    fail('dist/robots.txt does not reference a sitemap');
  }
}
if (!existsSync(`${distDir}404.html`)) fail('dist/404.html missing');

// ── Report ───────────────────────────────────────────────────────────────────
if (errors.length > 0) {
  console.error(`\n✗ indexability audit FAILED — ${errors.length} issue(s):\n`);
  for (const e of errors) console.error(`  • ${e}`);
  console.error('');
  process.exit(1);
}
console.log(`✓ indexability audit passed — ${urls.length} sitemap URLs, ${titles.size} unique titles, robots.txt + 404.html present.`);
