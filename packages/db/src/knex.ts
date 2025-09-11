// packages/db/src/knex.ts
import knex, { Knex } from 'knex';
import config from '../knexfile';

let _db: Knex | null = null;

export function getDb(): Knex {
  if (!_db) _db = knex(config);
  return _db;
}

export async function closeDb(): Promise<void> {
  if (_db) {
    await _db.destroy();
    _db = null;
  }
}

export type { Knex };
