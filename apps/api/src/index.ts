import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import pino from 'pino';
import { getDb } from '@lighthouse/db';

dotenv.config();

const logger = pino();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// initialize database connection
getDb();

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'api' });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  logger.info(`API service listening on port ${port}`);
});
