import { Router } from 'express';
import { getDb, closeDb } from '../../packages/db/src/knex.ts';

const r = Router();

r.post('/from-hubspot', async (req, res) => {
  const db = getDb();
  const { projectName, clientId, hubspotDealId, startDate, endDate } = req.body || {};
  const [proj] = await db('dim_project')
    .insert({
      project_name: projectName,
      client_id: clientId ?? null,
      hubspot_deal_id: hubspotDealId ?? null,
      start_date: startDate ?? null,
      end_date: endDate ?? null,
    })
    .returning(['project_id']);
  const pid = proj?.project_id || proj;
  const templates = await db('dim_phase_template').orderBy('display_order');
  for (const t of templates) {
    await db('dim_phase').insert({
      project_id: pid,
      template_phase_id: t.template_phase_id,
      phase_name: t.template_name,
      display_order: t.display_order,
    });
  }
  await db('outbox_job').insert({
    entity_type: 'project',
    entity_id: pid,
    target: 'CONNECTEAM',
    payload_json: JSON.stringify({ project_id: pid }),
    status: 'queued',
    attempts: 0,
  });
  res.status(201).json({ project_id: pid });
});

r.post('/:id/knowify/map', async (req, res) => {
  const db = getDb();
  const id = Number(req.params.id);
  const { knowifyJobId, phaseMappings } = req.body || {};
  await db('dim_project')
    .where({ project_id: id })
    .update({ knowify_job_id: knowifyJobId ?? null });
  if (Array.isArray(phaseMappings)) {
    for (const m of phaseMappings) {
      await db('dim_phase')
        .where({ project_id: id, template_phase_id: m.templatePhaseId })
        .update({ knowify_phase_id: m.knowifyPhaseId });
    }
  }
  res.json({ ok: true });
});

r.get('/:id/overview', async (req, res) => {
  const db = getDb();
  const id = Number(req.params.id);
  const phases = await db('dim_phase').where({ project_id: id }).orderBy('display_order');
  res.json({ project_id: id, phases });
});

export default r;
