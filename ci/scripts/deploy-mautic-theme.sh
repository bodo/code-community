#!/usr/bin/env bash
#
# deploy-mautic-theme.sh — Build and deploy the Abschluss Mautic email theme.
#
# Prerequisites:
#   - ssh access to vps3 configured in ~/.ssh/config
#   - write permissions on /var/www/mautic/themes/ on vps3
#
# Target layout on vps3:
#   /var/www/mautic/themes/abschluss/
#     ├── config.json
#     ├── html/
#     │   ├── base.html.twig
#     │   ├── email.html.twig
#     │   └── page.html.twig
#     ├── assets/...
#     └── thumbnail.png
#
# The theme is then selectable in Mautic's theme picker (Email builder → Theme).
#
# Usage:
#   ./deploy-mautic-theme.sh              # build then deploy
#   DEPLOY_HOST=vps3 ./deploy-mautic-theme.sh
#
set -euo pipefail

DEPLOY_HOST="${DEPLOY_HOST:-vps3}"
REMOTE_THEMES_DIR="${REMOTE_THEMES_DIR:-/var/www/mautic/themes}"
THEME_NAME="abschluss"

CI_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOCAL_THEME="${CI_ROOT}/build/mautic-theme/${THEME_NAME}"

echo ">> Building Mautic theme (local)..."
cd "${CI_ROOT}"
./scripts/build.sh

if [ ! -d "${LOCAL_THEME}" ]; then
    echo "!! Expected theme directory not found: ${LOCAL_THEME}" >&2
    exit 1
fi

echo ""
echo ">> Deploying to ${DEPLOY_HOST}:${REMOTE_THEMES_DIR}/${THEME_NAME}/"

# Ensure destination exists
ssh "${DEPLOY_HOST}" "mkdir -p '${REMOTE_THEMES_DIR}/${THEME_NAME}'"

rsync -avz --delete \
    "${LOCAL_THEME}/" \
    "${DEPLOY_HOST}:${REMOTE_THEMES_DIR}/${THEME_NAME}/"

# Permissions: Mautic runs as www-data, must be able to read theme files.
ssh "${DEPLOY_HOST}" "chown -R www-data:www-data '${REMOTE_THEMES_DIR}/${THEME_NAME}' && find '${REMOTE_THEMES_DIR}/${THEME_NAME}' -type d -exec chmod 755 {} \\; && find '${REMOTE_THEMES_DIR}/${THEME_NAME}' -type f -exec chmod 644 {} \\;"

echo ""
echo ">> Done. Refresh Mautic's theme picker (Settings → Themes) to see 'Abschluss'."
