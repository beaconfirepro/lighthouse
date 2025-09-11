import type { Knex } from 'knex';

export async function up(db: Knex): Promise<void> {
  await db.schema.createTable('dim_vendor', (t) => {
    t.increments('vendor_id').primary();
    t.string('vendor_name').notNullable();
    t.string('vendor_type');
    t.boolean('active').defaultTo(true);
    t.timestamps(false, true);
  });

  await db.schema.createTable('dim_phase', (t) => {
    t.increments('phase_id').primary();
    t.string('phase_name').notNullable();
  });

  await db.schema.createTable('dim_project', (t) => {
    t.increments('project_id').primary();
    t.string('project_name').notNullable();
    t.integer('phase_id').references('phase_id').inTable('dim_phase');
    t.timestamps(false, true);
  });

  await db.schema.createTable('ap_run', (t) => {
    t.increments('bill_id').primary();
    t.string('vendor_name').notNullable();
    t.decimal('open_balance', 15, 2).notNullable();
    t.date('due_date');
    t.string('pay_decision').defaultTo('hold');
  });

  await db.schema.createTable('collections_run', (t) => {
    t.increments('invoice_id').primary();
    t.string('client_name').notNullable();
    t.decimal('open_balance', 15, 2).notNullable();
    t.date('due_date');
    t.date('expected_receipt_date');
  });

  await db.schema.createTable('ahj', (t) => {
    t.increments('ahj_id').primary();
    t.string('name').notNullable();
    t.string('city');
    t.string('state');
    t.timestamps(false, true);
  });

  await db.schema.createTable('outbox_job', (t) => {
    t.uuid('job_id').primary();
    t.string('type').notNullable();
    t.string('payload');
    t.string('status').defaultTo('pending');
    t.timestamps(false, true);
  });
}

export async function down(db: Knex): Promise<void> {
  await db.schema.dropTableIfExists('collections_run');
  await db.schema.dropTableIfExists('ap_run');
  await db.schema.dropTableIfExists('outbox_job');
  await db.schema.dropTableIfExists('ahj');
  await db.schema.dropTableIfExists('dim_project');
  await db.schema.dropTableIfExists('dim_phase');
  await db.schema.dropTableIfExists('dim_vendor');
}
