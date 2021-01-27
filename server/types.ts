export interface User {
  id?: number
  email: string
  password: string
  firstName: string
  lastName: string
  resetPasswordToken?: string
  resetPasswordTokenSentAt?: Date
}

export interface Section {
  id?: string
  name: string
  lessons?: Lesson[]
}

export interface Lesson {
  id?: string
  sectionId?: number
  name: string
  content?: string,
  completed?: boolean
}

export interface Token {
  userId?: string
}

export interface Completion {
  id?: number,
  userId: number,
  sectionId: string,
  lessonId: string,
  completedAt: Date
}

export interface Invitation {
  id?: number
  email: string
  token: string
  createdAt: Date
}
