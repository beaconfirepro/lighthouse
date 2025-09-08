import type { Knex } from 'knex';
import type { Logger } from 'pino';

export async function markJobDone(
  db: Knex,
  log: Logger,
  message: unknown,
): Promise<void> {
  const job = message as { job_id?: string | null };
  const jobId = job.job_id || null;
  await db('outbox_job')
    .where({ job_id: jobId })
    .update({ status: 'done', updated_at: db.fn.now() });
  log.info({ jobId }, 'marked done');
}
