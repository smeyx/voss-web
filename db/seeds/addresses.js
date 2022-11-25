/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('addresses').del()
  await knex.table('addresses').insert([
    {
      id: 1,
      street: 'Bauernstraße',
      housenumber: '17a',
      city: 'Essen',
      postalcode: '17881',
      customer_id: 1,
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 2,
      street: 'Friedensallee',
      housenumber: '1',
      city: 'Düsseldorf',
      postalcode: '38810',
      customer_id: 2,
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 3,
      street: 'Baumweg',
      housenumber: '60',
      city: 'Münster',
      postalcode: '34517',
      customer_id: 3,
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 4,
      street: 'Tiefseegrund',
      housenumber: '160',
      city: 'Flensburg',
      postalcode: '18290',
      customer_id: 4,
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 5,
      street: 'Hauptstrasse',
      housenumber: '20',
      city: 'Oldenburg',
      postalcode: '26122',
      customer_id: 5,
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 6,
      street: 'Sektenallee',
      housenumber: '100',
      city: 'Hamburg',
      postalcode: '47718',
      customer_id: 6,
      time_created: new Date(),
      time_updated: new Date(),
    },
    {
      id: 7,
      street: 'Straße des 17. Juni',
      housenumber: '90',
      city: 'Berlin',
      postalcode: '33360',
      customer_id: 7,
      time_created: new Date(),
      time_updated: new Date(),
    },
  ]);
};
