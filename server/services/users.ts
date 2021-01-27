import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import db from '../db'
import curriculumService from './curriculum'
import { User } from '../types'

const findAll = async (): Promise<User[]> => {
  const users = await db("users")

  const curriculum = await curriculumService.getCurriculum()
  const numLessons = curriculum.reduce((sum, section) => sum + section.lessons.length, 0)

  for (let i=0; i < users.length; i++) {
    const user = users[i]
    let completions = await db("completions").where({ userId: user.id })
    completions = completions.filter(c => curriculumService.findLesson(c.sectionId, c.lessonId))

    const progress = (completions.length / numLessons) * 100
    user.progress = progress.toFixed(1)
  }

  return users
}

const find = async (id: number): Promise<User> => {
  return await db("users").where({ id }).first()
}

const findByEmail = async (email: string): Promise<User> => {
  return await db("users").where({ email }).first()
}

const create = async (user: User): Promise<User> => {
  const [record] = await db("users").insert(user).returning('*')
  return record
}

const forgotPassword = async (user: User): Promise<User> => {
  let exists = true, uuid = ""

  // find a uuid that doesn't exists in the database, can uuid's be repeated?
  while (exists) {
    uuid = uuidv4()
    const result = await db("users").where({ resetPasswordToken: uuid })
    if (result.length == 0) exists = false
  }

  const result = await db("users").where({ id: user.id })
          .update({ resetPasswordToken: uuid, resetPasswordTokenSentAt: new Date() }).returning('*')
  return result[0]
}

const findByPasswordToken = async (token: string): Promise<User> => {
  return await db("users").where({ resetPasswordToken: token }).first()
}

const resetPassword = async (token: string, password: string): Promise<User> => {
  const hashed = await bcrypt.hash(password, 10)
  const result = await db("users")
                        .where({ resetPasswordToken: token })
                        .update({ password: hashed, resetPasswordToken: null, resetPasswordTokenSentAt: null })
                        .returning('*')
  return result[0]
}

export default {
  findAll,
  find,
  findByEmail,
  create,
  forgotPassword,
  findByPasswordToken,
  resetPassword
}
