# Lighthouse Audit

## Repo Snapshot

### Tree summary
- **apps/**
  - **api/**: src/index.ts, src/vendors.ts, src/projects.ts, src/ahj.ts
  - **web/**: app/page.tsx, app/vendors/page.tsx, app/vendors/[id]/page.tsx, app/projects/page.tsx, app/projects/[id]/page.tsx, app/collections/page.tsx, app/ap-run/page.tsx, app/ahj/page.tsx, app/layout.tsx, app/telemetry.ts
  - **worker/**: src/vendor-upsert/index.ts, src/project-create/index.ts, src/telemetry.ts
- **packages/**
  - **db/**: src/knex.ts, src/index.ts, knexfile.ts, migrations/, seeds/
  - **shared/**: src/index.ts, src/types.ts, src/keyVault.ts, src/workerUtils.ts
- **infra/**: deployment.md, service-bus.md, key-vault.md, monitoring.md, bicep/key-vault.bicep, sql/README.md, adf/

### tsconfig files
- **tsconfig.json** – module *ESNext*, moduleResolution *Bundler*, baseUrl `.`, paths `@shared/*`→packages/shared/*, `@db`→packages/db/src.
- **apps/api/tsconfig.json** – outDir *dist*, noEmit *false*.
- **apps/worker/tsconfig.json** – outDir *dist*.
- **packages/db/tsconfig.json** – outDir *dist*, rootDir `.`, includes *knexfile.ts*, migrations, seeds.
- **packages/shared/tsconfig.json** – composite *true*, outDir *dist*.

### package.json scripts
- **root** – build, dev, lint, test, format, verify:bootstrap, verify:env, db:migrate, db:rollback, db:seed.
- **apps/api** – dev, build, start, lint.
- **apps/web** – dev, build, lint.
- **apps/worker** – dev, build, lint.
- **packages/db** – dev, build, lint, test, db:migrate, db:rollback, db:seed.
- **packages/shared** – dev, build, lint, test.

### Node engines
- Root package.json – `node >=20 <21 || >=22 <23`.

## Health Checks & Findings

### Resolution & Aliases
- Root paths use `@db`; spec expects `@lighthouse/db`.
- API/worker imports include `@db/knex.js` and `@shared/src/*` with `.js` suffixes.

### DB Layer
- `src/knex.ts` reads env vars directly; does not import `knexfile`.
- tsconfig includes `knexfile.ts`, migrations, seeds.
- migrations/ and seeds/ contain only `.gitkeep`.

### API
- `/health` plus routers `/ahj`, `/projects`, `/vendors` mounted; helmet, cors, pino configured.
- `/ap/run` and `/collections/run` routers absent.
- Imports use `.js` extensions and `@db` alias.

### Worker
- `vendor-upsert` and `project-create` handlers exist.
- No `function.json` trigger files.
- Imports use `.js` extensions and `@db` alias.
- `markJobDone` updates `outbox_job`.

### Web
- Pages for `/`, `/vendors`, `/vendors/[id]`, `/projects`, `/projects/[id]`, `/ap-run`, `/collections`, `/ahj`.

### Environment
- Env vars referenced: `API_PORT`, `KEY_VAULT_URL`, `SQL_SERVER`, `SQL_DB`, `SQL_USER`, `SQL_PASSWORD`, `SQL_ENCRYPT`, `APPLICATIONINSIGHTS_CONNECTION_STRING`, `NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING`.
- `.env.example` missing; `.env` with secrets committed.

### Consistency
- ESM style but local imports often include `.js` and direct `src` paths.

### Node Version
- Engines allow Node 22 even though target is Node 20.x.

## Gaps vs Intent

| Path | Expected | Observed | Proposed Fix |
| --- | --- | --- | --- |
| tsconfig.json | `@lighthouse/db`, `@shared/*` aliases | `@db`, root-level shared path | Update paths to match spec |
| API imports | Alias usage without `.js` | `@db/knex.js`, `@shared/src/...` | Replace with `@lighthouse/db` and `@shared/...` |
| Worker imports & triggers | Service bus `function.json` and aliases | No `function.json`, `.js` imports | Add trigger files, fix imports |
| API routes | `/ap/run`, `/collections/run` routers | Missing | Implement routers |
| DB migrations/seeds | Tables and seed data | Empty directories | Add migrations and seeds |
| knex.ts config | Import shared `knexfile` | Inline env config | Import from `../knexfile` or document |
| Environment docs | `.env.example` | Secrets in `.env` | Add example file, ignore secrets |
| Node engines | Restrict to Node 20.x | Allows Node 22 | Narrow engine range |

## Recommended Next Steps

### P0
- Fix path aliases and imports (S).
- Add worker `function.json` trigger files (S).
- Commit `.env.example` and remove secrets from repo (S).

### P1
- Implement missing API routes and web pages (M).
- Create database migrations and seed data (M).
- Add service bus consumer logic for QuickBooks outbox (M).

### P2
- Restrict Node engines to 20.x and streamline tsconfig (S).
- Remove `.js` extensions and direct `src` imports across codebase (S).
- Set up CI pipelines and tests (L).

