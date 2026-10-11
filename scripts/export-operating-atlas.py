#!/usr/bin/env python3
"""Export the generated eight-chapter atlas with Chromium's print renderer."""
import argparse
import shutil
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--browser-path', default=shutil.which('chromium-browser') or shutil.which('chromium'))
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
source = root / 'astro-site/public/estate-blueprint.print.html'
target = root / 'astro-site/public/intent-solutions-operating-atlas.pdf'
with sync_playwright() as playwright:
    options = {'headless': True}
    if args.browser_path:
        options['executable_path'] = args.browser_path
    browser = playwright.chromium.launch(**options)
    page = browser.new_page(viewport={'width': 1600, 'height': 1200})
    page.goto(source.as_uri(), wait_until='networkidle')
    page.evaluate('document.fonts.ready')
    if page.locator('.atlas-print-sheet').count() != 8:
        raise RuntimeError('Expected exactly eight printable chapters')
    page.pdf(path=str(target), print_background=True, prefer_css_page_size=True)
    browser.close()
print(target)
