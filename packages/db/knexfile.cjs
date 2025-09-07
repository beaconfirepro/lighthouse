process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({ module: 'CommonJS' });
require('ts-node/register');
const path = require('path');

/** @type {import('knex').Knex.Config} */
const config = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'dev.sqlite3')
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, 'migrations'),
    extension: 'ts'
  },
  seeds: {
    directory: path.join(__dirname, 'seeds'),
    extension: 'ts'
  }
};

module.exports = config;
