#!/bin/sh
# Runs a backup on start and then every BACKUP_INTERVAL_SECONDS. Disabled (idles)
# when BACKUP_S3_BUCKET is empty, so local/dev deploys don't need it configured.
set -eu

if [ -z "${BACKUP_S3_BUCKET:-}" ]; then
  echo "[backup] BACKUP_S3_BUCKET not set — backups disabled. Idling."
  exec tail -f /dev/null
fi

INTERVAL="${BACKUP_INTERVAL_SECONDS:-86400}"
echo "[backup] enabled. bucket=${BACKUP_S3_BUCKET} prefix=${BACKUP_S3_PREFIX:-postgres} interval=${INTERVAL}s"

while true; do
  /usr/local/bin/backup.sh || echo "[backup] FAILED — will retry next cycle"
  sleep "${INTERVAL}"
done
