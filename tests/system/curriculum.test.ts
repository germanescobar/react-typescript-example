import 'expect-puppeteer'
import { setup, teardown } from '../globals'
import { visit, login } from './helpers'
import curriculumService from '../../server/services/curriculum'

beforeEach(setup)
afterEach(teardown)

test('complete and continue same section', async () => {
  const [section] = await curriculumService.getCurriculum()

  await login('user1')
  await visit(`/curriculum/${section.id}/${section.lessons[0].id}`)
  await page.waitForSelector('.lesson-page')

  expect(await page.content()).toContain("Completar y continuar")

  await Promise.all([page.waitForNavigation(), page.click('footer .btn')])
  expect(page.url()).toContain(section.lessons[1].id)
})

test('complete and continue next section', async () => {
  const [prevSection, nextSection] = await curriculumService.getCurriculum()
  const [lastLesson] = prevSection.lessons.slice(-1)

  await login('user1')
  await visit(`/curriculum/${prevSection.id}/${lastLesson.id}`)
  await page.waitForSelector('.lesson-page')

  expect(await page.content()).toContain("Completar y continuar")

  await Promise.all([page.waitForNavigation(), page.click('footer .btn')])
  expect(page.url()).toContain(`${nextSection.id}/${nextSection.lessons[0].id}`)
})
