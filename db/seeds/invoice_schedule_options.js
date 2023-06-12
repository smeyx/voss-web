/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('invoice_schedule_options').del()
  await knex('invoice_schedule_options').insert([
    {
      id: 1, 
      name: 'weekly',
    },
    {
      id: 2, 
      name: 'monthly',
    },
    {
      id: 3, 
      name: 'yearly',
    }
  ]);
};
