#!/usr/bin/env python3
"""Offline regression tests for discovery boundaries and failure evidence."""
import datetime as dt
import importlib.util
import json
from pathlib import Path
import unittest
from unittest.mock import MagicMock, patch

spec = importlib.util.spec_from_file_location('coverage', Path(__file__).with_name('audit-public-routes.py'))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class CoverageTests(unittest.TestCase):
    def setUp(self):
        self.policy = json.loads(m.POLICY.read_text())
        self.contract = {'experiences': [], 'pages': [], 'legacy': [], 'chapters': []}
        self.audit = m.Audit(self.policy, self.contract, dt.date(2026, 10, 17))

    def page(self, url='https://labs.intentsolutions.io/examples/', body=None, **kwargs):
        row = self.audit.discover(url, 'fixture')
        response = {'url': url, 'final': url, 'status': 200, 'body': body if body is not None else f'<a href="{m.EXPLORE}">Explore</a>', **kwargs}
        self.audit.inspect(row, response)
        return row

    def kinds(self):
        return [x['kind'] for x in self.audit.issues]

    def test_new_catalog_route_needs_review_and_is_never_fetched(self):
        row = self.audit.discover('https://demos.intentsolutions.io/new-product/', 'source:manifest')
        self.assertEqual(row['classification'], 'unclassified')
        self.assertFalse(self.audit.eligible(row))
        self.assertIn('unclassified', self.kinds())

    def test_private_action_query_and_external_hosts_never_requested(self):
        for url in ['https://learn.intentsolutions.io/user/login', 'https://demos.intentsolutions.io/api/send',
                    'https://demos.intentsolutions.io/?token=private', 'https://unknown.example/',
                    'https://demos.intentsolutions.io/%61pi/send', 'http://demos.intentsolutions.io/']:
            row = self.audit.discover(url, 'fixture')
            self.assertFalse(self.audit.eligible(row), url)
            self.assertIn('excluded', row)

    def test_unsafe_redirect_is_refused_before_network(self):
        result = m.Fetcher({'labs.intentsolutions.io'}).get('https://labs.intentsolutions.io/api/send')
        self.assertEqual(result['error'], 'unsafe redirect or URL refused')

    def test_redirect_to_private_target_is_not_followed(self):
        response = MagicMock()
        response.__enter__.return_value = response
        response.code = 302
        response.headers = {'Location': '/api/private'}
        opener = MagicMock()
        opener.open.return_value = response
        with patch.object(m.urllib.request, 'build_opener', return_value=opener):
            result = m.Fetcher({'labs.intentsolutions.io'}).get('https://labs.intentsolutions.io/')
        self.assertEqual(opener.open.call_count, 1)
        self.assertEqual(result['error'], 'unsafe redirect or URL refused')

    def test_static_directory_alias_does_not_truncate_adr_index(self):
        row = self.audit.discover('https://demos.intentsolutions.io/platform-review/index.html', 'link')
        self.assertEqual(row['alias'], 'https://demos.intentsolutions.io/platform-review/')
        row = self.audit.discover('https://demos.intentsolutions.io/platform-review/adr-index.html', 'source:manifest')
        self.assertNotEqual(row['classification'], 'unclassified')
        self.assertNotIn('alias', row)

    def test_unclassified_same_host_redirect_is_not_followed(self):
        response = MagicMock()
        response.__enter__.return_value = response
        response.code = 302
        response.headers = {'Location': '/new-unreviewed/'}
        opener = MagicMock()
        opener.open.return_value = response
        with patch.object(m.urllib.request, 'build_opener', return_value=opener):
            result = m.Fetcher({'labs.intentsolutions.io'}, redirect_allowed=lambda u: False).get('https://labs.intentsolutions.io/')
        self.assertEqual(opener.open.call_count, 1)
        self.assertEqual(result['error'], 'unclassified redirect refused before request')

    def test_reviewed_html_handoff_preserves_canonical_target(self):
        url = 'https://demos.intentsolutions.io/prospect-prep-automation/'
        target = url + 'how-it-works.html'
        self.page(url, f'<meta http-equiv="refresh" content="0; url=./how-it-works.html"><link rel="canonical" href="{target}"><a href="{m.EXPLORE}">Explore</a>')
        self.assertEqual(self.audit.report()['issues'], [])

    def test_policy_rejects_duplicate_routes_and_unknown_manifest(self):
        m.validate_policy(self.policy)
        self.policy['routes']['learn.intentsolutions.io']['paths'].append('/')
        with self.assertRaises(ValueError):
            m.validate_policy(self.policy)

    def test_hash_child_is_classified_but_sampling_is_bounded(self):
        rows = [self.audit.discover(f'https://labs.intentsolutions.io/results/iec/sha256-{i:064x}/', 'link:collection') for i in range(12)]
        self.assertEqual(sum(self.audit.eligible(r) for r in rows), 8)
        self.assertEqual(self.kinds(), [])
        unknown = self.audit.discover('https://labs.intentsolutions.io/results/new-publisher/sha256-' + '0'*64 + '/', 'link')
        self.assertFalse(self.audit.eligible(unknown))

    def test_missing_return_link_is_a_failure(self):
        self.page(body='<h1>No exit</h1>')
        self.assertIn('missing-return', self.kinds())

    def test_local_parent_return_is_accepted(self):
        self.page(body='<a href="/">Labs</a>')
        self.assertEqual(self.kinds(), [])

    def test_broken_page_and_stale_redirect_fail(self):
        self.page(status=404)
        self.assertIn('broken-target', self.kinds())
        self.page(final='https://labs.intentsolutions.io/', redirects=[{'status': 301}])
        self.assertIn('stale-target', self.kinds())

    def test_intentional_noindex_handoff_is_preserved(self):
        url = 'https://intentsolutions.io/agents/'
        self.audit.approved[url] = {'classification': 'legacy', 'noindexExpected': True}
        self.page(url, f'<meta name="robots" content="noindex,follow"><a href="{m.EXPLORE}">Explore</a>')
        self.assertEqual(self.kinds(), [])
        self.page(url)
        self.assertIn('index-policy', self.kinds())

    def test_crosscanonical_article_is_not_duplicate_offering(self):
        url = 'https://intentsolutions.io/field-notes/example/'
        self.audit.approved[url] = {'classification': 'crosspost', 'crossCanonical': 'https://startaitools.com/example/'}
        self.page(url, f'<link rel="canonical" href="https://startaitools.com/example/"><a href="{m.EXPLORE}">Explore</a>')
        self.assertEqual(self.audit.report()['issues'], [])

    def test_duplicate_canonical_is_reported(self):
        body = f'<link rel="canonical" href="https://labs.intentsolutions.io/examples/"><a href="{m.EXPLORE}">Explore</a>'
        self.page(body=body)
        self.page('https://labs.intentsolutions.io/start/', body)
        self.audit.report()
        self.assertIn('duplicate-canonical', self.kinds())

    def test_stale_classification_is_not_renewed_by_successful_get(self):
        self.audit.policy['reviewedAt'] = '2020-01-01'
        url = 'https://labs.intentsolutions.io/examples/'
        self.audit.approved[url]['reviewedAt'] = '2020-01-01'
        self.page(url)
        self.assertIn('stale-review', self.kinds())

    def test_source_is_not_deployed_evidence(self):
        url = 'https://labs.intentsolutions.io/examples/'
        self.audit.discover(url, 'source:manifest')
        report = self.audit.report()
        self.assertEqual(report['counts']['sourceDiscovered'], 1)
        self.assertEqual(report['counts']['httpChecked'], 0)
        self.assertEqual(report['counts']['deployedManifest'], 0)

    def test_excluded_artifact_is_not_promoted(self):
        url = 'https://demos.intentsolutions.io/databricks-cost-leak-hunter/build/docs_shell.html'
        row = self.audit.discover(url, 'owner-deployed-manifest')
        self.assertFalse(self.audit.eligible(row))
        self.assertEqual(row['classification'], 'intentional exclusion')
        self.assertEqual(self.kinds(), [])

    def test_request_cap_is_visible_failure(self):
        result = m.Fetcher({'labs.intentsolutions.io'}, max_requests=0).get('https://labs.intentsolutions.io/')
        self.assertEqual(result['error'], 'request cap reached')
        self.page(**result)
        self.assertIn('broken-target', self.kinds())

    def test_transport_error_is_not_a_verified_http_response(self):
        row = self.audit.discover('https://labs.intentsolutions.io/examples/', 'fixture')
        self.audit.inspect(row, {'url': row['url'], 'error': 'timed out'})
        counts = self.audit.report()['counts']
        self.assertEqual(counts['checksAttempted'], 1)
        self.assertEqual(counts['httpChecked'], 0)
        self.assertEqual(counts['successfulResponses'], 0)
        self.assertFalse(self.audit.eligible(row))


if __name__ == '__main__':
    unittest.main()
