# Lighthouse

Monorepo for the Lighthouse platform.

## Environment setup
1. Copy `.env.example` to `.env` and fill in values as available.
2. Do not commit `.env`. Secrets live in local `.env` for dev and in Key Vault for cloud.
3. Minimal must-haves to run later tasks:
   - SQL_SERVER, SQL_DB, SQL_USER, SQL_PASSWORD
   - SB_CONNECTION_STRING
   - QBO*, HUBSPOT*, CONNECTEAM* can remain blank for now

## Structure
- apps/web  Next.js admin app
- apps/api  Express REST API
- apps/worker  Azure Functions worker
- packages/shared  Shared types and schemas
- packages/db  Knex, migrations, seeds
- infra  SQL, Bicep, ADF stubs
- .github/workflows  CI

## Scripts
- npm run dev  run all apps in dev
- npm run build  build all
- npm run lint  lint all
- npm run test  test all

