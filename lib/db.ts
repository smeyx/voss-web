import { knex } from 'knex';
import type { Knex } from 'knex';
import * as KnexConfig from '@knexfile';

const env = 'development';
const db: Knex = knex(KnexConfig[env]);
export default db;
