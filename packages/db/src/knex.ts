// packages/db/src/knex.ts
import knex, { Knex } from 'knex';

let _db: Knex | null = null;

function createConfig(): Knex.Config {
  const { SQL_SERVER, SQL_DB, SQL_USER, SQL_PASSWORD, SQL_ENCRYPT = 'true' } = process.env;
  return {
    client: 'mssql',
    connection: {
      server: SQL_SERVER,
      database: SQL_DB,
      user: SQL_USER,
      password: SQL_PASSWORD,
      options: { encrypt: SQL_ENCRYPT === 'true' },
    },
    pool: { min: 1, max: 10 },
    migrations: { tableName: 'knex_migrations', directory: './migrations', extension: 'ts' },
    seeds: { directory: './seeds', extension: 'ts' },
  };
}

export function getDb(): Knex {
  if (!_db) _db = knex(createConfig());
  return _db;
}

export async function closeDb(): Promise<void> {
  if (_db) {
    await _db.destroy();
    _db = null;
  }
}

// Optional: re-export Knex type for consumers
export type { Knex };
