import '../telemetry';
import { AzureFunction, Context } from '@azure/functions';
import pino from 'pino';
import { getDb, closeDb } from '@lighthouse/db';
import { markJobDone } from '@shared/workerUtils';
import { loadSecrets } from '@shared/keyVault';

// Minimal local type to unblock build (mirror what markJobDone expects)
type OutboxMessage = { id?: string; jobType?: string; payload?: unknown } | null;

await loadSecrets(['SQL_SERVER', 'SQL_DB', 'SQL_USER', 'SQL_PASSWORD', 'SQL_ENCRYPT']);

const log = pino({ name: 'project-create' });

const serviceBusTrigger: AzureFunction = async function (
  _context: Context,
  message: OutboxMessage, // was unknown; also remove any broken imports for this type
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
