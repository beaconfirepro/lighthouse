import 'dotenv/config';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pino from 'pino';
import { getDb, closeDb } from '@db/knex.js';

// Routers
import ahj from './ahj.js';
import projects from './projects.js';

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
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'db error';
    res.status(500).json({ status: 'error', error: message });
  }
});

// Feature routes
app.use('/ahj', ahj);
app.use('/projects', projects);

// Server
const API_PORT = Number(process.env.API_PORT ?? 4000);
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
