#!/usr/bin/env bash
# Build all design artefacts (tokens + Mautic theme) from ci/ source into ci/build/.
set -euo pipefail
cd "$(dirname "$0")/.."
node generators/build-all.mjs
