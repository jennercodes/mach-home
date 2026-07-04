# syntax=docker/dockerfile:1
#
# Next.js storefront — multi-stage build producing a standalone server.
# Build context MUST be the monorepo root.
#   docker build -f apps/storefront/Dockerfile -t mach-home-storefront .
#
# IMPORTANT: NEXT_PUBLIC_* values are inlined into the client bundle at BUILD
# time. They must be passed as --build-arg (see docker-compose.yml). Changing
# them later requires a rebuild, not just a restart.

##### Builder #####
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm" PATH="/pnpm:$PATH"
RUN corepack enable
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY apps/storefront/package.json ./apps/storefront/package.json
COPY apps/backend/package.json ./apps/backend/package.json
RUN pnpm install --frozen-lockfile --filter=@dtc/storefront...

COPY apps/storefront ./apps/storefront

# Public build-time config (inlined into the browser bundle).
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_DEFAULT_REGION=pe
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_STRIPE_KEY
ARG MEDUSA_CLOUD_S3_HOSTNAME
ARG MEDUSA_CLOUD_S3_PATHNAME
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL \
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY \
    NEXT_PUBLIC_DEFAULT_REGION=$NEXT_PUBLIC_DEFAULT_REGION \
    NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_STRIPE_KEY=$NEXT_PUBLIC_STRIPE_KEY \
    MEDUSA_CLOUD_S3_HOSTNAME=$MEDUSA_CLOUD_S3_HOSTNAME \
    MEDUSA_CLOUD_S3_PATHNAME=$MEDUSA_CLOUD_S3_PATHNAME

WORKDIR /app/apps/storefront
# `next build` runs the standard (non-turbopack) production compiler.
RUN pnpm run build

##### Runner #####
FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8000 \
    HOSTNAME=0.0.0.0
WORKDIR /app

# Standalone output already contains a pruned node_modules for the monorepo.
COPY --from=builder --chown=node:node /app/apps/storefront/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/storefront/.next/static ./apps/storefront/.next/static
COPY --from=builder --chown=node:node /app/apps/storefront/public ./apps/storefront/public

USER node
EXPOSE 8000
CMD ["node", "apps/storefront/server.js"]
