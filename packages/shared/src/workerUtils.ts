import type { Knex } from 'knex';
import type { Logger } from 'pino';

export async function markJobDone<T extends { job_id?: string | number }>(
  db: Knex,
  log: Logger,
  message: T,
): Promise<void> {
  const jobId = message.job_id ?? null;
  if (jobId == null) {
    log.warn({ message }, 'no job_id on message - skipping');
    return;
  }

  await db('outbox_job')
    .where({ job_id: jobId })
    .update({ status: 'done', updated_at: db.fn.now() });

  log.info({ jobId }, 'marked done');
}
