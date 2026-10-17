#!/usr/bin/env python3
"""Bounded discovery reconciliation. GET only; no private/action routes or auto-promotion."""
import argparse
import concurrent.futures
import datetime as dt
import json
import hashlib
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import threading
import time
import urllib.error
import urllib.parse as U
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
POLICY = ROOT / 'scripts/fixtures/public-route-policy.json'
EXPLORE = 'https://intentsolutions.io/projects/'
DENY = re.compile(r'/(?:api|auth|login|logout|user|dashboard|admin|checkout|cart|account|download|subscribe)(?:/|$)', re.I)
ASSET = re.compile(r'\.(?:js|css|png|jpe?g|gif|webp|svg|ico|pdf|zip|gz|json|xml|txt|woff2?|mp[34]|webm|csv|yaml|yml|md|mmd)$', re.I)


def normalize(url):
    p = U.urlsplit(url)
    return U.urlunsplit((p.scheme.lower(), p.netloc.lower(), p.path or '/', p.query, ''))


def safe(url, hosts):
    p = U.urlsplit(url)
    try:
        port = p.port
    except ValueError:
        return False
    return (p.scheme == 'https' and p.hostname in hosts and not p.username and
            not p.password and not port and not p.query and not DENY.search(U.unquote(p.path))
            and not any(x in U.unquote(p.path).split('/') for x in ('.', '..')))


class Page(HTMLParser):
    def __init__(self, url, body):
        super().__init__()
        self.url, self.links, self.canonical, self.robots = url, set(), None, ''
        self.refresh = None
        self.feed(body)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'a' and a.get('href'):
            self.links.add(normalize(U.urljoin(self.url, a['href'])))
        if tag == 'link' and 'canonical' in a.get('rel', '').split() and a.get('href'):
            self.canonical = normalize(U.urljoin(self.url, a['href']))
        if tag == 'meta' and a.get('http-equiv', '').lower() == 'refresh':
            target = re.search(r'url\s*=\s*[\"\']?([^\"\']+)', a.get('content', ''), re.I)
            if target:
                self.refresh = normalize(U.urljoin(self.url, target.group(1).strip()))
        if tag == 'meta' and a.get('name', '').lower() == 'robots':
            self.robots = a.get('content', '').lower()


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


class Fetcher:
    """Redirects checked before every request. Per-host pacing, hard body/request caps."""
    def __init__(self, hosts, sources=(), max_requests=350, redirect_allowed=None):
        self.hosts, self.sources = hosts, set(sources)
        self.max_requests, self.count = max_requests, 0
        self.lock, self.last = threading.Lock(), {}
        self.redirect_allowed = redirect_allowed

    def get(self, url):
        initial, redirects = url, []
        for _ in range(4):
            if not (safe(url, self.hosts) or url in self.sources):
                return {'url': initial, 'error': 'unsafe redirect or URL refused', 'final': url}
            if redirects and self.redirect_allowed and not self.redirect_allowed(url):
                return {'url': initial, 'error': 'unclassified redirect refused before request', 'final': url}
            host = U.urlsplit(url).hostname
            with self.lock:
                if self.count >= self.max_requests:
                    return {'url': initial, 'error': 'request cap reached'}
                self.count += 1
                wait = max(0, self.last.get(host, 0) + .12 - time.monotonic())
                if wait:
                    time.sleep(wait)
                self.last[host] = time.monotonic()
            request = urllib.request.Request(url, headers={'User-Agent': 'Intent-Public-Discovery-Audit/1.0', 'Accept': 'text/html,application/xml,application/json;q=0.9'})
            try:
                response = urllib.request.build_opener(NoRedirect).open(request, timeout=15)
            except urllib.error.HTTPError as error:
                response = error
            except (OSError, ValueError) as error:
                return {'url': initial, 'error': str(error)}
            with response:
                status = response.code
                if status in (301, 302, 303, 307, 308):
                    target = normalize(U.urljoin(url, response.headers.get('Location', '')))
                    redirects.append({'from': url, 'status': status, 'to': target})
                    url = target
                    continue
                body = response.read(2_000_001)
                if len(body) > 2_000_000:
                    return {'url': initial, 'status': status, 'error': 'body cap exceeded'}
                return {'url': initial, 'status': status, 'final': url, 'redirects': redirects,
                        'contentType': response.headers.get('Content-Type', ''),
                        'body': body.decode('utf-8', errors='replace')}
        return {'url': initial, 'error': 'redirect cap reached'}


