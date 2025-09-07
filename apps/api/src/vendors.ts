import { Router } from 'express';
import { z } from 'zod';
import { getDb } from '@shared/../db/src/knex.js';
import { vendorFormSchema } from '@lighthouse/shared/dist/schemas';

const r = Router();

r.get('/', async (req, res) => {
  const db = getDb();
  const { q, type, active } = req.query as any;
  let sql = db('dim_vendor').select('*');
  if (q) sql = sql.whereILike('vendor_name', `%${q}%`);
  if (type) sql = sql.where('vendor_type', String(type));
  if (active !== undefined) sql = sql.where('active', String(active) === 'true');
  const rows = await sql.limit(200);
  res.json(rows);
});

r.get('/:id', async (req, res) => {
  const db = getDb();
  const row = await db('dim_vendor').where('vendor_id', Number(req.params.id)).first();
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(row);
});

r.post('/', async (req, res) => {
  const db = getDb();
  const parsed = vendorFormSchema.parse(req.body);
  const [id] = await db('dim_vendor').insert({
    vendor_name: parsed.vendorName,
    vendor_type: parsed.vendorType,
    active: parsed.active ?? true,
    legal_name: parsed.legalName ?? null,
    dba: parsed.dba ?? null,
    payment_type_default: parsed.paymentTypeDefault ?? null,
    contract_type_default: parsed.contractTypeDefault ?? null,
    terms: parsed.terms ?? null,
    autopay: parsed.autopay ?? false,
    requires_1099: parsed.requires1099 ?? false,
    w9_on_file: parsed.w9OnFile ?? false,
    waiver_required: parsed.waiverRequired ?? false,
    waiver_type: parsed.waiverType ?? null,
    client_paid_dependency: parsed.clientPaidDependency ?? false,
    portal_url: parsed.portalUrl ?? null,
    portal_vendor_name: parsed.portalVendorName ?? null,
    ach_verified: parsed.achVerified ?? false,
    qbo_vendor_id: parsed.qboVendorId ?? null,
    knowify_vendor_id: parsed.knowifyVendorId ?? null,
    hubspot_company_id: parsed.hubspotCompanyId ?? null,
    notes: parsed.notes ?? null,
  }).returning('vendor_id');
  res.status(201).json({ vendor_id: id?.vendor_id || id });
});

r.put('/:id', async (req, res) => {
  const db = getDb();
  const parsed = vendorFormSchema.partial().parse(req.body);
  await db('dim_vendor').where('vendor_id', Number(req.params.id)).update({
    vendor_name: parsed.vendorName,
    vendor_type: parsed.vendorType,
    active: parsed.active,
    legal_name: parsed.legalName,
    dba: parsed.dba,
    payment_type_default: parsed.paymentTypeDefault,
    contract_type_default: parsed.contractTypeDefault,
    terms: parsed.terms,
    autopay: parsed.autopay,
    requires_1099: parsed.requires1099,
    w9_on_file: parsed.w9OnFile,
    waiver_required: parsed.waiverRequired,
    waiver_type: parsed.waiverType,
    client_paid_dependency: parsed.clientPaidDependency,
    portal_url: parsed.portalUrl,
    portal_vendor_name: parsed.portalVendorName,
    ach_verified: parsed.achVerified,
    qbo_vendor_id: parsed.qboVendorId,
    knowify_vendor_id: parsed.knowifyVendorId,
    hubspot_company_id: parsed.hubspotCompanyId,
    notes: parsed.notes,
    updated_at: db.fn.now()
  });
  res.json({ ok: true });
});

r.post('/:id/push/qbo', async (req, res) => {
  const db = getDb();
  const id = Number(req.params.id);
  const payload = { vendor_id: id, action: 'upsert' };
  await db('outbox_job').insert({
    entity_type: 'vendor',
    entity_id: id,
    target: 'QBO',
    payload_json: JSON.stringify(payload),
    status: 'queued',
    attempts: 0
  });
  res.json({ queued: true });
});

export default r;
