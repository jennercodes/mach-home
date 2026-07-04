#!/usr/bin/env bash
# Restore a pg_dump into the running compose Postgres container.
#
# Run this BEFORE the backend boots for the first time:
#   docker compose up -d postgres redis
#   scripts/restore-prod-db.sh mach-home-dump.sql
#   docker compose up -d --build          # backend migrate() is then a no-op
#
# The dump was made with --clean --if-exists, so it is safe to re-run: it drops
# and recreates objects before loading data.
#
# Usage:
#   scripts/restore-prod-db.sh [DUMP_FILE] [COMPOSE_POSTGRES_SERVICE]
set -euo pipefail

DUMP="${1:-mach-home-dump.sql}"
SERVICE="${2:-postgres}"

if [ ! -f "${DUMP}" ]; then
  echo "Dump file not found: ${DUMP}" >&2
  exit 1
fi

echo "Restoring ${DUMP} into compose service '${SERVICE}' ..."
docker compose exec -T "${SERVICE}" \
  sh -c 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < "${DUMP}"

echo "Restore complete."
