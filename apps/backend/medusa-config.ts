import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const REDIS_URL = process.env.REDIS_URL

// Medusa attempts SSL in production by default. Self-hosted Postgres (docker,
// DBngin) has no SSL, which fails with "server does not support SSL
// connections". Default SSL off; set DATABASE_SSL=true for managed DBs.
const DATABASE_SSL = process.env.DATABASE_SSL === "true"

// In production Medusa marks the admin session cookie Secure + SameSite=None,
// which express-session silently drops over plain HTTP (e.g. http://localhost)
// — the admin then can't log in. Default the cookie to non-secure; set
// COOKIE_SECURE=true when the admin is served over HTTPS (Medusa already trusts
// the proxy, so a TLS-terminating proxy works with this on).
const COOKIE_SECURE = process.env.COOKIE_SECURE === "true"

// Base modules present in every environment.
// File storage is Cloudflare R2 (S3-compatible): images uploaded from the admin
// live in R2, so they persist across deploys no matter where the app runs.
const modules: any[] = [
  {
    resolve: "./src/modules/cms",
  },
  {
    resolve: "@medusajs/medusa/file",
    options: {
      providers: [
        {
          resolve: "@medusajs/medusa/file-s3",
          id: "s3",
          options: {
            file_url: process.env.S3_FILE_URL,
            access_key_id: process.env.S3_ACCESS_KEY_ID,
            secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
            region: process.env.S3_REGION,
            bucket: process.env.S3_BUCKET,
            endpoint: process.env.S3_ENDPOINT,
            additional_client_config: {
              forcePathStyle: true,
            },
          },
        },
      ],
    },
  },
]

// In production Medusa must not use the in-memory event bus / cache / workflow
// engine: they drop background jobs on restart and can't scale past one
// instance. When REDIS_URL is set we wire the Redis-backed modules; local dev
// without Redis keeps the in-memory defaults so nothing extra is required there.
if (REDIS_URL) {
  modules.push(
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      key: Modules.EVENT_BUS,
      options: { redisUrl: REDIS_URL },
    },
    {
      resolve: "@medusajs/medusa/cache-redis",
      key: Modules.CACHE,
      options: { redisUrl: REDIS_URL },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      key: Modules.WORKFLOW_ENGINE,
      options: { redis: { url: REDIS_URL } },
    },
    {
      resolve: "@medusajs/medusa/locking",
      key: Modules.LOCKING,
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/locking-redis",
            id: "locking-redis",
            is_default: true,
            options: { redisUrl: REDIS_URL },
          },
        ],
      },
    },
  )
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      connection: {
        ssl: DATABASE_SSL ? { rejectUnauthorized: false } : false,
      },
    },
    // Used for the HTTP session store when Redis is available.
    redisUrl: REDIS_URL,
    // Overrides the production default (Secure + SameSite=None) so admin login
    // works over HTTP; SameSite=Lax is fine since admin and API are same-origin.
    cookieOptions: {
      secure: COOKIE_SECURE,
      sameSite: "lax",
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules,
})
