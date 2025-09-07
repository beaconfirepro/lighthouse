import type { Knex } from 'knex';

const money = (t: Knex.CreateTableBuilder, col: string) => t.decimal(col, 18, 2);

export async function up(knex: Knex): Promise<void> {
  // Dimensions
  await knex.schema.createTable('dim_vendor', (t) => {
    t.increments('vendor_id').primary();
    t.string('vendor_name', 255).notNullable().unique();
    t.string('legal_name', 255);
    t.string('dba', 255);
    t.string('vendor_type', 40).notNullable();
    t.string('payment_type_default', 40);
    t.string('contract_type_default', 40);
    t.string('terms', 20);
    t.boolean('autopay').defaultTo(false);
    t.boolean('requires_1099').defaultTo(false);
    t.boolean('w9_on_file').defaultTo(false);
    t.boolean('waiver_required').defaultTo(false);
    t.string('waiver_type', 40);
    t.boolean('client_paid_dependency').defaultTo(false);
    t.string('portal_url', 500);
    t.string('portal_vendor_name', 255);
    t.boolean('ach_verified').defaultTo(false);
    t.string('qbo_vendor_id', 64);
    t.string('knowify_vendor_id', 64);
    t.string('hubspot_company_id', 64);
    t.boolean('active').defaultTo(true);
    t.text('notes');
    t.specificType('created_at', 'datetime2').defaultTo(knex.fn.now());
    t.specificType('updated_at', 'datetime2').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('dim_client', (t) => {
    t.increments('client_id').primary();
    t.string('hubspot_company_id', 64);
    t.string('qbo_customer_id', 64);
    t.string('legal_name', 255);
    t.string('default_terms', 20);
    t.boolean('active').defaultTo(true);
    t.specificType('created_at', 'datetime2').defaultTo(knex.fn.now());
    t.specificType('updated_at', 'datetime2').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('dim_project', (t) => {
    t.increments('project_id').primary();
    t.string('project_name', 255).notNullable();
    t.integer('client_id').references('dim_client.client_id');
    t.string('hubspot_deal_id', 64);
    t.string('knowify_job_id', 64);
    t.string('connecteam_project_id', 64);
    t.string('status', 30);
    t.date('start_date');
    t.date('end_date');
    t.specificType('created_at', 'datetime2').defaultTo(knex.fn.now());
    t.specificType('updated_at', 'datetime2').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('dim_phase_template', (t) => {
    t.increments('template_phase_id').primary();
    t.string('template_code', 40);
    t.string('template_name', 120).notNullable();
    t.integer('display_order').notNullable();
    t.boolean('active').defaultTo(true);
  });

  await knex.schema.createTable('dim_phase', (t) => {
    t.increments('phase_id').primary();
    t.integer('project_id').notNullable().references('dim_project.project_id');
    t.integer('template_phase_id').references('dim_phase_template.template_phase_id');
    t.string('knowify_phase_id', 64);
    t.string('phase_name', 120).notNullable();
    t.string('status', 30);
    t.integer('display_order');
    t.specificType('created_at', 'datetime2').defaultTo(knex.fn.now());
    t.specificType('updated_at', 'datetime2').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('dim_ahj', (t) => {
    t.increments('ahj_id').primary();
    t.string('name', 255).notNullable();
    t.string('jurisdiction', 255);
    t.string('code_sets_used', 255);
    t.text('inspection_process_notes');
    t.string('portal_url', 500);
    t.text('contact_list_json');
    t.integer('inspection_lead_time_days');
    t.string('fee_schedule_url', 500);
    t.string('email_pattern', 255);
    t.boolean('active').defaultTo(true);
    t.specificType('created_at', 'datetime2').defaultTo(knex.fn.now());
    t.specificType('updated_at', 'datetime2').defaultTo(knex.fn.now());
  });

  // Facts
  await knex.schema.createTable('fact_bills', (t) => {
    t.increments('bill_id').primary();
    t.string('source_system', 20).notNullable();
    t.string('external_id', 80).notNullable().unique();
    t.integer('vendor_id').notNullable().references('dim_vendor.vendor_id');
    t.date('bill_date');
    t.date('due_date');
    t.decimal('total_amount', 18, 2);
    t.decimal('open_balance', 18, 2);
    t.string('payment_status', 20);
    t.integer('job_id');
    t.integer('phase_id');
    t.string('category', 120);
    t.specificType('created_at', 'datetime2').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('fact_bill_payments', (t) => {
    t.increments('bill_payment_id').primary();
    t.integer('bill_id').notNullable().references('fact_bills.bill_id');
    t.date('paid_date');
    t.decimal('amount', 18, 2);
    t.string('method', 30);
    t.string('ref', 120);
  });

  await knex.schema.createTable('fact_invoices', (t) => {
    t.increments('invoice_id').primary();
    t.string('source_system', 20).notNullable();
    t.string('external_id', 80).notNullable().unique();
    t.integer('client_id').notNullable().references('dim_client.client_id');
    t.integer('job_id').notNullable().references('dim_project.project_id');
    t.integer('phase_id');
    t.date('invoice_date');
    t.date('due_date');
    t.decimal('total_amount', 18, 2);
    t.decimal('open_balance', 18, 2);
    t.string('status', 20);
  });

  await knex.schema.createTable('fact_invoice_payments', (t) => {
    t.increments('invoice_payment_id').primary();
    t.integer('invoice_id').notNullable().references('fact_invoices.invoice_id');
    t.date('received_date');
    t.decimal('amount', 18, 2);
    t.string('method', 30);
    t.string('ref', 120);
  });

  await knex.schema.createTable('fact_po_commitment', (t) => {
    t.increments('po_id').primary();
    t.string('source_system', 20).notNullable();
    t.string('external_id', 80).notNullable().unique();
    t.integer('vendor_id').notNullable().references('dim_vendor.vendor_id');
    t.integer('job_id').notNullable().references('dim_project.project_id');
    t.integer('phase_id');
    t.decimal('po_total', 18, 2);
    t.decimal('remaining_commitment', 18, 2);
    t.date('expected_draw_date');
  });

  await knex.schema.createTable('fact_bank_txn', (t) => {
    t.increments('bank_txn_id').primary();
    t.string('bank_id', 64);
    t.date('posted_date');
    t.string('description', 255);
    t.decimal('amount', 18, 2);
    t.decimal('running_balance', 18, 2);
    t.string('match_ref', 120);
  });

  await knex.schema.createTable('fact_gl_balance', (t) => {
    t.increments('gl_id').primary();
    t.string('account_ref', 120);
    t.date('as_of_date');
    t.decimal('ending_balance', 18, 2);
  });

  await knex.schema.createTable('fact_payroll_run', (t) => {
    t.increments('payroll_id').primary();
    t.date('period_start');
    t.date('period_end');
    t.date('check_date');
    t.decimal('net_pay_total', 18, 2);
    t.decimal('employer_taxes', 18, 2);
    t.decimal('benefits_total', 18, 2);
  });

  await knex.schema.createTable('fact_cash_adj', (t) => {
    t.increments('adj_id').primary();
    t.string('direction', 5);
    t.decimal('amount', 18, 2);
    t.string('description', 255);
    t.date('effective_date');
    t.decimal('probability', 5, 2);
    t.string('category', 60);
  });

  // Workflow
  await knex.schema.createTable('wf_entity_flag', (t) => {
    t.string('entity_type', 20).notNullable();
    t.integer('entity_id').notNullable();
    t.string('flag_type', 40).notNullable();
    t.string('flag_status', 20).notNullable();
    t.specificType('created_at', 'datetime2').defaultTo(knex.fn.now());
    t.specificType('updated_at', 'datetime2').defaultTo(knex.fn.now());
    t.primary(['entity_type', 'entity_id', 'flag_type']);
  });

  await knex.schema.createTable('wf_task', (t) => {
    t.increments('task_id').primary();
    t.string('entity_type', 20).notNullable();
    t.integer('entity_id').notNullable();
    t.string('task_type', 40).notNullable();
    t.string('assigned_to', 255);
    t.string('status', 20);
    t.date('due_date');
    t.text('payload_json');
    t.specificType('created_at', 'datetime2').defaultTo(knex.fn.now());
    t.specificType('updated_at', 'datetime2').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('outbox_job', (t) => {
    t.increments('job_id').primary();
    t.string('entity_type', 32).notNullable();
    t.integer('entity_id').notNullable();
    t.string('target', 20).notNullable();
    t.text('payload_json').notNullable();
    t.string('status', 20).notNullable().defaultTo('queued');
    t.integer('attempts').notNullable().defaultTo(0);
    t.text('last_error');
    t.specificType('created_at', 'datetime2').defaultTo(knex.fn.now());
    t.specificType('updated_at', 'datetime2').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('outbox_job');
  await knex.schema.dropTableIfExists('wf_task');
  await knex.schema.dropTableIfExists('wf_entity_flag');
  await knex.schema.dropTableIfExists('fact_cash_adj');
  await knex.schema.dropTableIfExists('fact_payroll_run');
  await knex.schema.dropTableIfExists('fact_gl_balance');
  await knex.schema.dropTableIfExists('fact_bank_txn');
  await knex.schema.dropTableIfExists('fact_po_commitment');
  await knex.schema.dropTableIfExists('fact_invoice_payments');
  await knex.schema.dropTableIfExists('fact_invoices');
  await knex.schema.dropTableIfExists('fact_bill_payments');
  await knex.schema.dropTableIfExists('fact_bills');
  await knex.schema.dropTableIfExists('dim_ahj');
  await knex.schema.dropTableIfExists('dim_phase');
  await knex.schema.dropTableIfExists('dim_phase_template');
  await knex.schema.dropTableIfExists('dim_project');
  await knex.schema.dropTableIfExists('dim_client');
  await knex.schema.dropTableIfExists('dim_vendor');
}

