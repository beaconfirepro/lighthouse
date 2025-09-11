import type { Knex } from 'knex';

export async function seed(db: Knex): Promise<void> {
  await db('dim_phase').del();
  await db('dim_phase').insert([
    { phase_id: 1, phase_name: 'Pre-Design' },
    { phase_id: 2, phase_name: 'Design' },
    { phase_id: 3, phase_name: 'Permitting' },
    { phase_id: 4, phase_name: 'Pre-Construction' },
    { phase_id: 5, phase_name: 'Procurement' },
    { phase_id: 6, phase_name: 'Construction' },
    { phase_id: 7, phase_name: 'Close-Out' },
    { phase_id: 8, phase_name: 'Post-Construction' },
  ]);
}
