import { Router } from 'express';
import { getDb } from '@shared/../db/src/knex.js';

const r = Router();

r.get('/ap/run', async (_req, res) => {
  const db = getDb();
  const today = db.fn.now();
  const rows = await db('fact_bills as b')
    .join('dim_vendor as v', 'v.vendor_id', 'b.vendor_id')
    .select(
      'b.bill_id',
      'v.vendor_id',
      'v.vendor_name',
      'v.vendor_type',
      'b.due_date',
      'b.open_balance',
      'b.job_id',
    )
    .limit(500);

  const out = rows.map((x: any) => {
    let decision: 'Due Now' | 'Eligible' | 'Hold Client Not Paid' | 'Defer Cash Constraint' =
      'Eligible';
    if (x.vendor_type === 'Project Supplier' || x.vendor_type === 'Project Subcontractor') {
      // simplistic hold: if job_id present, pretend client not paid
      if (x.job_id) decision = 'Hold Client Not Paid';
    }
    // naive due check
    if (x.due_date && new Date(x.due_date) <= new Date()) decision = 'Due Now';
    return { ...x, pay_decision: decision };
  });
  res.json(out);
});

r.get('/collections/run', async (_req, res) => {
  const db = getDb();
  const rows = await db('fact_invoices as i')
    .join('dim_client as c', 'c.client_id', 'i.client_id')
    .select(
      'i.invoice_id',
      'c.legal_name as client_name',
      'i.invoice_date',
      'i.due_date',
      'i.open_balance',
    )
    .where('i.open_balance', '>', 0)
    .limit(500);

  // naive expected date using due_date
  const out = rows.map((x: any) => ({ ...x, expected_receipt_date: x.due_date }));
  res.json(out);
});

export default r;
