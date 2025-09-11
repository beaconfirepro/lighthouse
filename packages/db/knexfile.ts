import 'dotenv/config';
import type { Knex } from 'knex';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} env var is required`);
  return value;
}

const SQL_SERVER = requireEnv('SQL_SERVER');
const SQL_DB = requireEnv('SQL_DB');
const SQL_USER = requireEnv('SQL_USER');
const SQL_PASSWORD = requireEnv('SQL_PASSWORD');
const SQL_ENCRYPT = process.env.SQL_ENCRYPT === 'true';

const config: Knex.Config = {
  client: 'mssql',
  connection: {
    server: SQL_SERVER,
    database: SQL_DB,
    user: SQL_USER,
    password: SQL_PASSWORD,
    options: { encrypt: SQL_ENCRYPT },
  },
  pool: { min: 1, max: 10 },
  migrations: { tableName: 'knex_migrations', directory: './migrations', extension: 'ts' },
  seeds: { directory: './seeds', extension: 'ts' },
};

export default config;
