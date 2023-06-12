/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex
    .schema
    .createTable('positions', table => {
      table.increments('id').unsigned();
      table.integer('invoice_id').unsigned().notNullable();
      table.string('name').notNullable();
      table.string('price').notNullable();
      table.integer('amount').notNullable();
      table.foreign('invoice_id').references('invoices.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex
    .schema
    .dropTableIfExists('positions');
};
