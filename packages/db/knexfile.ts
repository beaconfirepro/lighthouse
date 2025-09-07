import 'dotenv/config';
import type { Knex } from 'knex';

const { SQL_SERVER, SQL_DB, SQL_USER, SQL_PASSWORD, SQL_ENCRYPT = 'true' } = process.env;

const config: Knex.Config = {
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

export default config;
