import db from '../db'
import { Completion } from '../types'

const findAllByUser = async (userId: number): Promise<Array<Completion>> => {
  return await db("completions").where({ userId })
}

const findByUserAndLesson = async (userId: number, sectionId: string, lessonId: string): Promise<Completion> => {
  return await db("completions").where({ userId, sectionId, lessonId}).first()
}

const create = async (completion: Completion): Promise<void> => {
  const [record] = await db("completions").insert(completion).returning('*')
  return record
}

export default {
  findAllByUser,
  findByUserAndLesson,
  create
}
