/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex
    .schema
    .createTable('users', table => {
      table.increments('id').unsigned();
      table.string('email').notNullable().unique();
      table.datetime('time_created', { useTz: true }).notNullable();
      table.datetime('time_updated', { useTz: true }).notNullable();
      table.text('password');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex
    .schema
    .dropTableIfExists('users');
};
