const { resolve } = require('path');

// use process.env in seeds
const dotenv = require('dotenv');
dotenv.config({ path: './.env.local'});

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    useNullAsDefault: true,
    client: 'sqlite3',
    connection: {
      filename: './db/dev.sqlite3',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    }
  },

  staging: {
  },

  production: {
  }

};
