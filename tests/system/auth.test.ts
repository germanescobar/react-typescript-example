import 'expect-puppeteer'
import { setup, teardown } from '../globals'
import { visit, clearInput } from './helpers'
import invitationsService from '../../server/services/invitations'
import usersService from '../../server/services/users'

beforeEach(setup)
afterEach(teardown)

test("user can signin", async () => {
  await visit("/login")
  await page.waitForSelector('.auth-page');

  await page.type('#email', 'user1@example.com')
  await page.type('#password', 'invalid')
  await page.click('.btn[type=submit]')

  await page.waitForSelector('.alert.alert-error')

  await clearInput('#email')
  await page.type('#email', 'user1@example.com')
  await clearInput('#password')
  await page.type('#password', 'test1234')
  await page.click('.btn[type=submit]')

  await page.waitForNavigation();

  expect(page.url()).toMatch(/preparacion/);
});

test("user can create/activate account", async () => {
  const invitation = await invitationsService.create("newuser@example.com")

  await visit(`/account/activate?token=${invitation.token}`)
  await page.waitForSelector('.activate-account-page')

  await page.type('#first-name', 'Maria')
  await page.type('#last-name', 'Garcia')
  await page.type('#password', "test1234")
  await page.click('.btn[type=submit]')

  await page.waitForNavigation();

  expect(page.url()).toMatch(/preparacion/)
})

test("user can reset password", async () => {
  await visit("/login")
  await page.waitForSelector('.auth-page')

  await Promise.all([page.waitForNavigation(), page.click('.forgot-pass')])

  expect(page.url()).toContain("/passwords/forgot")
  await page.type('#email', 'user1@example.com')

  await Promise.all([page.waitForNavigation(), page.click('.btn[type=submit]')])

  expect(page.url()).toMatch(/login/)
  expect(await page.content()).toContain('Si el email user1@example.com existe en nuestro sistema')

  const user = await usersService.findByEmail('user1@example.com')
  await visit(`/passwords/reset?token=${user.resetPasswordToken}`)

  await page.waitForSelector('.activate-account-page form')

  await page.type('#password', 'test1234')
  await page.type('#password-confirm', 'test1234')

  await Promise.all([page.waitForNavigation(), page.click('.btn[type=submit]')])

  expect(page.url()).toMatch(/login/)
  expect(await page.content()).toContain('reestablecida con éxito')
})
