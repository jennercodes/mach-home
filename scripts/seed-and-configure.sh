#!/usr/bin/env bash
# Reproducible content path (no DBngin). Assumes `docker compose up -d --build
# backend` already ran (the migration seeds the Perú/PEN base + publishable key).
#
# 1. Seeds the catalog + CMS (idempotent).
# 2. Reads the freshly-generated publishable key.
# 3. Writes it into .env and rebuilds the storefront so the browser bundle uses it.
#
# Usage: scripts/seed-and-configure.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "▸ Seeding catalog + CMS ..."
docker compose exec -T backend npx medusa exec ./src/scripts/seed-all.js

echo "▸ Reading publishable key ..."
KEY=$(docker compose exec -T backend npx medusa exec ./src/scripts/print-publishable-key.js 2>/dev/null \
  | grep -oE 'pk_[A-Za-z0-9]+' | tail -1)
if [ -z "${KEY:-}" ]; then
  echo "✗ Could not read the publishable key. Is the backend up and migrated?" >&2
  exit 1
fi
echo "  publishable key: $KEY"

echo "▸ Writing key into .env ..."
if grep -q '^NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=' .env 2>/dev/null; then
  sed -i.bak "s|^NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=.*|NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$KEY|" .env && rm -f .env.bak
else
  echo "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$KEY" >> .env
fi

echo "▸ Rebuilding storefront with the new key ..."
docker compose up -d --build storefront

echo "✓ Done. Storefront: http://localhost:8000  ·  Admin: http://localhost:9000/app"
