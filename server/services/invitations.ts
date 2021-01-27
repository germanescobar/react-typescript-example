import * as crypto from 'crypto'
import db from '../db'
import { Invitation } from '../types'
import { ValidationError } from '../errors'

const findAll = async (): Promise<Invitation[]> => {
  return await db("invitations")
}

const find = async (id: number): Promise<Invitation> => {
  return await db("invitations").where({ id }).first()
}

const findByToken = async (token: string): Promise<Invitation> => {
  return await db("invitations").where({ token }).first()
}

const countAll = async (): Promise<number> => {
  const result = await db("invitations").count().first()
  return Number(result.count)
}

const create = async (email: string): Promise<Invitation> => {
  await validateEmail(email)

  const token = await generateToken()
  const [record] = await db("invitations").insert({ email, token }).returning('*')

  return record
}

async function validateEmail(email: string): Promise<void> {
  // validate that email is unique
  const user = await db("users").where({ email }).first()
  if (user) {
    throw new ValidationError("There are some errors preventing the persistence of the record", {
      email: { reason: "duplicated", message: "ya existe" }
    })
  }

  const inv = await db("invitations").where({ email }).first()
  if (inv) {
    throw new ValidationError("There are some errors preventing the persistence of the record", {
      email: { reason: "duplicated", message: "ya existe" }
    })
  }
}

async function generateToken(): Promise<string> {
  let token: string, exists: boolean
  do {
    token = crypto.randomBytes(16).toString('hex')
    exists = await db("invitations").where({ token }).first()
  } while (exists)

  return token
}

const deleteById = async (id: number): Promise<void> => {
  await db("invitations").where({ id }).del()
}

const deleteByEmail = async (email: string): Promise<void> => {
  await db("invitations").where({ email }).del()
}

const deleteByToken = async (token: string): Promise<void> => {
  await db("invitations").where({ token }).del()
}

export default {
  findAll,
  find,
  findByToken,
  countAll,
  create,
  deleteById,
  deleteByEmail,
  deleteByToken
}
