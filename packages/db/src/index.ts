// packages/db/src/knex.ts
import knex, { Knex } from 'knex';
// from /packages/db/src -> up one level to /packages/db/knexfile.ts (runtime .js)
import config from '../knexfile.js';

let _db: Knex | null = null;

export function getDb(): Knex {
  if (!_db) _db = knex(config as Knex.Config);
  return _db;
}

export async function closeDb(): Promise<void> {
  if (_db) {
    await _db.destroy();
    _db = null;
  }
}

// Optional: export Knex type for consumers
export type { Knex };
