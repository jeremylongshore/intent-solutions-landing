# Security Policy

## Reporting a vulnerability

If you find a security issue in this repository or on
[intentsolutions.io](https://intentsolutions.io), please disclose it privately.

**Preferred channel:** email `jeremy@intentsolutions.io` with the subject
line `security: intent-solutions-landing` and as much detail as you can
share — reproduction steps, affected URL, observed vs expected behaviour,
and your timeline expectations.

**Do not** open a public GitHub issue or PR for vulnerabilities. Public
issues are appropriate for non-security bugs, content errors, and broken
links — see `CONTRIBUTING.md`.

## What's in scope

- Anything served from `intentsolutions.io` and its `www` redirect
- The form endpoints proxied to `forms-api` at `/api/forms/*`
- Build/CI configuration in this repository
- The deploy workflow (`.github/workflows/deploy-vps.yml`)

## What's out of scope

- Subdomains hosted on the same VPS (`analytics.`, `projects.`, `crm.`,
  `partners.`, etc.) — those have their own infrastructure and disclosure
  channels. Email above and we'll route it.
- Third-party services we link to (Google Calendar, Slack, GitHub).
- Reports based on automated scanners with no demonstrated impact.

## Response

Acknowledgement within **48 hours** on weekdays. We'll work with you on a
disclosure timeline and credit you in the fix announcement unless you ask
otherwise.

## Thanks

Responsible disclosure protects everyone. Appreciate the help.