def validate_policy(policy):
    """Policy changes are explicit code review, never inferred from the live crawl."""
    dt.date.fromisoformat(policy['reviewedAt'])
    core = set(policy['coreHosts'])
    if len(core) != len(policy['coreHosts']) or 'intentsolutions.io' not in core:
        raise ValueError('Duplicate or missing core host')
    for host, group in policy['routes'].items():
        if host not in core or not group['classification'] or len(group['paths']) != len(set(group['paths'])):
            raise ValueError(f'Invalid/duplicate reviewed routes for {host}')
        for path in group['paths']:
            if not path.startswith('/') or not safe(f'https://{host}{path}', core):
                raise ValueError(f'Unsafe reviewed path: {path}')
    for url in policy['sitemaps']:
        if not safe(url, core) or not url.endswith('.xml'):
            raise ValueError(f'Unsafe sitemap: {url}')
    manifest = policy['manifest']
    if manifest != {'url': 'https://raw.githubusercontent.com/intent-solutions-io/intent-demos/main/site/assets/public-page-routes.json', 'host': 'demos.intentsolutions.io', 'key': 'pages'}:
        raise ValueError('Source manifest boundary changed; update and review reader contract')
    for group in ('aliases', 'htmlAliases'):
        for url, target in policy.get(group, {}).items():
            if not safe(url, core) or not safe(target, core) or url == target:
                raise ValueError(f'Unsafe/cyclic alias: {url}')
    for url, reason in policy['exclusions'].items():
        if not safe(url, core) or not reason.strip():
            raise ValueError(f'Exclusion needs a safe URL and reason: {url}')
    for family in policy['sampleFamilies']:
        re.compile(family['pattern'])
        if not 1 <= family['limit'] <= 10 or not safe(family['parent'], core):
            raise ValueError('Invalid sample family boundary')


def source_contract():
    script = """import {experiences,categories} from './src/data/public-experiences.mjs';
import {validateRegistry} from './scripts/audit-discovery.mjs';
import {pages,legacy} from './src/data/site-map.mjs';
import {chapters} from './src/data/economics-teaching.mjs';
const validation=validateRegistry(experiences,categories);
if(validation.errors.length) throw new Error(validation.errors.join('\\n'));
console.log(JSON.stringify({experiences,pages,legacy,chapters:chapters.map(x=>x.id)}));"""
    return json.loads(subprocess.check_output(['node', '--input-type=module', '-e', script], cwd=ROOT, text=True))


