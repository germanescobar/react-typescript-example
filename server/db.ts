import * as knex from 'knex'
import * as config from '../knexfile'

export default knex(config[process.env.NODE_ENV || "development"]);
