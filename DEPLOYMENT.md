# Despliegue a producción — MACH HOME

Stack dockerizado para self-host (Coolify / VPS): **Postgres + Redis + backend Medusa + storefront Next.js**. Las imágenes ya viven en **Cloudflare R2**, así que persisten sin importar dónde corra la app.

## Arquitectura

```
                    ┌──────────────┐
  navegador ──────► │  storefront  │ :8000  (Next.js standalone)
                    └──────┬───────┘
                           │ NEXT_PUBLIC_MEDUSA_BACKEND_URL (público)
                           ▼
                    ┌──────────────┐   ┌────────────┐
                    │   backend    │──►│ Cloudflare │  (imágenes)
                    │  Medusa /app │   │     R2     │
                    └───┬──────┬───┘   └────────────┘
                        │      │
                 ┌──────▼─┐ ┌──▼─────┐
                 │postgres│ │ redis  │
                 └────────┘ └────────┘
```

- **backend** `:9000` — API store/admin + dashboard admin en `/app`.
- **storefront** `:8000` — Next.js. Los `NEXT_PUBLIC_*` se **hornean en build-time**.
- **postgres/redis** — servicios internos del compose (no publicados al host).

---

## 1. Preparar variables

```bash
cp .env.production.template .env      # gitignored
```

Editar `.env`:

- **Secretos** — rotar sí o sí (dev usa `supersecret`):
  ```bash
  openssl rand -base64 32   # JWT_SECRET
  openssl rand -base64 32   # COOKIE_SECRET
  openssl rand -base64 32   # POSTGRES_PASSWORD
  ```
  > Rotar `COOKIE_SECRET` invalida sesiones existentes — irrelevante en el primer lanzamiento.
- **CORS** — dominios reales (`STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS`).
- **R2** — reutilizar el bucket actual `machhome-imagenes` (mismas llaves que dev).
- **Storefront** — `NEXT_PUBLIC_MEDUSA_BACKEND_URL` = **URL pública** de la API (la usan el navegador *y* el SSR). No hace falta poner `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` a mano: `seed-and-configure.sh` la escribe tras sembrar.

---

## 2. Poblar el contenido (reproducible, sin DBngin)

El contenido vive **versionado en el repo**, no en un dump: el catálogo (14 productos) está en `apps/backend/src/scripts/data/catalog.ts` (generado del CSV) y el CMS en los scripts de seed. La base (región Perú/PEN, canal, publishable key, envío) la crea la migración `initial-data-seed.ts` al arrancar.

```bash
docker compose up -d --build      # la migración crea la base PE + publishable key
scripts/seed-and-configure.sh     # siembra catálogo + CMS, lee la key y reconstruye el storefront
```

`seed-and-configure.sh` corre `seed-all.js` (idempotente: catálogo, taxonomía, inventario, shipping, CMS), extrae la publishable key recién generada, la escribe en `.env` y reconstruye el storefront para que el bundle del navegador la use.

Crear el usuario admin (no viene en el seed):

```bash
docker compose exec backend npx medusa user -e admin@mach-home.com -p <password>
```

> La publishable key se **regenera** en cada entorno nuevo (correcto: cada DB tiene la suya); el script la cablea sola. Las imágenes ya viven en R2.

<details><summary>Alternativa: copia exacta con pg_dump → restore</summary>

Si prefieres una copia byte-a-byte de un entorno existente (conserva su publishable key y usuario admin), están `scripts/dump-local-db.sh` y `scripts/restore-prod-db.sh`. Requiere un Postgres fuente encendido.

```bash
scripts/dump-local-db.sh                       # → mach-home-dump.sql (Docker, sin psql local)
docker compose up -d postgres redis
scripts/restore-prod-db.sh mach-home-dump.sql
docker compose up -d --build                   # db:migrate = no-op
```
</details>

---

## 3. Levantar el stack

```bash
docker compose up -d --build
docker compose ps          # esperar healthy en los 4 servicios
docker compose logs -f backend
```

- Storefront → `http://<host>:8000`
- Admin → `http://<host>:9000/app`

Poner un reverse proxy (Coolify/Traefik/Caddy) con TLS delante, mapeando:
`mach-home.com → storefront:8000` y `api.mach-home.com → backend:9000`.

---

## 4. Coolify

Coolify consume el `docker-compose.yml` directo:

1. Nuevo recurso → **Docker Compose**, apuntar al repo (branch `main`).
2. Pegar/seleccionar `docker-compose.yml`.
3. Cargar todas las variables de `.env.production.template` en el panel de Environment (incluidas las `NEXT_PUBLIC_*`, que Coolify pasa como build-args).
4. Dominios: `storefront` → dominio público con TLS; `backend` → subdominio `api.` con TLS.
5. Para el contenido: desde la terminal de Coolify, `docker compose exec backend npx medusa exec ./src/scripts/seed-all.js`, luego pega la publishable key resultante en la variable `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` y redeploya el storefront.

---

## Notas y gotchas

- **`NEXT_PUBLIC_*` = build-time.** Cambiar el dominio de la API o la key obliga a **rebuild** del storefront, no basta reiniciar.
- **Dos URLs del backend.** El browser usa `NEXT_PUBLIC_MEDUSA_BACKEND_URL` (público, horneado). El SSR del contenedor usa `MEDUSA_BACKEND_URL` (interno, `http://backend:9000` por defecto) — así no da hairpin por el dominio público. En local, esto evita que el SSR falle contra `localhost:9000`.
- **Puertos.** `docker-compose.yml` NO publica puertos al host (usa `expose:`); el proxy de Coolify enruta los dominios por la red interna y así se evita `port is already allocated`. El desarrollo local sí los publica vía `docker-compose.override.yml` (auto-mergeado por `docker compose up`).
- **Redis en prod.** `medusa-config.ts` ahora activa event-bus / cache / workflow-engine / locking sobre Redis **cuando `REDIS_URL` está seteado** (el compose lo hace). En local sin Redis se mantiene el modo in-memory — no requiere nada extra.
- **Migraciones.** El backend corre `medusa db:migrate` al arrancar (incluye las tablas del módulo CMS). Idempotente. Para multi-instancia, moverlo a un job de release en vez de cada boot.
- **SSL de Postgres.** Medusa intenta SSL en producción. El Postgres self-host (compose/DBngin) no lo tiene → `DATABASE_SSL=false` (default). Solo `true` para DBs gestionadas (Neon/RDS/Supabase). Sin esto el backend crashea con `server does not support SSL connections`.
- **Cookie del admin.** En producción Medusa marca la cookie de sesión `Secure`, que `express-session` no emite sobre HTTP → el login del admin falla en silencio. Prod detrás de HTTPS: `COOKIE_SECURE=true`. Local sobre `http://localhost`: `COOKIE_SECURE=false` (default).
- **Multi-instancia / escalado.** Separar un servicio `worker` (`MEDUSA_WORKER_MODE=worker`) del `server` (`MEDUSA_WORKER_MODE=server`); ambos comparten Postgres + Redis. Un solo contenedor (`shared`, default) basta para lanzar.
- **Imágenes.** En R2 (cloud). No se migran. Verificar que `S3_*` apunten al mismo bucket para que las URLs existentes resuelvan.
- **Admin user.** Viene en el dump. Para crear uno nuevo:
  `docker compose exec backend npx medusa user -e admin@mach-home.com -p <password>`
- **Backups.** El servicio `backup` sube un `pg_dump` diario a R2 (ver sección abajo).

---

## Backups automáticos (servicio `backup`)

El servicio `backup` hace un `pg_dump` (cliente PG18) comprimido y lo sube a un
bucket **privado** de R2, cada `BACKUP_INTERVAL_SECONDS` (24h por defecto). Se
deshabilita solo (idlea) si `BACKUP_S3_BUCKET` está vacío, así que en local no
molesta.

**Setup (una vez):**

1. En Cloudflare R2 crea un bucket **privado** — p. ej. `machhome-backups`.
   NO uses el bucket de imágenes (es público; los dumps tienen data sensible).
2. Asegura que tu token de R2 (`S3_ACCESS_KEY_ID`/`SECRET`) tenga acceso de
   escritura a ese bucket (o crea un token nuevo con scope a ese bucket).
3. En el env: `BACKUP_S3_BUCKET=machhome-backups` (opcional `BACKUP_S3_PREFIX`,
   `BACKUP_INTERVAL_SECONDS`). Redeploy.
4. **Retención:** en R2, agrega una *lifecycle rule* al bucket para borrar
   objetos con más de N días (p. ej. 14). Así no crecen indefinidamente.

Los dumps quedan en `s3://machhome-backups/postgres/medusa-YYYYMMDD-HHMMSS.sql.gz`.

**Restaurar un backup:**

```bash
# baja el .sql.gz de R2, luego:
gunzip -c medusa-20260705-030000.sql.gz \
  | docker compose exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
```

El dump usa `--clean --if-exists`, así que se puede restaurar sobre una DB
existente. Para restaurar en limpio: `docker compose up -d postgres`, restaura,
y luego `docker compose up -d` (backend/storefront).