class Audit:
    def __init__(self, policy, contract, today=None):
        self.policy, self.contract = policy, contract
        self.today = today or dt.date.today()
        self.rows, self.issues, self.sources = {}, [], []
        self.approved, self.sample_selection = {}, {}
        self.hosts = set(policy['coreHosts']) | {U.urlsplit(e['href']).hostname for e in contract['experiences']}
        for e in contract['experiences']:
            for link in [e] + e.get('links', []):
                self.hosts.add(U.urlsplit(link['href']).hostname)
                self.approved[normalize(link['href'])] = {'classification': 'directory destination', 'reviewedAt': e['verifiedAt'], **({'parent': normalize(e['href'])} if link is not e else {})}
        for host, group in policy['routes'].items():
            for path in group['paths']:
                url = f'https://{host}{path}'
                if url in self.approved:
                    continue
                self.approved[url] = {'classification': group['classification'], 'reviewedAt': policy['reviewedAt']}
        for e in contract['pages'] + contract['legacy']:
            if '[' in e['path'] or e['path'].endswith('.xml') or e['path'] == '/404/':
                continue
            self.approved['https://intentsolutions.io' + e['path']] = {
                'classification': 'company route contract', 'reviewedAt': policy['reviewedAt'],
                'noindexExpected': e['index'] is False}
        for chapter in contract['chapters']:
            self.approved[f'https://intentsolutions.io/estate/economics/{chapter}/'] = {
                'classification': 'financial teaching chapter', 'reviewedAt': policy['reviewedAt']}
        self.approved.update({u: {'classification': 'reviewed alias', 'alias': v, 'reviewedAt': policy['reviewedAt']}
                              for u, v in policy['aliases'].items()})
        for url, target in policy.get('htmlAliases', {}).items():
            self.approved[url]['htmlAlias'] = target
        self.approved.update({u: {'classification': 'intentional exclusion', 'excluded': why, 'reviewedAt': policy['reviewedAt']}
                              for u, why in policy['exclusions'].items()})

    def issue(self, kind, url, detail):
        row = {'kind': kind, 'url': url, 'detail': detail}
        if row not in self.issues:
            self.issues.append(row)

    def discover(self, url, origin):
        url = normalize(url)
        if url in self.rows:
            if origin not in self.rows[url]['discoveredBy']:
                self.rows[url]['discoveredBy'].append(origin)
            return self.rows[url]
        meta = self.approved.get(url)
        if not meta and U.urlsplit(url).path.endswith('/index.html'):
            destination = url[:-len('index.html')]
            if destination in self.approved:
                meta = {**self.approved[destination], 'classification': 'static directory-index alias', 'alias': destination}
        if not safe(url, self.hosts):
            meta = {'classification': 'outside safe public boundary', 'excluded': 'Private/action/query/unapproved host; never requested.'}
        elif not meta:
            for family in self.policy['sampleFamilies']:
                if re.fullmatch(family['pattern'], url):
                    meta = {'classification': family['reason'], 'family': family['id'], 'parent': family['parent'],
                            'reviewedAt': self.policy['reviewedAt']}
                    break
        if len(self.rows) >= 5000:
            self.issue('route-cap', '', 'More than5000 discovered routes; review source boundary.')
            return {'url': url, 'classification': 'outside row cap', 'excluded': 'row cap', 'httpChecked': False}
        row = {'url': url, 'discoveredBy': [origin], 'httpChecked': False,
               **(meta or {'classification': 'unclassified'})}
        self.rows[url] = row
        if not meta:
            self.issue('unclassified', url, 'Review source and intended audience before adding a route, family or reasoned exclusion. Not fetched or promoted.')
        if row.get('reviewedAt'):
            age = (self.today - dt.date.fromisoformat(row['reviewedAt'])).days
            if age > 180:
                self.issue('stale-review', url, f'Classification last reviewed {age} days ago; HTTP success does not renew content review.')
        return row

    def seed(self):
        for url in self.approved:
            self.discover(url, 'reviewed-policy-or-registry')

    def inspect(self, row, response):
        row['httpChecked'] = True
        row.update({k: v for k, v in response.items() if k != 'body'})
        if response.get('error') or response.get('status') != 200:
            self.issue('broken-target', row['url'], response.get('error') or f"HTTP {response.get('status')}")
            return []
        if response.get('redirects') and response.get('final') != row.get('alias'):
            self.issue('stale-target', row['url'], f"Unexpected redirect to {response['final']}")
        if response.get('contentType') and 'text/html' not in response['contentType']:
            self.issue('non-page-target', row['url'], 'Expected a public HTML page, got ' + response['contentType'])
        page = Page(response['final'], response.get('body', ''))
        row.update(canonical=page.canonical, robots=page.robots, htmlRefresh=page.refresh)
        html_alias = self.policy.get('htmlAliases', {}).get(response['final'])
        if html_alias and page.refresh != html_alias:
            self.issue('alias-drift', row['url'], 'Reviewed HTML handoff no longer matches expected destination.')
        if row.get('noindexExpected') and 'noindex' not in page.robots:
            self.issue('index-policy', row['url'], 'Expected intentional noindex handoff/utility.')
        if page.canonical and page.canonical != response['final'] and page.canonical not in (row.get('crossCanonical'), row.get('alias'), html_alias):
            self.issue('canonical-mismatch', row['url'], f'Canonical points to {page.canonical}')
        host = U.urlsplit(row['url']).hostname
        if host in self.policy['coreHosts']:
            accepted = {EXPLORE, f'https://{host}/'}
            if row.get('parent'):
                accepted.add(row['parent'])
            accepted.discard(row['url'])
            row['returnTargets'] = sorted(page.links & accepted)
            if row['url'] in self.policy['browserReturns']:
                row['returnCheck'] = 'browser-required'
            elif not row['returnTargets']:
                self.issue('missing-return', row['url'], 'No link to Explore, carrier home, or approved collection parent.')
        # Only core same-host HTML navigation. External branded archives remain registry destinations.
        return sorted(u for u in page.links if U.urlsplit(u).hostname == host and
                      host in self.policy['coreHosts'] and not ASSET.search(U.urlsplit(u).path))

    def eligible(self, row):
        if row['httpChecked'] or row.get('excluded') or row['classification'] == 'unclassified':
            return False
        if row.get('family'):
            family = next(f for f in self.policy['sampleFamilies'] if f['id'] == row['family'])
            if family['id'] not in self.sample_selection:
                candidates = sorted(r['url'] for r in self.rows.values() if r.get('family') == family['id'])
                offset = self.today.toordinal() % len(candidates)
                ordered = candidates[offset:] + candidates[:offset]
                self.sample_selection[family['id']] = set(ordered[:family['limit']])
            if row['url'] not in self.sample_selection[family['id']]:
                row['notCheckedReason'] = 'bounded rotating family sample; classification only'
                return False
        return True

    def report(self, requests=0):
        canonicals = {}
        for row in self.rows.values():
            if row.get('canonical') and not row.get('crossCanonical') and not row.get('alias') and not row.get('htmlAlias'):
                canonicals.setdefault(row['canonical'], []).append(row['url'])
        for canonical, urls in canonicals.items():
            if len(urls) > 1:
                self.issue('duplicate-canonical', canonical, ', '.join(urls))
        rows = sorted(self.rows.values(), key=lambda r: r['url'])
        return {'generatedAt': dt.datetime.now(dt.timezone.utc).isoformat(),
                'scope': self.policy['scope'],
                'limits': {'requests':350,'pages':300,'sourceDocuments':12,'discoveredRows':5000,'pageWaves':3,'workers':4},
                'limitations': ['Unlinked deployed files require an owner-exported --deployed-routes manifest.',
                    'Source manifests do not prove deployment. Only HTTP-checked rows attest a response.',
                    'Historical result records and crossposted articles are sampled, not exhaustively fetched.',
                    'Successful GET and return navigation do not prove product functionality, provider integrations, form delivery or entitlement.'],
                'counts': {'discovered': len(rows), 'httpChecked': sum(r['httpChecked'] for r in rows),
                    'sourceDiscovered': sum(any(x.startswith('source:') for x in r['discoveredBy']) for r in rows),
                    'deployedManifest': sum('owner-deployed-manifest' in r['discoveredBy'] for r in rows),
                    'unclassified': sum(r['classification'] == 'unclassified' for r in rows),
                    'excluded': sum(bool(r.get('excluded')) for r in rows),
                    'requests': requests, 'issues': len(self.issues)},
                'sources': self.sources, 'issues': self.issues, 'routes': rows}


