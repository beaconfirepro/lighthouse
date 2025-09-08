// packages/db/src/knex.ts
import knex, { Knex } from 'knex';
// go up one level from /src to reach knexfile.ts
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

// Optional: re-export Knex type for consumers
export type { Knex };
