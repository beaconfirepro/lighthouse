import knex, { Knex } from 'knex';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../knexfile.cjs') as Knex.Config;

let db: Knex | null = null;

export function getDb(): Knex {
  if (!db) {
    db = knex(config);
  }
  return db;
}

export async function closeDb(): Promise<void> {
  if (db) {
    await db.destroy();
    db = null;
  }
}
