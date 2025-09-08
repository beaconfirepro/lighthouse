import knex, { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: ':memory:'
  },
  useNullAsDefault: true
};

export const db = knex(config);
export type Database = Knex;
export default db;
