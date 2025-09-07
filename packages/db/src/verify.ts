import { getDb, closeDb } from './knex';

async function run() {
  const db = getDb();
  const hasVendor = await db.schema.hasTable('dim_vendor');
  const hasBills  = await db.schema.hasTable('fact_bills');
  const [{ cnt }] = await db('dim_phase_template').count({ cnt: '*' });
  console.log(JSON.stringify({ hasVendor, hasBills, phaseTemplateRows: Number(cnt) }));
  await closeDb();
}
run().catch(async (e) => { console.error(e); await closeDb(); process.exit(1); });
