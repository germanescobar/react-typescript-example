import * as Knex from "knex"
import * as bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<any> {
  await knex("users").del()

  const password = await bcrypt.hash("test1234", 10)

  await knex("users").insert([
      { id: 1, firstName: "Pablo", lastName: "Garcia", email: "test@example.com", password, admin: true }
  ])
};
