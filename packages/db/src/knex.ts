import knex, { Knex } from 'knex';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../knexfile.cjs') as Knex.Config;

let db: Knex | null = null;

export function getDb(): Knex {
  if (!db) {
    if (process.env.DB_HOST) {
      db = knex({
        client: 'mssql',
        connection: {
          server: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        },
      });
    } else {
      db = knex(config);
    }
  }
  return db;
}

export async function closeDb(): Promise<void> {
  if (db) {
    await db.destroy();
    db = null;
  }
}
