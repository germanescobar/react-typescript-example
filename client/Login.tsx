import * as React from 'react'
import authService from './services/auth'
import curriculumService from './services/curriculum'
import alertService from './services/alert'
import Alert from './components/Alert'
import { RouteComponentProps } from 'react-router-dom'

interface State {
  email?: string
  password?: string
}

interface LocationState {
  email?: string
  info?: string
}

export default class Login extends React.Component<RouteComponentProps<{}, {}, LocationState>, State> {
  constructor(props: RouteComponentProps) {
    super(props)

    const { email } = this.props.location.state || { email: "" }
    this.state = { email, password: "" }
  }

  render() {
    return (
      <div className="auth-page">
        <form onSubmit={this.login}>
          <h1>Ingresar</h1>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" value={this.state.email} onChange={e => this.updateField({ email: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña: </label>
            <input type="password" id="password" value={this.state.password} onChange={e => this.updateField({ password: e.target.value  })} />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">Ingresar</button>
          </div>

          <a onClick={this.forgotPassword} href="#" className="forgot-pass">Olvidé mi contraseña</a>
        </form>
      </div>
    )
  }

  updateField(newState: State) {
    this.setState({ ...newState })
  }

  login = async (e) => {
    e.preventDefault()
    alertService.clear()

    try {
      const { email, password } = this.state
      await authService.login(email, password)
      await curriculumService.load()

      const sections = curriculumService.getState()
      this.props.history.push(`/curriculum/${sections[0].id}/${sections[0].lessons[0].id}`)
    } catch (e) {
      console.log(e)

      if (e.response && e.response.status == 401) {
        alertService.error("Email y/o contraseña inválidos. Intenta nuevamente.")
      } else {
        alertService.error(e.message)
      }
    }
  }

  forgotPassword = (e) => {
    this.props.history.push('/passwords/forgot')
  }
}
