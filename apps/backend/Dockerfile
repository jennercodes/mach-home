# syntax=docker/dockerfile:1
#
# Medusa backend — multi-stage build.
# Build context MUST be the monorepo root (needs the pnpm workspace files).
#   docker build -f apps/backend/Dockerfile -t mach-home-backend .

##### Builder #####
FROM node:22-bookworm-slim AS builder
ENV PNPM_HOME="/pnpm" PATH="/pnpm:$PATH"
# Toolchain for any native module that lacks a prebuilt binary (node-gyp).
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable
WORKDIR /app

# Manifests first so the dependency layer is cached across source changes.
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/storefront/package.json ./apps/storefront/package.json
RUN pnpm install --frozen-lockfile --filter=@dtc/backend...

# Source + build: `medusa build` emits a self-contained app in .medusa/server.
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
RUN pnpm run build

# Install ONLY production deps inside the built server output. The runner then
# copies this folder wholesale (code + node_modules + compiled admin dashboard).
# --legacy-peer-deps: the admin bundle's peer (react 19) clashes with the
# backend's react 18, but react is not used at runtime by the API server.
WORKDIR /app/apps/backend/.medusa/server
RUN npm install --omit=dev --no-audit --no-fund --legacy-peer-deps

##### Runner #####
FROM node:22-bookworm-slim AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder --chown=node:node /app/apps/backend/.medusa/server ./
USER node
EXPOSE 9000
# Apply pending migrations, then boot. `db:migrate` is a no-op when the schema
# is already current (e.g. after restoring a pg_dump). For multi-instance
# deploys, move `db:migrate` to a one-off release job instead of every boot.
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
