#!/usr/bin/env bash
set -euo pipefail
# Releases and runtime dependencies must remain readable by the unprivileged
# Nginx and API-service accounts even when the invoking shell has a restrictive umask.
umask 022

# Run on the VM after a clean fast-forward update of /srv/digitalpakt/app.
# This script deliberately refuses to deploy local or uncommitted work.
APP_DIR="/srv/digitalpakt/app"
RELEASES_DIR="/srv/digitalpakt/releases"
CURRENT_LINK="/srv/digitalpakt/current"
API_ENV_FILE="/etc/klarfoerdern/api.env"

cd "$APP_DIR"
git diff --quiet
git diff --cached --quiet

commit="$(git rev-parse --verify HEAD)"
release_dir="$RELEASES_DIR/$commit"

npm ci
npm run check
npm run test
npm run build

test -r "$API_ENV_FILE"
set -a
# The file is provisioned outside Git and contains production secrets.
source "$API_ENV_FILE"
set +a
npm run db:migrate

test -f dist/index.html
test -f api/dist/server.js
mkdir -p "$RELEASES_DIR"
rm -rf "$release_dir"
install -d -m 0755 "$release_dir"
cp -a dist/. "$release_dir/"
ln -sfn "$release_dir" "${CURRENT_LINK}.next"
mv -Tf "${CURRENT_LINK}.next" "$CURRENT_LINK"

systemctl restart klarfoerdern-api
for _ in {1..20}; do
  if curl --fail --silent --show-error http://127.0.0.1:3000/api/health >/dev/null; then
    break
  fi
  sleep 1
done
curl --fail --silent --show-error http://127.0.0.1:3000/api/health >/dev/null
nginx -t
systemctl reload nginx
printf 'Deployed %s to %s\n' "$commit" "$release_dir"
