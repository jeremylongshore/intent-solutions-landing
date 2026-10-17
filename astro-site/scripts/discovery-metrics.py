#!/usr/bin/env python3
"""Read-only aggregate discovery baseline. No notifications or form submissions."""
import argparse
from datetime import datetime, timedelta, timezone
import json
import os
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

API = 'https://analytics.intentsolutions.io'
ZONE = timezone(timedelta(hours=-6))


def request(path, token=None, body=None):
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = 'Bearer ' + token
    req = Request(API + path, headers=headers,
                  data=json.dumps(body).encode() if body else None)
    with urlopen(req, timeout=25) as response:
        return json.load(response)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--end', default=datetime.now(ZONE).date().isoformat(),
                        help='Exclusive end date, fixed UTC-6; defaults to today')
    parser.add_argument('--registry', type=Path,
                        default=Path.home() / '.config/intentsolutions/web-analytics-sites.json')
    args = parser.parse_args()
    end = datetime.strptime(args.end, '%Y-%m-%d').replace(tzinfo=ZONE)
    if end > datetime.now(ZONE):
        parser.error('end must exclude the unfinished current day')
    password = os.environ.get('UMAMI_PASSWORD')
    if not password:
        for line in (Path.home() / '.env').read_text().splitlines():
            key, sep, value = line.removeprefix('export ').partition('=')
            if sep and key.strip() == 'UMAMI_PASSWORD':
                password = value.strip().strip('\"\'')
    if not password:
        raise SystemExit('UMAMI_PASSWORD unavailable')
    token = request('/api/auth/login', body={'username': 'admin', 'password': password})['token']
    sites = {site['domain']: site for site in json.loads(args.registry.read_text())['sites']}
    rows = []
    for domain, paths in [('intentsolutions.io', ['/', '/projects/']),
                          ('demos.intentsolutions.io', ['/intentoutreach/'])]:
        site = sites[domain]
        prefix = '/api/websites/' + site['website_id']
        for label, start, stop in [('prior_week', end-timedelta(days=14), end-timedelta(days=7)),
                                   ('week', end-timedelta(days=7), end)]:
            params = {'startAt': int(start.timestamp()*1000),
                      'endAt': int(stop.timestamp()*1000)-1, 'hostname': domain}
            # Some Umami versions silently ignore unknown filter names. Prove
            # both active filter keys before interpreting a page-level count.
            for invalid in [{'path': '/__discovery_filter_guard_never_published__/'},
                            {'hostname': 'discovery-filter-guard.invalid'}]:
                guard = request(prefix + '/stats?' + urlencode(params | invalid), token)
                if guard['pageviews'] != 0:
                    raise RuntimeError('Analytics filter guard failed; refusing misleading totals')
            for path in paths:
                scoped = params | {'path': path}
                stats = request(prefix + '/stats?' + urlencode(scoped), token)
                events = request(prefix + '/metrics?' + urlencode(scoped | {'type': 'event'}), token)
                allowed = {'explore_open', 'experience_open', 'explore_filter', 'outreach_inquiry'}
                rows.append({'hostname': domain, 'path': path, 'period': label,
                             'start': start.isoformat(), 'end_exclusive': stop.isoformat(),
                             'pageviews': stats['pageviews'], 'visitors': stats['visitors'],
                             'events': [event for event in events if event.get('x') in allowed]})
    print(json.dumps({'rows': rows, 'interpretation': [
        'Events count actions, not unique people; bots and team visits may be included.',
        'Separate website properties do not establish a joined cross-domain funnel.',
        'No historical Outreach instrumentation means zero recorded views is not zero actual visitors.',
        'Inquiry accepted is a browser-observed API acknowledgement, not confirmed Buzz delivery.',
        'Use Umami event Properties to break outreach_inquiry down by stage.'
    ]}, indent=2))


if __name__ == '__main__':
    main()
