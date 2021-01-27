import * as knex from 'knex'
import * as bcrypt from 'bcrypt'
import * as config from '../knexfile'

export async function setup() {
  page.on("pageerror", err => console.log("Page error: ", err.toString()))
  page.on("error", err => console.log("Error: ", err.toString()))

  const db = knex(config[process.env.NODE_ENV || "development"])

  await db("completions").del()
  await db("users").del()
  await db("invitations").del()

  const password = await bcrypt.hash("test1234", 10)

  await db("users").insert([
      { id: 1, firstName: "Pablo", lastName: "Garcia", email: "user1@example.com", password, admin: false },
      { id: 2, firstName: "Pedro", lastName: "Perez", email: "admin1@example.com", password, admin: true }
  ])

  return db
}

export async function teardown() {
  await page.evaluate(() => localStorage.removeItem("token"))
}
