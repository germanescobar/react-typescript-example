import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Loading from './components/Loading'
import authService from './services/auth'
import curriculumService from './services/curriculum'
import { useStore } from './hooks'
import { User, Section } from './types'

export default () => {
  const user = useStore<User>(authService)
  const sections = useStore<Section[]>(curriculumService)

  if (!user.loaded || sections.length == 0) {
    return <Loading />
  }

  if (authService.isAuthenticated()) {
    const sections = curriculumService.getState()
    return <Redirect to={`/curriculum/${sections[0].id}/${sections[0].lessons[0].id}`} />
  } else {
    return <Redirect to='/login' />
  }
}
