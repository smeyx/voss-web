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
      table.text('password').notNullable();
      table.string('name').nullable();
      table.string('street').nullable();
      table.string('city').nullable();
      table.string('state').nullable();
      table.string('postcode').nullable();
      table.string('phone').nullable();
      table.datetime('time_created', { useTz: true }).notNullable();
      table.datetime('time_updated', { useTz: true }).notNullable();
    });
};

/**mia_gers
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex
    .schema
    .dropTableIfExists('users');
};
