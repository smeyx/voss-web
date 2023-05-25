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
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
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
