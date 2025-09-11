import type { Knex } from 'knex';

export async function up(db: Knex): Promise<void> {
  const exists = await db.schema.hasTable('dim_phase');
  if (!exists) {
    await db.schema.createTable('dim_phase', (t) => {
      t.increments('phase_id').primary();
      t.string('phase_name').notNullable();
    });
  }
}

export async function down(db: Knex): Promise<void> {
  await db.schema.dropTableIfExists('dim_phase');
}
