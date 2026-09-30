import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from 'pg';

const migrationsDirectory = fileURLToPath(new URL('../../migrations/', import.meta.url));

export async function listMigrations() {
  const files = await readdir(migrationsDirectory);
  return files.filter((file) => file.endsWith('.sql')).sort();
}

export async function runMigrations(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL ist für Migrationen erforderlich.');
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    const applied = await client.query<{ name: string }>('SELECT name FROM schema_migrations');
    const appliedNames = new Set(applied.rows.map((migration) => migration.name));

    for (const migration of await listMigrations()) {
      if (appliedNames.has(migration)) {
        continue;
      }

      const sql = await readFile(join(migrationsDirectory, migration), 'utf8');
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [migration]);
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    }
  } finally {
    await client.end();
  }
}
