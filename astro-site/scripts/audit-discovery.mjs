#!/usr/bin/env node
/** Bounded public-directory checks. No DNS enumeration or product-action testing.
 * Default: validate registry and the committed curated-collection snapshot offline.
 * --live: GET the registry's public page links (4 concurrent, 15s/request, 3 redirects).
 * --self-test: prove duplicate, private-host, action-path and missing-coverage rejection.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { categories, experiences } from '../src/data/public-experiences.mjs';

const fixture = JSON.parse(readFileSync(new URL('./fixtures/discovery-collections.json', import.meta.url), 'utf8'));
const publicHosts = new Set([
  'intentsolutions.io', 'demos.intentsolutions.io', 'oma.intentsolutions.io',
  'learn.intentsolutions.io', 'labs.intentsolutions.io', 'evals.intentsolutions.io',
  'tonsofskills.com', 'startaitools.com', 'jeremylongshore.com', 'diagnosticpro.io',
  'scorecardecho.com', 'hustlestats.io', 'noupick.intentsolutions.io', 'comehomealabama.com',
]);
const forbiddenPath = /\/(?:api|auth|login|logout|user|dashboard|admin|checkout|cart|account)(?:\/|$)/i;
const statuses = new Set([
  'Public demo', 'Browser game', 'Application required', 'In development',
  'Product overview', 'Public evidence', 'Reference', 'Public catalog',
  'Account-based product', 'Public app', 'Workflow demo', 'Tools & workflow overview',
  'Architecture demo', 'Design study', 'Public reports', 'Method guide',
  'Architecture comparison', 'Architecture study', 'Draft architecture', 'Skills overview',
  'Workflow concept', 'Articles', 'Portfolio', 'Real-estate brand', 'Illustrated guide',
  'Plugin overview',
]);

function safeUrl(href) {
  const url = new URL(href);
  if (url.protocol !== 'https:' || !publicHosts.has(url.hostname) || url.port || url.username || url.password) {
    throw new Error(`not an approved canonical public host: ${href}`);
  }
  if (url.search || forbiddenPath.test(url.pathname)) throw new Error(`action/private/query URL is outside discovery checks: ${href}`);
  return url;
}
function key(href) {
  const url = safeUrl(href);
  url.hash = '';
  return url.href;
}

export function validateRegistry(entries, groups, baseline = fixture) {
  const errors = [];
  const warnings = [];
  const ids = new Set();
  const primary = new Set();
  const linked = new Set();
  const groupIds = new Set();
  for (const group of groups) {
    if (!group.id || !group.label || groupIds.has(group.id)) errors.push(`Invalid/duplicate category: ${group.id}`);
    groupIds.add(group.id);
  }
  for (const entry of entries) {
    const id = entry.id || '(missing id)';
    for (const field of ['id', 'name', 'description', 'audience', 'category', 'status', 'href', 'action', 'verifiedAt', 'source']) {
      if (typeof entry[field] !== 'string' || !entry[field].trim()) errors.push(`${id}: missing string ${field}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) errors.push(`${id}: invalid stable ID`);
    if (ids.has(id)) errors.push(`${id}: duplicate ID`);
    ids.add(id);
    if (!groupIds.has(entry.category)) errors.push(`${id}: unknown category ${entry.category}`);
    if (!statuses.has(entry.status)) errors.push(`${id}: unknown availability label ${entry.status}`);
    if (!Array.isArray(entry.tags) || !entry.tags.length || entry.tags.some(tag => typeof tag !== 'string' || !tag.trim())) errors.push(`${id}: invalid search tags`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.verifiedAt) || !Number.isFinite(Date.parse(entry.verifiedAt)) || new Date(entry.verifiedAt).toISOString().slice(0, 10) !== entry.verifiedAt) {
      errors.push(`${id}: invalid verification date`);
    } else if (Date.now() - Date.parse(entry.verifiedAt) > 180 * 86400000) {
      warnings.push(`${id}: public description has not been reverified in 180 days`);
    }
    try {
      const normalized = key(entry.href);
      if (primary.has(normalized)) errors.push(`${id}: duplicate primary destination ${normalized}`);
      primary.add(normalized); linked.add(normalized);
    } catch (error) { errors.push(`${id}: ${error.message}`); }
    if (!Array.isArray(entry.links)) errors.push(`${id}: links must be an array`);
    for (const link of Array.isArray(entry.links) ? entry.links : []) {
      if (typeof link.label !== 'string' || !link.label.trim()) errors.push(`${id}: related link needs a label`);
      try { linked.add(key(link.href)); } catch (error) { errors.push(`${id}: ${error.message}`); }
    }
  }
  for (const entry of entries) {
    if (entry.parent && (!ids.has(entry.parent) || entry.parent === entry.id)) errors.push(`${entry.id}: invalid parent ${entry.parent}`);
    const visited = new Set([entry.id]);
    let parent = entry.parent;
    while (parent) {
      if (visited.has(parent)) { errors.push(`${entry.id}: parent cycle`); break; }
      visited.add(parent);
      parent = entries.find(candidate => candidate.id === parent)?.parent;
    }
  }
  for (const collection of baseline.collections) {
    for (const item of collection.items) {
      try { if (!linked.has(key(item.href))) errors.push(`Missing curated ${collection.id} entry or related link: ${item.name} (${item.href})`); }
      catch (error) { errors.push(`Invalid coverage fixture: ${error.message}`); }
    }
  }
  return { errors, warnings, uniquePublicLinks: linked.size };
}

async function checkPublicPage(href) {
  let url = key(href);
  for (let hop = 0; hop <= 3; hop++) {
    safeUrl(url);
    const response = await fetch(url, {
      method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(15000),
      headers: { 'User-Agent': 'IntentSolutions-PublicDiscoveryCheck/1.0' },
    });
    await response.body?.cancel();
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');
      if (!location) throw new Error(`redirect without Location: ${url}`);
      url = new URL(location, url).href;
      continue;
    }
    if (response.status !== 200) throw new Error(`${response.status}: ${url}`);
    return { requested: href, final: url };
  }
  throw new Error(`more than three redirects: ${href}`);
}

async function liveCheck(entries) {
  const urls = [...new Set(entries.flatMap(entry => [entry.href, ...entry.links.map(link => link.href)]).map(key))];
  if (urls.length > 160) throw new Error('Live check exceeds its 160-page bound; review the public inventory before expanding it.');
  const failures = [];
  let cursor = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      try {
        const result = await checkPublicPage(url);
        if (result.requested !== result.final) failures.push(`Canonical link redirects: ${result.requested} → ${result.final}`);
      } catch (error) { failures.push(`${url}: ${error.message}`); }
    }
  }));
  return { failures, checked: urls.length };
}

function selfTest() {
  const cases = [
    ['duplicate ID', data => { data[1].id = data[0].id; }],
    ['duplicate primary destination', data => { data[1].href = data[0].href; }],
    ['not an approved canonical public host', data => { data[0].href = 'https://admin.intentsolutions.io/'; }],
    ['action/private/query URL', data => { data[0].href = 'https://demos.intentsolutions.io/api/search'; }],
    ['Missing curated demos', data => { data.splice(data.findIndex(item => item.id === 'longbox'), 1); }],
    ['parent cycle', data => { data.find(item => item.id === 'demos').parent = 'longbox'; }],
  ];
  for (const [expected, mutate] of cases) {
    const data = structuredClone(experiences); mutate(data);
    if (!validateRegistry(data, categories).errors.some(error => error.includes(expected))) throw new Error(`Regression guard failed: ${expected}`);
  }
  console.log(`Discovery validator self-test: ${cases.length} invalid-registry cases rejected.`);
}

async function main() {
  const flags = new Set(process.argv.slice(2));
  for (const flag of flags) if (!['--live', '--self-test'].includes(flag)) throw new Error(`Unknown flag: ${flag}`);
  const result = validateRegistry(experiences, categories);
  if (result.errors.length) throw new Error(result.errors.join('\n'));
  for (const warning of result.warnings) console.warn(`WARNING: ${warning}`);
  console.log(`Discovery: ${experiences.length} experiences, ${result.uniquePublicLinks} public page links; ${fixture.collections.map(c => `${c.items.length} ${c.id}`).join(', ')} covered.`);
  console.log(`Coverage: curated collection snapshot ${fixture.verifiedAt}; primary or related links count. This does not enumerate all estate routes or validate product actions.`);
  if (flags.has('--self-test')) selfTest();
  if (flags.has('--live')) {
    const live = await liveCheck(experiences);
    if (live.failures.length) throw new Error(live.failures.join('\n'));
    console.log(`Live discovery: ${live.checked} public page GETs passed. No forms or provider endpoints called.`);
  }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(`Discovery audit failed:\n${error.message}`); process.exitCode = 1; });
}
