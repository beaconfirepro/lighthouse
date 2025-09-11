import '../telemetry';
import { AzureFunction, Context } from '@azure/functions';
import pino from 'pino';
import { getDb, closeDb } from '@lighthouse/db';
import { loadSecrets } from '@shared/keyVault';
import { markJobDone, type OutboxMessage } from '@shared/workerUtils';

await loadSecrets(['SQL_SERVER', 'SQL_DB', 'SQL_USER', 'SQL_PASSWORD', 'SQL_ENCRYPT']);

const log = pino({ name: 'project-create' });

const serviceBusTrigger = async function (
  context: Context,
  message: OutboxMessage | null,
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
