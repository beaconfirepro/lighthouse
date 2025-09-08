import { Router, Request, Response } from 'express';
import { getDb } from '@db/knex.js';

const projects = Router();

projects.get('/list/all', async (_req: Request, res: Response) => {
  const db = getDb();
  const rows = await db('dim_project')
    .select('project_id', 'project_name', 'status')
    .orderBy('project_id', 'desc')
    .limit(200);
  res.json(rows);
});

interface PhaseRow {
  phase_id: number;
  phase_name: string;
  status: string | null;
}

projects.get('/:id/overview', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const db = getDb();
  const phases = await db('fact_project_phase as f')
    .join('dim_phase as p', 'p.phase_id', 'f.phase_id')
    .select<
      PhaseRow[]
    >(['p.phase_id as phase_id', 'p.phase_name as phase_name', 'f.status as status'])
    .where('f.project_id', id)
    .orderBy('p.phase_id', 'asc');
  res.json({ phases });
});

export default projects;
