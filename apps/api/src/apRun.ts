import { Router } from 'express';
import { getDb } from '@lighthouse/db';

const router = Router();

router.get('/', async (_req, res) => {
  const db = getDb();
  const rows = await db('ap_run').select(
    'bill_id',
    'vendor_name',
    'open_balance',
    'due_date',
    'pay_decision',
  );
  res.json(rows);
});

export default router;
