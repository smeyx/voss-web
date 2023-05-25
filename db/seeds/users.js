const { hashSync } = require('bcrypt');
const { createHmac } = require('crypto');
const dotenv = require('dotenv');
dotenv.config('../../.env.local');

const generateHashFromString = (password) => {
  const COOKIE_PW = process.env.COOKIE_PW;
  const hash = createHmac('sha256', COOKIE_PW).update(password).digest('hex');
  const pass = hashSync(hash, 12);
  
  return pass;
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const pass = generateHashFromString('qwertzuiop');
  const simonPass = generateHashFromString('testtest');
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, email: 'simon.meyer@mailbox.org', password: (simonPass), time_created: new Date(), time_updated: new Date()},
    {id: 2, email: 'thisismymail2@tesdfasdfsadf.dfsdfsdf', password: (pass), time_created: new Date(), time_updated: new Date()},
    {id: 3, email: 'thisisdfasdf@sadjfksljdfksjdf.dess', password: (pass), time_created: new Date(), time_updated: new Date()},
    {
      id: 4, 
      email: 'simon@voss.de', 
      password: (pass), 
      time_created: new Date(), 
      time_updated: new Date()
    },
  ]);
};
