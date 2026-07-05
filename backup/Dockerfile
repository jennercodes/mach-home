# syntax=docker/dockerfile:1
# Scheduled Postgres backups to S3-compatible storage (Cloudflare R2).
# Based on postgres:18-alpine so pg_dump matches the compose Postgres 18
# (pg_dump must be >= the server's major version). aws-cli uploads to R2.
FROM postgres:18-alpine

RUN apk add --no-cache aws-cli

COPY backup.sh entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/backup.sh /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
