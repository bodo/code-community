#!/usr/bin/env bash
# Rebuild all artefacts and assert they match what's committed. Used in CI/
# pre-commit to prevent stale generated files from drifting out of sync with
# the design-tokens.json source of truth.
set -euo pipefail
cd "$(dirname "$0")/.."

./scripts/build.sh

if ! git diff --quiet -- build/; then
  echo ""
  echo "ERROR: ci/build/ is out of sync with the sources." >&2
  echo "Run 'cd ci && npm run build' and commit the changes." >&2
  git --no-pager diff --stat -- build/ >&2
  exit 1
fi

echo "✓ ci/build/ is up to date."
