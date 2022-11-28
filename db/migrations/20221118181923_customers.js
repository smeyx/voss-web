/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex
    .schema
    .createTable('customers', table => {
      table.increments('id').unsigned();
      table.integer('user_id');
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.datetime('time_created', { useTz: true }).notNullable();
      table.datetime('time_updated', { useTz: true }).notNullable();
      table.foreign('user_id').references('users.id')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex
    .schema
    .dropTableIfExists('customers');
};