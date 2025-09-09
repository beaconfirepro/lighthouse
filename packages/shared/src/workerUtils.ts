import type { Knex } from 'knex';
import type { Logger } from 'pino';

export async function markJobDone(
  db: Knex,
  log: Logger,
  message: unknown,
): Promise<void> {
  const jobId = (message as { job_id?: string } | null)?.job_id ?? null;

  await db('outbox_job')
    .where({ job_id: jobId })
    .update({ status: 'done', updated_at: db.fn.now() });
  log.info({ jobId }, 'marked done');
}
