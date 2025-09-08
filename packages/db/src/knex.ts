import knex, { Knex } from 'knex';

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
