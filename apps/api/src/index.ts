import 'dotenv/config';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pino from 'pino';
import { getDb, closeDb } from '@shared/../db/src/knex.js';

// Routers
import ahj from './ahj.js';

const app = express();
const log = pino({ name: 'api' });

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
  } catch (e: any) {
    res.status(500).json({ status: 'error', error: e?.message || 'db error' });
  }
});

// Feature routes
app.use('/ahj', ahj);

// Server
const PORT = Number(process.env.API_PORT || 4000);
app.listen(PORT, () => log.info(`API listening on :${PORT}`));

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
import express from 'express';
import ops from './ops.js';

const app = express();

app.use('/', ops);

export default app;
