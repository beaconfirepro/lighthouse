import { Router } from 'express';

import { getDb } from '@lighthouse/db';

const router = Router();

router.get('/', async (_req, res) => {
  const db = getDb();
  const rows = await db('ahj').orderBy('name').limit(500);
  res.json(rows);
});

router.post('/', async (req, res) => {
  const db = getDb();
  const id = await db('ahj')
    .insert({
      name: req.body?.name,
      jurisdiction: req.body?.jurisdiction ?? null,
      code_sets_used: req.body?.code_sets_used ?? null,
      inspection_process_notes: req.body?.inspection_process_notes ?? null,
      portal_url: req.body?.portal_url ?? null,
      contact_list_json: req.body?.contact_list_json ?? null,
      inspection_lead_time_days: req.body?.inspection_lead_time_days ?? null,
      fee_schedule_url: req.body?.fee_schedule_url ?? null,
      email_pattern: req.body?.email_pattern ?? null,
      active: true,
    })
    .returning('ahj_id');
  res.status(201).json({ ahj_id: id?.[0]?.ahj_id || id });
});

router.put('/:id', async (req, res) => {
  const db = getDb();
  await db('ahj')
    .where({ ahj_id: Number(req.params.id) })
    .update({
      name: req.body?.name,
      jurisdiction: req.body?.jurisdiction,
      code_sets_used: req.body?.code_sets_used,
      inspection_process_notes: req.body?.inspection_process_notes,
      portal_url: req.body?.portal_url,
      contact_list_json: req.body?.contact_list_json,
      inspection_lead_time_days: req.body?.inspection_lead_time_days,
      fee_schedule_url: req.body?.fee_schedule_url,
      email_pattern: req.body?.email_pattern,
      active: req.body?.active,
      updated_at: db.fn.now(),
    });
  res.json({ ok: true });
});

export default router;
