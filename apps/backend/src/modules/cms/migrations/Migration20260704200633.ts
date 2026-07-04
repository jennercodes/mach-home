import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260704200633 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "site_section" drop constraint if exists "site_section_key_unique";`);
    this.addSql(`create table if not exists "site_section" ("id" text not null, "key" text not null, "value" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "site_section_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_site_section_key_unique" ON "site_section" ("key") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_site_section_deleted_at" ON "site_section" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "site_section" cascade;`);
  }

}
