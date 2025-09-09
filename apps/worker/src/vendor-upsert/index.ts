import '../telemetry.js';
import { AzureFunction, Context } from '@azure/functions';
import pino from 'pino';
import { getDb, closeDb } from '@db/knex.js';
import { markJobDone } from '@shared/src/workerUtils.js';
import { loadSecrets } from '@shared/src/keyVault.js';

await loadSecrets(['SQL_SERVER', 'SQL_DB', 'SQL_USER', 'SQL_PASSWORD', 'SQL_ENCRYPT']);

const log = pino({ name: 'vendor-upsert' });

const serviceBusTrigger: AzureFunction = async function (
  context: Context,
  message: unknown,
): Promise<void> {
  log.info({ message }, 'received');
  const db = getDb();
  try {
    await markJobDone(db, log, message);
  } catch (e: unknown) {
    log.error(e);
  } finally {
    await closeDb();
  }
};

export default serviceBusTrigger;
