import { AzureFunction, Context } from '@azure/functions';
import pino from 'pino';
import { getDb, closeDb } from '@shared/../db/src/knex.js';

const log = pino({ name: 'project-create' });

const serviceBusTrigger: AzureFunction = async function (
  context: Context,
  message: any,
): Promise<void> {
  log.info({ message }, 'received');
  const db = getDb();
  try {
    const jobId = message?.job_id || null;
    await db('outbox_job')
      .where({ job_id: jobId })
      .update({ status: 'done', updated_at: db.fn.now() });
    log.info({ jobId }, 'marked done');
  } catch (e) {
    log.error(e);
  } finally {
    await closeDb();
  }
};

export default serviceBusTrigger;
