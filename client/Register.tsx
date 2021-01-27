import * as React from 'react'
import { RouteComponentProps } from "react-router";
import authService from './services/auth'
import curriculumService from './services/curriculum'
import { User } from './types'

interface State {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

export default class Register extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = { firstName: "", email: "", password: "" }
  }

  render() {
    return (
      <div className="auth-page">
        <form onSubmit={this.register}>
          <h1>Registrarse</h1>
          <div className="form-group">
            <label htmlFor="first-name">Nombre: </label>
            <input type="text" id="first-name" onChange={e => this.setState({ firstName: e.target.value  })} />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Apellido: </label>
            <input type="text" id="last-name" onChange={e => this.setState({ lastName: e.target.value  })} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" onChange={e => this.setState({ email: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña: </label>
            <input type="password" id="password" onChange={e => this.setState({ password: e.target.value  })} />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">Registrarse</button>
          </div>
        </form>
      </div>
    )
  }

  register = async (e) => {
    e.preventDefault()

    try {
      const { firstName, lastName, email, password } = this.state
      const data: User = { firstName, lastName, email, password }
      await authService.signup(data)

      const sections = curriculumService.getState()
      this.props.history.push(`/curriculum/${sections[0].id}/${sections[0].lessons[0].id}`)
    } catch (e) {
      console.log(e)
    }
  }
}
