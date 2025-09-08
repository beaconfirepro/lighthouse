import { Router } from 'express';
import { getDb } from '@db/knex.js';

const r = Router();

r.get('/list/all', async (_req, res) => {
  const db = getDb();
  const rows = await db('dim_project')
    .select('project_id', 'project_name', 'status')
    .orderBy('project_id', 'desc')
    .limit(200);
  res.json(rows);
});

export default r;
