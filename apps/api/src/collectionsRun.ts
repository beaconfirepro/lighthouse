import { Router } from 'express';
import { getDb } from '@lighthouse/db';

const router = Router();

router.get('/', async (_req, res) => {
  const db = getDb();
  const rows = await db('collections_run').select(
    'invoice_id',
    'client_name',
    'open_balance',
    'due_date',
    'expected_receipt_date',
  );
  res.json(rows);
});

export default router;
