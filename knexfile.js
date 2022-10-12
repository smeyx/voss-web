const { resolve } = require('path');
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    useNullAsDefault: true,
    client: 'better-sqlite3',
    connection: {
      filename: './db/dev.sqlite3'
    },
    migrations: {
      directory: resolve(__dirname, 'db/migrations'),
    },
    seeds: {
      directory: resolve(__dirname, 'db/seeds'),
    }
  },

  staging: {
  },

  production: {
  }

};
