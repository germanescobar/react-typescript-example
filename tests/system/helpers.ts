import * as jwt from "jsonwebtoken"

const baseUrl = 'http://localhost:4444'

const users = {
  user1: 1,
  admin1: 2
}

export function visit(path: string) {
  return page.goto(`${baseUrl}${path}`)
}

export async function clearInput(selector: string) {
  await page.click(selector, { clickCount: 3 })
  await page.type(selector, '')
}

export async function login(user: string) {
  const token = jwt.sign({ userId: users[user] }, "secretcode")

  await visit('/login')
  await page.evaluate(token => localStorage.setItem("token", token), token)
}
