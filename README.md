# Lighthouse

Monorepo for the Lighthouse platform.

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
