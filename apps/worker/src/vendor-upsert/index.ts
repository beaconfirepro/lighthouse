import { AzureFunction, Context } from '@azure/functions';
import pino from 'pino';
import { getDb, closeDb } from '@db/knex.js';
import { markJobDone } from '@shared/src/workerUtils.js';

const log = pino({ name: 'vendor-upsert' });

const serviceBusTrigger: AzureFunction = async function (
  context: Context,
  message: any,
): Promise<void> {
  log.info({ message }, 'received');
  const db = getDb();
  try {
    await markJobDone(db, log, message);
  } catch (e) {
    log.error(e);
  } finally {
    await closeDb();
  }
};

export default serviceBusTrigger;
