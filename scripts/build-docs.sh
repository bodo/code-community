#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

DEPLOY_HOST="vps3"
DEPLOY_PATH="/var/www/info.abschluss.jetzt/htdocs"
HTPASSWD_USER="info"
HTPASSWD_PASS='abschlu$$'

pip install --quiet mkdocs-material

mkdocs build --clean

echo "Documentation built in site/"

if [[ "${1:-}" == "--deploy" ]]; then
    rsync -avz --delete --exclude='.htpasswd' --exclude='.htaccess' \
        site/ "${DEPLOY_HOST}:${DEPLOY_PATH}/"

    # Ensure .htpasswd exists on the server
    ssh "${DEPLOY_HOST}" "htpasswd -cb ${DEPLOY_PATH}/.htpasswd '${HTPASSWD_USER}' '${HTPASSWD_PASS}'"

    # Ensure .htaccess with Basic Auth is in place
    ssh "${DEPLOY_HOST}" "cat > ${DEPLOY_PATH}/.htaccess << EOF
AuthType Basic
AuthName \"info.abschluss.jetzt\"
AuthUserFile ${DEPLOY_PATH}/.htpasswd
Require valid-user
EOF"

    echo "Deployed to https://info.abschluss.jetzt"
elif [[ "${1:-}" == "--preview" ]]; then
    mkdocs serve
else
    echo "To preview locally: $0 --preview"
    echo "To deploy:          $0 --deploy"
fi
