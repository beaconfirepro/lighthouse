import { Router, Request, Response } from 'express';

// Router for AHJ endpoints
const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', feature: 'ahj' });
});

export default router;
