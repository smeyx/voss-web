/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex
  .schema
  .createTable('invoice_schedule_options', table => {
    table.increments('id').unsigned();
    table.string('name').unsigned();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex
  .schema
  .dropTableIfExists('invoice_schedule_options');
};
