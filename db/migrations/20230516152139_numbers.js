/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex
    .schema
    .createTable('number_ranges', table => {
      table.increments('id').unsigned();
      table.integer('user_id').notNullable();
      table.string('name').notNullable();
      table.string('prefix').nullable();
      table.integer('number_length').notNullable().defaultTo(6);
      table.integer('current_number').notNullable().defaultTo(1);
      table.string('filler').nullable();
      table.timestamp('time_created', { useTz: true });
      table.timestamp('time_updated', { useTz: true });
      table.foreign('user_id').references('users.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex
    .schema
    .dropTableIfExists('number_ranges');
};
