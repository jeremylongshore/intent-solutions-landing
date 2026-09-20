#!/usr/bin/env bash
# Proves the checker still catches drift. A checker that cannot fail is worthless.
set -euo pipefail
cd "$(dirname "$0")"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
for site in company labs evals demos learn omarchy; do
  printf '<html><body>\n%s\n<main>x</main></body></html>' "$(cat fragments/estate-bar.$site.html)" > "$T/$site.html"
  python3 check_estate_bar.py --site "$site" --vendor . "$T/$site.html" >/dev/null
done
sed 's/>Omarchy</>OMA</' "$T/demos.html" > "$T/label.html"
sed 's#https://labs.intentsolutions.io/#https://labs.example.com/#' "$T/demos.html" > "$T/href.html"
echo '<html><body></body></html>' > "$T/missing.html"
for bad in label href missing; do
  if python3 check_estate_bar.py --site demos --vendor . "$T/$bad.html" 2>/dev/null; then
    echo "selftest FAILED: checker accepted a drifted page ($bad)"; exit 1
  fi
done
if python3 check_estate_bar.py --site demos --vendor . --glob "$T/none/*.html" 2>/dev/null; then
  echo "selftest FAILED: checker passed with zero files"; exit 1
fi
echo "estate-bar selftest: 6 good pages pass; label, href, missing-bar and zero-file cases fail"
