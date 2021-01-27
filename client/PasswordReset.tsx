import * as React from 'react'
import * as queryString from 'query-string'
import { RouteComponentProps } from 'react-router-dom'
import Alert from './components/Alert'
import Loading from './components/Loading'
import authService from './services/auth'
import alertService from './services/alert'

interface State {
  password: string,
  passwordConfirm: string
  loading: boolean
  email?: string
  valid: boolean
  token?: string
  error?: any
}

export default class PasswordReset extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = { password: "", passwordConfirm: "", loading: true, email: "", valid: false, token: "" }
  }

  async componentDidMount() {
    const query = queryString.parse(this.props.location.search)
    const { valid, email } = await authService.validatePasswordToken(query.token as string)

    this.setState({ loading: false, email, valid, token: query.token as string })
  }

  render() {
    if (this.state.loading) return <Loading />

    if (!this.state.valid) {
      return (
        <div className="activate-account-page">
          <h1>El token es inválido o ha expirado, revisa la URL e intenta nuevamente.</h1>
        </div>
      )
    }

    return (
      <div className="activate-account-page">
        <h1>Reestablecer contraseña</h1>
        <form onSubmit={this.reset}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" value={this.state.email} readOnly disabled={true} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Nueva Contraseña: </label>
            <input type="password" id="password" onChange={e => this.setState({ password: e.target.value  })} />
          </div>

          <div className="form-group">
            <label htmlFor="password-confirm">Confirmar Contraseña: </label>
            <input type="password" id="password-confirm" onChange={e => this.setState({ passwordConfirm: e.target.value  })} />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">Enviar</button>
          </div>
        </form>
      </div>
    )
  }

  reset = async e => {
    e.preventDefault()

    if (this.state.password != this.state.passwordConfirm) {
      alertService.error("Las contraseñas no coinciden.")
      return
    }

    alertService.clear()
    this.setState({ loading: true })

    try {
      await authService.resetPassword(this.state.token, this.state.password)
      this.setState({ loading: false })

      alertService.info("La contraseña ha sido reestablecida con éxito")

      this.props.history.push({
        pathname: '/login',
        state: {
          email: this.state.email
        }
      })
    } catch(e) {
      console.log(e)

      alertService.error("Ocurrió un error inesperado: " + e.message)
    }
  }
}
