import * as React from 'react'
import authService from './services/auth'
import alertService from './services/alert'
import Loading from './components/Loading'
import Alert from './components/Alert'
import { RouteComponentProps } from 'react-router-dom'

interface State {
  email?: string
  loading?: boolean
}

export default class ForgotPassword extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = { email: "", loading: false }
  }

  render() {
    return (
      <div className="auth-page">
        { this.state.loading ? <Loading /> : null }
        <form onSubmit={this.recover}>
          <h1>Recuperar Contraseña</h1>
          <p>Ingresa tu email para reestablecer la contraseña:</p>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" onChange={e => this.updateField({ email: e.target.value })} />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">Enviar</button>
          </div>
        </form>
      </div>
    )
  }

  updateField(newState: State) {
    this.setState({ ...newState })
  }

  recover = async (e) => {
    e.preventDefault()

    this.setState({ loading: true })

    try {
      await authService.forgotPassword(this.state.email)
      alertService.info(`Si el email ${this.state.email} existe en nuestro sistema recibirás un correo en unos minutos con las instrucciones para reestablecer tu contraseña.`)
      this.props.history.push({
        pathname: '/login',
        state: {
          email: this.state.email
        }
      })
    } catch (e) {
      console.log(e)

      alertService.error("Ocurrió un error inesperado, por favor intenta más tarde. Si el problema persiste comunícate con nosotros a info@makeitreal.camp.")
    }
  }
}
