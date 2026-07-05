#!/bin/sh
# Dump the Postgres database and upload a gzipped copy to S3-compatible storage.
set -eu

TS=$(date -u +%Y%m%d-%H%M%S)
FILE="medusa-${TS}.sql.gz"
PREFIX="${BACKUP_S3_PREFIX:-postgres}"
DEST="s3://${BACKUP_S3_BUCKET}/${PREFIX}/${FILE}"
TMP="/tmp/${FILE}"

echo "[backup] $(date -u) dumping ${POSTGRES_DATABASE} @ ${POSTGRES_HOST} ..."
PGPASSWORD="${POSTGRES_PASSWORD}" pg_dump \
  -h "${POSTGRES_HOST}" -p "${POSTGRES_PORT:-5432}" \
  -U "${POSTGRES_USER}" -d "${POSTGRES_DATABASE}" \
  --no-owner --no-privileges --clean --if-exists \
  | gzip -9 > "${TMP}"

SIZE=$(du -h "${TMP}" | cut -f1)
echo "[backup] uploading ${FILE} (${SIZE}) -> ${DEST} ..."
AWS_ACCESS_KEY_ID="${S3_ACCESS_KEY_ID}" \
AWS_SECRET_ACCESS_KEY="${S3_SECRET_ACCESS_KEY}" \
aws s3 cp "${TMP}" "${DEST}" \
  --endpoint-url "${S3_ENDPOINT}" --region "${S3_REGION:-auto}"

rm -f "${TMP}"
echo "[backup] done: ${DEST}"
