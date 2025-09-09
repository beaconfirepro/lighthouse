# SQL

## Environment variables

- `SQL_SERVER`
- `SQL_DB`
- `SQL_USER`
- `SQL_PASSWORD`
- `SQL_ENCRYPT` (default `true`)

## Run Migrations and Seeds

1. `export NODE_OPTIONS=--loader=ts-node/esm` – use ts-node’s ESM loader so the TypeScript `knexfile.ts` runs correctly.
2. `npm run db:migrate`
3. `npm run db:seed`
