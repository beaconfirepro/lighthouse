import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('dim_phase').del();
  await knex.raw('SET IDENTITY_INSERT dbo.dim_phase ON');
  await knex('dim_phase').insert([
    { phase_id: 1, phase_name: 'Discovery' },
    { phase_id: 2, phase_name: 'Design' },
    { phase_id: 3, phase_name: 'Engineering' },
    { phase_id: 4, phase_name: 'Permitting' },
    { phase_id: 5, phase_name: 'Construction' },
    { phase_id: 6, phase_name: 'Inspection' },
    { phase_id: 7, phase_name: 'Commissioning' },
    { phase_id: 8, phase_name: 'Complete' },
  ]);
  await knex.raw('SET IDENTITY_INSERT dbo.dim_phase OFF');
}
