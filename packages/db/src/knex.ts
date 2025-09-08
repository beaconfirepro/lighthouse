import knex, { Knex } from 'knex';
<<<<<<< HEAD
import config from '../knexfile.js';

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
=======

let db: Knex | null = null;

export const getDb = (): Knex => {
  if (!db) {
    db = knex({
      client: 'mssql',
      connection: {
        server: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
    });
  }
  return db;
};

export const closeDb = async (): Promise<void> => {
  if (db) {
    await db.destroy();
    db = null;
  }
};
>>>>>>> main
