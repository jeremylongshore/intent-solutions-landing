# Discovery measurement

The company property uses the existing Umami installation. Intent Outreach emits
its events to the registered Demos property. There is no cross-site identity or
new tracking cookie added by this change.

| Event | Properties | Meaning |
| --- | --- | --- |
| `explore_open` | source: home/other; surface: content/navigation/footer/estate-bar | A company visitor selected Explore. |
| `experience_open` | reviewed experience ID, category, primary/related | A directory visitor selected an experience link. |
| `explore_filter` | reviewed category or all | A visitor changed the category selector. |
| `outreach_inquiry` | stage: started/submitted/accepted/failed | Form focus, an admitted submission attempt, an API acknowledgement, or an unconfirmed attempt. |

Pageviews supply the visit counts for `/`, `/projects/` and
`https://demos.intentsolutions.io/intentoutreach/`. Custom event properties never
include names, emails, addresses, form contents, search terms, provider records,
destination URLs or arbitrary query parameters. Standard Umami page metadata is
still governed by the existing tracker. Do not put personal data in public URLs.
Event calls are best effort and cannot prevent navigation or form submission.

## Read the results

In Umami, select the company property and filter hostname to `intentsolutions.io`
(OMA shares that historical property). Select the Demos property and path
`/intentoutreach/` for the inquiry steps. The Events → Properties view breaks the
fixed inquiry stage down into its four values.

For a repeatable, read-only two-week baseline:

```sh
python3 scripts/discovery-metrics.py --end 2026-10-17
```

The end date is exclusive, at midnight fixed UTC−6. The script uses the existing
installed estate registry and `UMAMI_PASSWORD` from the environment or `~/.env`.
It prints aggregate counts only, sends no notifications, and does not run forms
or provider searches. Save reports privately, outside the published site.

The installed API accepts `path`, not `url`, for a page filter. Unknown filter
names can silently return whole-site totals. The script checks impossible path
and hostname controls before accepting scoped counts. Failed queries fail the
report; they never become zeros. This behavior was verified against production
on October 17, 2026.

## Evidence limits

Counts are actions and recorded visits, not deduplicated people or an attributed
cross-domain conversion rate. Multiple clicks, retries, team checks and bots can
affect them. No prior Outreach tracker was present, so zero historical recorded
views cannot establish zero visitors. Allow a full measurement period before
comparing these new events.

`accepted` means the browser received the contact API's success response. It does
not mean a person read the message or Buzz delivery was confirmed. The existing
service can preserve failed delivery in its private lead spool. Audit delivery
using the forms service's `buzz-delivered` / failure logs and private spool state;
do not copy payloads or receipt identifiers into public analytics. A browser
timeout is unconfirmed, not proof the server rejected the request. Honeypot
submission acknowledgements are excluded from submitted/accepted/failed events.

The browser gates intercept analytics and form calls, assert exact event schemas,
exercise retries and duplicates, and check that blocked analytics leaves the
visitor's task working. These tests are not real lead or delivery receipts.

Reference: [Umami event documentation](https://docs.umami.is/docs/track-events).