def local_sources(audit):
    for path in (ROOT / 'src/pages').rglob('*.astro'):
        relative = str(path.relative_to(ROOT / 'src/pages'))
        if '[' in relative or relative == '404.astro':
            continue
        route = '/' + relative.removesuffix('.astro').removesuffix('index').rstrip('/') + '/'
        audit.discover('https://intentsolutions.io' + route.replace('//', '/'), 'source:company-pages')
    for path in (ROOT / 'public').rglob('*.html'):
        url = 'https://intentsolutions.io/' + str(path.relative_to(ROOT / 'public'))
        if url in audit.approved and ('financial-diagrams/' in url or '.print.html' in url):
            audit.approved[url]['noindexExpected'] = True
        audit.discover(url, 'source:company-public-html')
    # Existing source frontmatter authorizes crossposted articles, not arbitrary remote slugs.
    for path in sorted((ROOT / 'src/content/field-notes').glob('*.md')):
        content = path.read_text()
        if re.search(r'\]\(/posts/', content):
            audit.issue('broken-source-link', str(path.relative_to(ROOT)), 'Root-relative /posts/ links belong to the original publisher, not the company host.')
        if re.search(r'\]\(/field-notes/[^\s/)#?]+\)', content):
            audit.issue('stale-source-link', str(path.relative_to(ROOT)), 'Local article links must use their slash-terminated canonical URL.')
        canonical = re.search(r'^canonical:\s*[\"\']?(https://[^\s\"\']+)', path.read_text(), re.M)
        url = f'https://intentsolutions.io/field-notes/{path.stem}/'
        audit.approved[url] = {'classification': 'crossposted source article', 'family': 'company-field-note',
                              'reviewedAt': audit.policy['reviewedAt'], 'parent': 'https://intentsolutions.io/field-notes/'}
        if canonical:
            audit.approved[url]['crossCanonical'] = normalize(canonical.group(1))
        audit.discover(url, 'source:company-field-note')


