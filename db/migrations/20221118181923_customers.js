/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const now = new Date();

  return knex
    .schema
    .createTable('customers', table => {
      table.increments('id').unsigned();
      table.integer('user_id').notNullable();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('phone').nullable();
      table.datetime('time_created', { useTz: true }).defaultTo(now).notNullable();
      table.datetime('time_updated', { useTz: true }).defaultTo(now).notNullable();
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
