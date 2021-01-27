import * as knex from 'knex'
import * as config from '../knexfile'

const db = knex(config[process.env.NODE_ENV || "development"])

async function seed() {
  await db("completions").del()
  await db("users").del()
  await db("invitations").del()
}

seed().then(() => db.destroy()).catch(e => console.log(e))
