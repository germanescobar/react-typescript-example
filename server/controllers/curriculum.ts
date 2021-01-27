import * as _ from 'lodash'
import completionsService from '../services/completions'
import curriculumService from '../services/curriculum'
import { Section, Lesson } from '../types'
import { readFile } from '../util'

export async function getCurriculum(req, res, next) {
  try {
    const curriculum: Section[] = _.cloneDeep(await curriculumService.getCurriculum())

    const user = res.locals.user
    if (user) {
      // fill the curriculum with completions of user
      const completions = await completionsService.findAllByUser(user.id)
      for (let i=0; i < completions.length; i++) {
        const c = completions[i]
        const lesson = extractLesson(curriculum, c.sectionId, c.lessonId)
        if (lesson) {
          lesson.completed = true  
        }
      }
    }

    res.json(curriculum)
  } catch (e) {
    next(e)
  }
}

// helper method to extract a lesson from the curriculum
const extractLesson = (curriculum: Section[], sectionId: string, lessonId: string): Lesson => {
  const section: Section = curriculum.find(s => s.id == sectionId)
  return section.lessons.find(l => l.id == lessonId)
}

export async function getLesson(req, res, next) {
  try {
    const { sectionId, lessonId } = req.params
    const data = await readFile(`server/curriculum/${sectionId}/${lessonId}.md`)

    const lesson = await curriculumService.findLesson(sectionId, lessonId)
    const ret = { name: lesson.name, content: data.toString(), completed: false }

    const completion = await completionsService.findByUserAndLesson(res.locals.user.id, sectionId, lessonId)
    if (completion) {
      ret.completed = true
    }
    res.json(ret)
  } catch (e) {
    next(e)
  }
}

export async function getUserCompletions(req, res, next) {
  try {
    const user = res.locals.user
    const completions = await completionsService.findAllByUser(user.id)

    res.json(completions)
  } catch (e) {
    next(e)
  }
}

export async function completeLesson(req, res, next) {
  try {
    const { sectionId, lessonId } = req.params
    const lesson: Lesson = await curriculumService.findLesson(sectionId, lessonId)
    if (!lesson) {
      return res.status(404).json({ error: "Not Found" })
    }

    await completionsService.create({
      userId: res.locals.user.id,
      sectionId,
      lessonId,
      completedAt: new Date()
    })
    res.status(204).send({})
  } catch (e) {
    next(e)
  }
}
