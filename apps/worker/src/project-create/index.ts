import '../telemetry';
import { AzureFunction, Context } from '@azure/functions';
import pino from 'pino';
import { getDb, closeDb } from '@lighthouse/db';
import { markJobDone } from '@shared/workerUtils';
import type { OutboxMessage } from '@shared/types'; // adjust path to wherever it lives

await loadSecrets(['SQL_SERVER', 'SQL_DB', 'SQL_USER', 'SQL_PASSWORD', 'SQL_ENCRYPT']);

const log = pino({ name: 'project-create' });

const serviceBusTrigger: AzureFunction = async function (
  context: Context,
  message: OutboxMessage | null, // ← was unknown
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
