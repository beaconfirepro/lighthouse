import type { Knex } from 'knex';

export async function seed(db: Knex): Promise<void> {
  await db('dim_vendor').del();
  await db('dim_vendor').insert([
    {
      vendor_id: 1,
      vendor_name: 'Acme Construction',
      vendor_type: 'General Contractor',
      active: true,
    },
    {
      vendor_id: 2,
      vendor_name: 'Beacon Fire',
      vendor_type: 'Consultant',
      active: true,
    },
  ]);
}
