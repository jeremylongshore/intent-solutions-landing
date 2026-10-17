"""Public discovery regression. No submissions or provider actions.
Usage: python scripts/test-discovery.py http://127.0.0.1:49731
Set PLAYWRIGHT_CHROMIUM_EXECUTABLE for a locally installed browser.
"""
import os
import sys
from playwright.sync_api import sync_playwright, expect

base = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:49731').rstrip('/')
with sync_playwright() as p:
    executable = os.environ.get('PLAYWRIGHT_CHROMIUM_EXECUTABLE')
    browser = p.chromium.launch(headless=True, **({'executable_path': executable} if executable else {}))
    for width in (320, 390, 768, 1440):
        page = browser.new_page(viewport={'width': width, 'height': 1000})
        page.route('https://analytics.intentsolutions.io/**', lambda route: route.fulfill(status=200, content_type='application/javascript', body=''))
        captured = []
        page.expose_function('recordMeasurement', lambda item: captured.append(item))
        page.add_init_script('window.measured=[];window.umami={track:(name,data)=>new Promise(resolve=>setTimeout(async()=>{window.measured.push({name,data});sessionStorage.setItem("measured",JSON.stringify(window.measured));await window.recordMeasurement({name,data});resolve();},50))};')
        page.goto(base + '/', wait_until='networkidle')
        explore = page.locator('.is-estate-bar a').filter(has_text='Explore')
        expect(explore).to_have_count(1)
        box = explore.bounding_box()
        assert box and box['x'] >= 0 and box['x'] + box['width'] <= width, (width, box)
        page.get_by_role('link', name='Explore everything', exact=True).click()
        expect(page).to_have_url(base + '/projects/')
        assert page.evaluate('JSON.parse(sessionStorage.getItem("measured"))') == [
            {'name':'explore_open','data':{'source':'home','surface':'content'}}
        ]
        expect(page.get_by_role('heading', level=1)).to_have_text('Explore Intent Solutions')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
        entries = page.locator('[data-experience]')
        total = entries.count()
        assert total >= 40, total
        search = page.get_by_label('What are you looking for?')
        for term, item_id in [('typing', 'beacon-wakes'), ('migration', 'blue-gold-blue'), ('real estate', 'intent-outreach'), ('AI learning', 'learn'), ('platform design review', 'learn'), ('certification', 'learn')]:
            search.fill(term)
            expect(page.locator(f'[data-experience="{item_id}"]')).to_be_visible()
            assert page.locator('[data-experience]:visible').count() < total
        search.fill('there-is-no-such-experience-xyz')
        expect(page.locator('#discovery-empty')).to_be_visible()
        expect(page.locator('[data-experience]:visible')).to_have_count(0)
        page.get_by_role('button', name='Show everything', exact=True).click()
        expect(search).to_be_focused()
        expect(page.locator('[data-experience]:visible')).to_have_count(total)
        select = page.get_by_label('Browse by interest')
        for value in select.locator('option').evaluate_all('(els) => els.map(e => e.value)'):
            select.select_option(value)
            assert page.locator('[data-experience]:visible').count() > 0, value
        select.select_option('all')
        search.focus()
        page.keyboard.press('Tab')
        expect(select).to_be_focused()
        # Searching never exports free text. Only fixed category values were sent.
        events = page.evaluate('window.measured')
        assert events and all(e['name'] == 'explore_filter' and set(e['data']) == {'category'} for e in events), events
        page.screenshot(path=f'/tmp/intent-explore-{width}.png', full_page=True)
        # Empty boolean download attributes must keep native browser semantics.
        assert page.evaluate('''() => {
            const link = document.createElement('a');
            link.href = '/projects/'; link.setAttribute('download', '');
            document.body.append(link);
            let prevented;
            document.addEventListener('click', event => {
                prevented = event.defaultPrevented;
                event.preventDefault(); // Suppress the actual test download.
            }, {once:true});
            link.dispatchEvent(new MouseEvent('click', {bubbles:true,cancelable:true}));
            link.remove();
            return prevented;
        }''') is False
        # A delayed collector must finish before a real document navigation.
        page.route('https://demos.intentsolutions.io/intentoutreach/', lambda route: route.fulfill(body='<h1>Intercepted destination</h1>', content_type='text/html'))
        page.locator('[data-experience="intent-outreach"] .experience-primary').click()
        expect(page).to_have_url('https://demos.intentsolutions.io/intentoutreach/')
        recorded = captured[-1]
        assert recorded['name'] == 'experience_open'
        assert recorded['data']['experience'] == 'intent-outreach'
        assert set(recorded['data']) == {'experience','category','destination'}
        assert recorded['data']['destination'] == 'primary'
        for behavior in ('()=>{throw new Error("blocked")}', '()=>new Promise(()=>{})', 'undefined'):
            page.goto(base + '/', wait_until='networkidle')
            page.evaluate('() => {window.umami.track=' + behavior + ';}')
            page.get_by_role('link', name='Explore everything', exact=True).click()
            expect(page).to_have_url(base + '/projects/', timeout=2000)
        page.close()
    context = browser.new_context(java_script_enabled=False, viewport={'width':390,'height':900})
    page = context.new_page()
    page.goto(base + '/projects/', wait_until='domcontentloaded')
    expect(page.locator('[data-experience]:visible')).to_have_count(total)
    expect(page.locator('#discovery-controls')).to_be_hidden()
    assert page.get_by_role('link', name='Find the typing game', exact=True).get_attribute('href') == 'https://oma.intentsolutions.io/the-beacon-wakes/'
    context.close()
    browser.close()
print('PASS: homepage → Explore, visible mobile entry, task search, categories, empty/reset, keyboard and no-JavaScript discovery at four widths.')
