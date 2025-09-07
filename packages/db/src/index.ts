import knex, { Knex } from 'knex';
import { config } from 'dotenv';

config();

export const getDb = (): Knex =>
  knex({
    client: 'mssql',
    connection: {
      server: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });
