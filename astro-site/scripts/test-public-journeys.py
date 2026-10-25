#!/usr/bin/env python3
"""Live read-only discovery journeys. No forms, accounts or provider requests. Includes two local game transmissions to test the parent return."""
import argparse
import json
import os
from pathlib import Path
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright, expect

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, default=Path('/tmp/public-journeys.json'))
args = parser.parse_args()
BASE = 'https://intentsolutions.io'
CORE = {'intentsolutions.io', 'oma.intentsolutions.io', 'learn.intentsolutions.io', 'labs.intentsolutions.io', 'demos.intentsolutions.io'}
journeys = [('typing game', 'beacon-wakes'), ('learning', 'learn'), ('outreach', 'intent-outreach'), ('published result', 'labs'), ('plugin', 'oma-bazaar')]
results = []
with sync_playwright() as p:
    executable = os.environ.get('PLAYWRIGHT_CHROMIUM_EXECUTABLE')
    browser = p.chromium.launch(headless=True, **({'executable_path': executable} if executable else {}))
    try:
        for width in (390, 1440):
            for label, item in journeys:
                context = browser.new_context(viewport={'width': width, 'height': 900}, service_workers='block')
                # Permit only passive same-estate document/assets; no API, analytics or provider calls.
                def route(request_route):
                    req = request_route.request
                    host = urlsplit(req.url).hostname
                    if req.method != 'GET' or req.resource_type in ('xhr', 'fetch', 'websocket') or host not in CORE or '/api/' in req.url:
                        request_route.abort()
                    else:
                        request_route.continue_()
                context.route('**/*', route)
                page = context.new_page()
                record = {'task': label, 'width': width, 'passed': False, 'scope': 'navigation only; no product action'}
                try:
                    page.goto(BASE + '/', wait_until='networkidle')
                    page.get_by_role('link', name='Explore everything', exact=True).click()
                    expect(page).to_have_url(BASE + '/projects/')
                    page.locator(f'[data-experience="{item}"] a').first.click()
                    page.wait_for_load_state('networkidle')
                    record['destination'] = page.url
                    assert urlsplit(page.url).hostname in CORE
                    if item == 'labs':
                        page.locator('a[href="/examples/"]').first.click()
                        page.wait_for_load_state('networkidle')
                        page.locator('a[href="/results/jrig/"]').first.click()
                        page.wait_for_load_state('networkidle')
                        result = page.locator('a[href*="/results/"][href*="sha256-"]').first
                        expect(result).to_be_visible()
                        result.click()
                        page.wait_for_load_state('networkidle')
                        assert '/sha256-' in page.url
                        record['resultDetail'] = page.url
                    links = page.locator('a[href]').evaluate_all('(xs) => xs.map(x => x.href)')
                    assert BASE + '/projects/' in links, ('missing Explore return', page.url)
                    record['passed'] = True
                except Exception as error:
                    record['error'] = str(error)
                finally:
                    results.append(record)
                    context.close()
        # These two routes render their return navigation in JavaScript.
        for url in ['https://oma.intentsolutions.io/perception/', 'https://oma.intentsolutions.io/the-beacon-wakes/play/']:
            context = browser.new_context(service_workers='block')
            context.route('**/*', route)
            page = context.new_page()
            record = {'task': 'client-rendered return', 'destination': url, 'passed': False}
            try:
                page.goto(url, wait_until='networkidle')
                if '/the-beacon-wakes/play/' in url:
                    page.get_by_role('button', name='Press Enter to launch demo', exact=True).click()
                    first = page.locator('#prompt').inner_text()
                    page.keyboard.type(first)
                    expect(page.locator('#prompt')).not_to_have_text(first)
                    page.keyboard.type(page.locator('#prompt').inner_text())
                    expect(page.locator('#result-signals')).to_have_text('2')
                    page.get_by_role('button', name='Parent: see the full game', exact=True).click()
                    page.locator('#adult-confirm').click()
                    expect(page).to_have_url('https://oma.intentsolutions.io/the-beacon-wakes/')
                    page.wait_for_load_state('networkidle')
                    record['parentReturn'] = page.url
                    record['scope'] = 'Two local transmissions and visible parent gate; no checkout or provider calls.'
                expect(page.locator(f'a[href="{BASE}/projects/"]').first).to_be_visible()
                record['passed'] = True
            except Exception as error:
                record['error'] = str(error)
            finally:
                results.append(record)
                context.close()
    finally:
        browser.close()
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(json.dumps({'scope': 'Five public navigation tasks at two widths plus two client-rendered returns. No form delivery, payment or provider capability claims. Local game progression is exercised solely to verify the parent return.', 'results': results}, indent=2) + '\n')
for record in results:
    print(('PASS' if record['passed'] else 'FAIL'), record)
raise SystemExit(any(not row['passed'] for row in results))
