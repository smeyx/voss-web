/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('customers').del()
  await knex('customers').insert([
    {
      id: 1, 
      user_id: 1, 
      name: 'Herbert Müller',
      email: 'herbertmueller@asd.xyz',
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 2, 
      user_id: 1, 
      name: 'Simon Friedrichs',
      email: 'simonf@friedrichs.me',
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 3, 
      user_id: 1, 
      name: 'Harald Ritter',
      email: 'haraldritter@nospam.com',
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 4, 
      user_id: 1, 
      name: 'Thomas Tiefland',
      email: 'tt@somewhere.xyz',
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 5, 
      user_id: 1, 
      name: 'Fridtjof Rasmussen',
      email: 'fr@business.xt',
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 6, 
      user_id: 1, 
      name: 'Lisa Bauer',
      email: 'bauer@times.org',
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 7, 
      user_id: 1, 
      name: 'Fantasia Rohloff',
      email: 'frohloff@nothing.at',
      time_created: new Date(),
      time_updated: new Date(),
    },
  ]);

  const customers = [];
  for(let i = 8; i < 100; i++) {
    customers.push(
      {
        id: i,
        user_id: 1,
        name: 'Fantasia Rohloff',
        email: 'frohloff@nothing.at',
        time_created: new Date(),
        time_updated: new Date(),
      },
    );
  }

  await knex.table('customers').insert(customers);
};
