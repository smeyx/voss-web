/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex
    .schema
    .createTable('addresses', table => {
      table.increments('id').unsigned();
      table.string('street').notNullable();
      table.string('housenumber').notNullable();
      table.string('city').notNullable();
      table.string('postalcode').notNullable();
      table.integer('customer_id').notNullable();
      table.datetime('time_created', { useTz: true }).notNullable();
      table.datetime('time_updated', { useTz: true }).notNullable();
      table.foreign('customer_id').references('customers.id');
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex
    .schema
    .dropTableIfExists('addresses');
};
