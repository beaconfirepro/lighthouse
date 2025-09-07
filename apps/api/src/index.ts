import 'dotenv/config';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pino from 'pino';
import { getDb, closeDb } from '@shared/../db/src/knex.js';

const app = express();
const log = pino({ name: 'api' });
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', async (_req: Request, res: Response) => {
  try {
    const db = getDb();
    await db.raw('select 1 as ok');
    res.json({ status: 'ok', service: 'api' });
  } catch (e: any) {
    res.status(500).json({ status: 'error', error: e?.message || 'db error' });
  }
});

const PORT = Number(process.env.API_PORT || 4000);
app.listen(PORT, () => log.info(`API listening on :${PORT}`));

process.on('SIGINT', async () => {
  await closeDb();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await closeDb();
  process.exit(0);
});
