import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('dim_phase_template').del();
  const rows = [
    { template_code: 'SALES_PRECON', template_name: 'Sales and Precon', display_order: 1, active: true },
    { template_code: 'DESIGN',        template_name: 'Design',           display_order: 2, active: true },
    { template_code: 'MOBILIZATION',  template_name: 'Mobilization',     display_order: 3, active: true },
    { template_code: 'ROUGH_IN',      template_name: 'Rough In',         display_order: 4, active: true },
    { template_code: 'TRIM_OUT',      template_name: 'Trim Out',         display_order: 5, active: true },
    { template_code: 'FINAL_INSP',    template_name: 'Final Inspection', display_order: 6, active: true },
    { template_code: 'CLOSEOUT',      template_name: 'Closeout',         display_order: 7, active: true },
    { template_code: 'WARRANTY',      template_name: 'Warranty',         display_order: 8, active: true }
  ];
  await knex('dim_phase_template').insert(rows);
}
