await knex('dim_phase').del();
await knex('dim_phase').insert([
  { phase_name: 'Lead' },
  { phase_name: 'Quote' },
  { phase_name: 'Contract' },
  { phase_name: 'Design' },
  { phase_name: 'Permitting' },
  { phase_name: 'Rough In' },
  { phase_name: 'Trim Out' },
  { phase_name: 'Final' },
]);
