export interface Store {
  getState(): any
  setState(state: any): void
  subscribe(fn: Function): void
  unsubscribe(fn: Function): void
}

export interface Section {
  id?: string
  name: string
  lessons?: Lesson[]
}

export interface Lesson {
  id?: string
  sectionId: string
  name: string
  position?: number
  content: string
  completed?: boolean
}

export interface User {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  createdAt?: Date
  token?: string
  admin?: boolean
  loaded?: boolean
  invitationToken?: string
  progress?: number
}

export interface Invitation {
  id?: number
  email?: string
  token?: string
  createdAt?: Date
}

export interface AdminUsersResponse {
  invitationsCount: number,
  users: User[]
}

export interface AlertType {
  show: boolean
  variant: string
  message: string
}
