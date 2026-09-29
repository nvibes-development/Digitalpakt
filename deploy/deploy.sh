#!/usr/bin/env bash
set -euo pipefail

# Run on the VM after a clean fast-forward update of /srv/digitalpakt/app.
# This script deliberately refuses to deploy local or uncommitted work.
APP_DIR="/srv/digitalpakt/app"
RELEASES_DIR="/srv/digitalpakt/releases"
CURRENT_LINK="/srv/digitalpakt/current"

cd "$APP_DIR"
git diff --quiet
git diff --cached --quiet

commit="$(git rev-parse --verify HEAD)"
release_dir="$RELEASES_DIR/$commit"

npm ci
npm run check
npm run build

test -f dist/index.html
mkdir -p "$RELEASES_DIR"
rm -rf "$release_dir"
install -d -m 0755 "$release_dir"
cp -a dist/. "$release_dir/"
ln -sfn "$release_dir" "${CURRENT_LINK}.next"
mv -Tf "${CURRENT_LINK}.next" "$CURRENT_LINK"

nginx -t
systemctl reload nginx
printf 'Deployed %s to %s\n' "$commit" "$release_dir"
