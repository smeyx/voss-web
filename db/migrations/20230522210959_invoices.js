/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const now = new Date();

  return knex
  .schema
  .createTable('invoices', table => {
    table.increments('id').unsigned();
    table.integer('user_id').unsigned().notNullable();
    table.integer('customer_id').unsigned().notNullable();
    table.integer('number_range_id').unsigned().notNullable();
    table.string('name').notNullable();
    table.string('title').notNullable();
    table.string('subtext').nullable();
    table.date('date').notNullable();
    table.integer('schedule_option_id').unsigned().notNullable();
    table.boolean('no_vat_clause').defaultTo(false);
    table.timestamp('time_created', { useTz: true }).defaultTo(now).notNullable();
    table.timestamp('time_updated', { useTz: true }).defaultTo(now).notNullable();
    table.foreign('user_id').references('users.id');
    table.foreign('customer_id').references('customers.id');
    table.foreign('number_range_id').references('number_ranges.id');
    table.foreign('schedule_option_id').references('invoice_schedule_options.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex
  .schema
  .dropTableIfExists('invoices');
};
