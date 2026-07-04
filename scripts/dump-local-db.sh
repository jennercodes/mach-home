#!/usr/bin/env bash
# Dump the local Medusa database to a plain-SQL file, using a dockerized
# Postgres client so no local psql/pg_dump install is needed.
#
# The dump carries EVERYTHING set up in dev: 14 merged products, categories,
# CMS content-pages/site-sections, uploaded-logo references, the publishable
# key, the PE region, inventory, Stripe config and the admin user.
# Images already live in Cloudflare R2 and are referenced by URL, so they need
# no migration.
#
# Usage:
#   scripts/dump-local-db.sh [SOURCE_DATABASE_URL] [OUTPUT_FILE]
# Defaults match apps/backend/.env (local Postgres, db "medusa-mach-home").
set -euo pipefail

SRC_URL="${1:-postgres://postgres@host.docker.internal/medusa-mach-home}"
OUT="${2:-mach-home-dump.sql}"

echo "Dumping ${SRC_URL} -> ${OUT} ..."
# pg_dump must be >= the server's major version; local dev runs PG 18.
docker run --rm \
  --add-host=host.docker.internal:host-gateway \
  -e PGURL="${SRC_URL}" \
  postgres:18-alpine \
  sh -c 'pg_dump --no-owner --no-privileges --clean --if-exists "$PGURL"' > "${OUT}"

echo "Done. $(wc -l < "${OUT}") lines written to ${OUT}"