def live_sources(audit, fetcher):
    pending = list(audit.policy['sitemaps'])
    seen = set()
    while pending:
        url = pending.pop(0)
        if url in seen:
            continue
        seen.add(url)
        if len(seen) > 12:
            audit.issue('source-cap', url, 'Sitemap document cap exceeded')
            break
        response = fetcher.get(url)
        audit.sources.append({**{k: v for k, v in response.items() if k != 'body'}, 'sha256': hashlib.sha256(response.get('body','').encode()).hexdigest()})
        if response.get('error') or response.get('status') != 200:
            audit.issue('source-unavailable', url, response.get('error') or str(response.get('status')))
            continue
        try:
            tree = ET.fromstring(response['body'])
            if not tree.tag.endswith(('sitemapindex','urlset')):
                raise ValueError('Declared sitemap returned an unexpected XML root')
            locations = [normalize(n.text.strip()) for n in tree.iter() if n.tag.endswith('}loc') and n.text]
            if not locations:
                raise ValueError('Declared sitemap contains no URLs')
            if tree.tag.endswith('sitemapindex'):
                pending.extend(u for u in locations if U.urlsplit(u).hostname == U.urlsplit(url).hostname and safe(u, audit.hosts))
            else:
                for location in locations:
                    audit.discover(location, 'sitemap:' + url)
        except (ET.ParseError, ValueError) as error:
            audit.issue('invalid-source', url, str(error))
    manifest = audit.policy['manifest']
    response = fetcher.get(manifest['url'])
    audit.sources.append({**{k: v for k, v in response.items() if k != 'body'}, 'sha256': hashlib.sha256(response.get('body','').encode()).hexdigest()})
    try:
        if response.get('status') != 200:
            raise ValueError(response.get('error', f"HTTP {response.get('status')}"))
        for path in json.loads(response['body'])[manifest['key']]:
            if not isinstance(path, str) or path.startswith('/') or '..' in path.split('/'):
                raise ValueError('Unsafe manifest path')
            audit.discover(f"https://{manifest['host']}/" + (path[:-len('index.html')] if path.split('/')[-1] == 'index.html' else path), 'source:' + manifest['url'])
    except (ValueError, KeyError, TypeError) as error:
        audit.issue('invalid-source', manifest['url'], str(error))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--live', action='store_true')
    parser.add_argument('--deployed-routes', type=Path, help='Owner-reviewed JSON array of public deployed HTTPS URLs; unknown entries are flagged, never fetched.')
    parser.add_argument('--output', type=Path, default=Path('/tmp/public-route-coverage.json'))
    args = parser.parse_args()
    policy = json.loads(POLICY.read_text())
    validate_policy(policy)
    audit = Audit(policy, source_contract())
    local_sources(audit)
    audit.seed()
    if args.deployed_routes:
        deployed = json.loads(args.deployed_routes.read_text())
        if not isinstance(deployed, list) or len(deployed) > 5000 or any(not isinstance(u, str) for u in deployed):
            parser.error('Deployed manifest must contain at most 5000 public URL strings')
        for url in deployed:
            audit.discover(url, 'owner-deployed-manifest')
    def redirect_allowed(url):
        row = audit.rows.get(url)
        return (url in policy['sitemaps'] or url == policy['manifest']['url'] or
                bool(row and row['classification'] != 'unclassified' and not row.get('excluded')))
    fetcher = Fetcher(audit.hosts, [policy['manifest']['url']], redirect_allowed=redirect_allowed)
    if args.live:
        live_sources(audit, fetcher)
        # Two bounded discovery waves beyond approved seeds. Unclassified links never fetched.
        for wave in range(3):
            pending = [r for r in sorted(audit.rows.values(), key=lambda x: x['url']) if audit.eligible(r)]
            if not pending:
                break
            if len(pending) + sum(r['httpChecked'] for r in audit.rows.values()) > 300:
                audit.issue('page-cap', '', 'More than 300 approved page checks; review boundary before increasing cap.')
                break
            with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
                results = pool.map(fetcher.get, [r['url'] for r in pending])
                for row, result in zip(pending, results):
                    for url in audit.inspect(row, result):
                        audit.discover(url, 'link:' + row['url'])
    report = audit.report(fetcher.count)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report['counts'], indent=2))
    for issue in report['issues']:
        print(f"{issue['kind']}: {issue['url']} — {issue['detail']}")
    print(f'Report: {args.output}; public response/navigation evidence only, not capability certification.')
    return bool(report['issues'])


if __name__ == '__main__':
    raise SystemExit(main())
