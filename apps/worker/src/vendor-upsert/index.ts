import '../telemetry';
import { AzureFunction, Context } from '@azure/functions';
import pino from 'pino';
import { getDb, closeDb } from '@lighthouse/db';
import { markJobDone } from '@shared/workerUtils';

// Same minimal local type
type OutboxMessage = { id?: string; jobType?: string; payload?: unknown } | null;

const log = pino({ name: 'vendor-upsert' });

const serviceBusTrigger: AzureFunction = async function (
  _context: Context,
  message: OutboxMessage, // type it here
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
