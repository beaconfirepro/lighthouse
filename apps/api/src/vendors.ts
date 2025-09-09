import { Router, Request, Response } from 'express';
import { getDb } from '@db/knex.js';
import type { Vendor } from '@shared/src/types.js';

const vendors = Router();

vendors.get('/', async (_req: Request, res: Response) => {
  const db = getDb();
  const rows = await db<Vendor>('dim_vendor')
    .select('vendor_id', 'vendor_name', 'vendor_type', 'active')
    .orderBy('vendor_name', 'asc')
    .limit(500);
  res.json(rows);
});

vendors.get('/:id', async (req: Request, res: Response) => {
  const db = getDb();
  const row = await db<Vendor>('dim_vendor')
    .select('vendor_id', 'vendor_name', 'vendor_type', 'active')
    .where({ vendor_id: Number(req.params.id) })
    .first();
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(row);
});

vendors.put('/:id', async (req: Request, res: Response) => {
  const db = getDb();
  await db('dim_vendor')
    .where({ vendor_id: Number(req.params.id) })
    .update({
      vendor_name: req.body?.vendorName,
      vendor_type: req.body?.vendorType,
      active: req.body?.active,
      updated_at: db.fn.now(),
    });
  res.json({ ok: true });
});

vendors.post('/:id/push/qbo', async (_req: Request, res: Response) => {
  // placeholder for QuickBooks integration
  res.json({ queued: true });
});

export default vendors;
