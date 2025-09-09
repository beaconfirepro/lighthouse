import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pino from 'pino';
import appInsights from 'applicationinsights';
import { getDb, closeDb } from '@db/knex.js';
import { loadSecrets } from '@shared/src/keyVault.js';

await loadSecrets(['API_PORT', 'SQL_SERVER', 'SQL_DB', 'SQL_USER', 'SQL_PASSWORD', 'SQL_ENCRYPT']);

// Routers
import ahj from './ahj.js';
import projects from './projects.js';
import vendors from './vendors.js';

const app = express();
const log = pino({ name: 'api' });

const aiConn: string | undefined = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
if (aiConn) {
  appInsights.setup(aiConn).setAutoCollectConsole(true, true).start();
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', async (_req: Request, res: Response) => {
  try {
    const db = getDb();
    await db.raw('select 1 as ok');
    res.json({ status: 'ok', service: 'api' });
  } catch (e: unknown) {
    const err = e as Error;
    res.status(500).json({ status: 'error', error: err.message || 'db error' });
  }
});

// Feature routes
app.use('/ahj', ahj);
app.use('/projects', projects);
app.use('/vendors', vendors);

// Server
const API_PORT: number = Number(process.env.API_PORT ?? 4000);
app.listen(API_PORT, () => log.info(`API listening on :${API_PORT}`));

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeDb();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await closeDb();
  process.exit(0);
});

export default app;
