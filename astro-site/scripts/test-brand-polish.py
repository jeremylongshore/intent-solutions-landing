"""Browser regression for the public site. All form traffic is intercepted.

Run after build against a local preview:
  python scripts/test-brand-polish.py http://127.0.0.1:4896
Dependency: pip install playwright && playwright install chromium
"""
import sys
import os
import hashlib
import re
from playwright.sync_api import sync_playwright, expect

base = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4896'

def assert_contact_bounds(page, width):
    # document.scrollWidth alone misses content clipped by overflow:hidden.
    clipped = page.locator('#contact').evaluate("""root => {
      const issues = [];
      for (const el of root.querySelectorAll('h2,h3,p,li,label,input:not([hidden]),select,textarea,button,a')) {
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        const parent = el.parentElement.getBoundingClientRect();
        if (rect.left < -1 || rect.right > innerWidth + 1 || rect.left < parent.left - 1 || rect.right > parent.right + 1)
          issues.push({tag:el.tagName,id:el.id,text:el.textContent?.slice(0,60),left:rect.left,right:rect.right,parentLeft:parent.left,parentRight:parent.right});
        if (!el.matches('input,select,textarea')) {
          const range = document.createRange(); range.selectNodeContents(el);
          for (const r of range.getClientRects()) {
            if (r.left < rect.left - 1 || r.right > rect.right + 1)
              issues.push({tag:el.tagName,text:el.textContent?.slice(0,60),textLeft:r.left,textRight:r.right});
          }
        }
      }
      return issues;
    }""")
    assert not clipped, (width, clipped)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, **({"executable_path": os.environ["PLAYWRIGHT_CHROMIUM_EXECUTABLE"]} if os.environ.get("PLAYWRIGHT_CHROMIUM_EXECUTABLE") else {}))
    for width in (320, 390, 768, 1440):
        page = browser.new_page(viewport={'width': width, 'height': 1000}, reduced_motion='reduce')
        page.goto(base, wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        expect(page.locator('#hero-title')).to_have_text('Bring us the work you need AI to do.')
        bounds = page.locator('#hero-title').evaluate('''el => {
          const range = document.createRange(); range.selectNodeContents(el);
          return [...range.getClientRects()].map(r => ({left:r.left,right:r.right}));
        }''')
        assert all(r['left'] >= 0 and r['right'] <= width for r in bounds), (width, bounds)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
        assert page.locator('.hero .primary').bounding_box()['y'] < 1000
        for link in page.locator('.network-inner a').all():
            assert link.bounding_box()['height'] >= 44
        if width < 850:
            menu = page.locator('.mobile-menu')
            page.locator('.mobile-menu summary').click()
            expect(menu).to_have_attribute('open', '')
            page.keyboard.press('Escape')
            expect(menu).not_to_have_attribute('open', '')
            expect(page.locator('.mobile-menu summary')).to_be_focused()
            page.locator('.mobile-menu summary').click()
            page.locator('.mobile-panel').get_by_role('link', name='Proof', exact=True).click()
            expect(menu).not_to_have_attribute('open', '')
        page.goto(base, wait_until='networkidle')
        page.screenshot(path=f'/tmp/intent-fixed-{width}.png', full_page=True)
        for path in ('/projects/', '/about/', '/support/', '/site-map/', '/contact/?door=outcome', '/cloud/', '/learn/security/'):
            page.goto(base + path, wait_until='networkidle')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, path)
            expect(page.locator('main h1')).to_have_count(1)
            assert 'jeremy@intentsolutions.io' not in page.locator('body').inner_text()
            if path.startswith('/contact/'):
                assert_contact_bounds(page, width)
                expect(page.locator('main video')).to_have_count(0)
                for field in page.locator('#contact input:not([hidden]), #contact select, #contact textarea').all():
                    assert field.bounding_box()['height'] >= 44
                    assert field.evaluate('el => parseFloat(getComputedStyle(el).fontSize)') >= 16
                page.locator('#name').focus()
                assert page.locator('#name').evaluate('el => getComputedStyle(el).outlineStyle') != 'none'
                if width < 640:
                    assert page.locator('form').bounding_box()['y'] + page.evaluate('scrollY') < 600
                if width <= 960:
                    footer = page.locator('.site-footer')
                    assert footer.bounding_box()['height'] < 650, footer.bounding_box()
                    for title in ('Network', 'Company'):
                        summary = footer.locator('summary').filter(has_text=title)
                        summary.focus()
                        page.keyboard.press('Space')
                        nav = footer.get_by_role('navigation', name=f'Footer {title.lower()}')
                        expect(nav).to_be_visible()
                        for link in nav.get_by_role('link').all():
                            assert link.bounding_box()['height'] >= 44
                        page.keyboard.press('Space')
                        expect(nav).not_to_be_visible()
        page.close()
    page = browser.new_page(viewport={'width': 390, 'height': 900})
    page.goto(base + '/contact/?door=outcome', wait_until='networkidle')
    expect(page.get_by_label('What kind of request is this?')).to_have_value('consulting')
    page.get_by_role('button', name='Send request').click()
    expect(page.locator('#name')).to_have_attribute('aria-invalid', 'true')
    page.get_by_label('Name', exact=False).fill('Browser test')
    page.get_by_label('Email', exact=False).fill('browser-test@example.invalid')
    page.get_by_label('What outcome do you need, and how will you know it worked?').fill('Verify the form locally without sending a real request.')
    calls = []
    def fail(route):
        calls.append(route.request.post_data_json)
        route.fulfill(status=503, json={'error': 'Test service unavailable. Please retry.'})
    page.route('**/api/forms/contact', fail)
    page.get_by_role('button', name='Send request').click()
    expect(page.get_by_role('alert')).to_contain_text('Please email support@intentsolutions.io')
    expect(page.locator('#name')).to_have_value('Browser test')
    page.unroute('**/api/forms/contact', fail)
    page.route('**/api/forms/contact', lambda route: route.fulfill(status=200, json={'ok': True}))
    page.get_by_role('button', name='Send request').click()
    expect(page.get_by_role('status')).to_contain_text('Request received')
    expect(page.get_by_role('status')).to_be_focused()
    page.clock.install()
    page.clock.fast_forward(6000)
    expect(page.get_by_role('status')).to_contain_text('Request received')
    page.get_by_role('button', name='Send another request').click()
    expect(page.get_by_role('button', name='Send request')).to_be_enabled()
    expect(page.get_by_label('What kind of request is this?')).to_have_value('consulting')
    assert calls[0]['interest'] == 'consulting'
    page.close()
    page = browser.new_page(viewport={'width': 390, 'height': 900}, java_script_enabled=False)
    page.goto(base + '/contact/')
    assert 'The form needs JavaScript to submit. You can email' in page.locator('body').inner_text()
    expect(page.get_by_role('button', name='Loading form...')).to_be_disabled()
    page.close()
    page = browser.new_page(viewport={'width': 768, 'height': 1000}, reduced_motion='reduce')
    page.goto(base, wait_until='networkidle')
    page.add_style_tag(content='html {font-size:200% !important;}')
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), '200% text reflow'
    page.goto(base + '/contact/', wait_until='networkidle')
    page.add_style_tag(content='html {font-size:200% !important;}')
    assert_contact_bounds(page, 768)
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'contact 200% text reflow'
    # The policy must survive disabled JavaScript and an unavailable policy CDN.
    # Digest is the whitespace-normalized body of the previously published policy.
    policy_digest = '7129d3d98dc26a17c3018837be7d8e1b504ddb07d67fcd0a53f4ecaea0d7da08'
    for enabled in (False, True):
        for width in (320, 390, 1440):
            page = browser.new_page(viewport={'width': width, 'height': 900}, java_script_enabled=enabled)
            page.route('**/*getterms*', lambda route: route.abort())
            response = page.goto(base + '/privacy/', wait_until='networkidle')
            assert response.status == 200
            expect(page.get_by_role('heading', level=1)).to_have_text('Privacy Policy')
            policy = page.get_by_role('article', name='Privacy policy')
            expect(policy.get_by_role('heading', name='Contact Us', exact=True)).to_be_visible()
            normalized = re.sub(r'\s+', ' ', policy.inner_text()).strip()
            assert hashlib.sha256(normalized.encode()).hexdigest() == policy_digest
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), ('privacy', width, enabled)
            assert not page.locator('script[src*="getterms"], iframe[src*="getterms"]').count()
            if width == 390:
                page.add_style_tag(content='html {font-size:200% !important;}')
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'privacy 200% text reflow'
            page.close()
    browser.close()
print('PASS: 4 viewport sizes, 8 routes, hero glyph bounds, menu keyboard/anchor dismissal, touch targets, contact descendant bounds, compact mobile footer keyboard disclosure, form validation/failure/retry/persistent success, support address, no-JS fallback, 200% text reflow. No real submissions sent.')
