const { hashSync } = require('bcrypt');
const { createHmac } = require('crypto');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const passwordHash = createHmac('sha256', 'secretissecret').update('qwertzuiop').digest('hex');
  const pass = hashSync(passwordHash, 12);
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, email: 'thisismymail@testmailstuff.org', password: Buffer.from(pass), time_created: new Date()},
    {id: 2, email: 'thisismymail2@tesdfasdfsadf.dfsdfsdf', password: Buffer.from(pass), time_created: new Date()},
    {id: 3, email: 'thisisdfasdf@sadjfksljdfksjdf.dess', password: Buffer.from(pass), time_created: new Date()},
  ]);
};
