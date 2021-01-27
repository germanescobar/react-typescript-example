import * as React from 'react'
import { Link } from 'react-router-dom'
import axios from './axios'
import * as queryString from 'query-string'
import authService from './services/auth'
import curriculumService from './services/curriculum'
import invitationsService from './services/invitations'
import Loading from './components/Loading'
import { RouteComponentProps } from 'react-router-dom'

interface State {
  loading?: boolean
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  passwordConfirm?: string
  token?: string
  valid?: boolean
}

export default class ActivateUser extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = { loading: true, email: "", firstName: "", lastName: "", token: "", valid: false }
  }

  async componentDidMount() {
    const query = queryString.parse(this.props.location.search)
    try {
      const token: string = query.token as string
      const response = await invitationsService.validateToken(token)
      this.setState({ loading: false, email: response.email, token, valid: true })
    } catch (e) {
      if (e.response && e.response.status == 404) {
        this.setState({ loading: false, valid: false })
      }
    }
  }

  render() {
    if (this.state.loading) return <Loading />

    if (!this.state.valid) {
      return (
        <div className="activate-account-page">
          <h2>El token es inválido, revisa la URL e intenta nuevamente. Si ya activaste tu cuenta <Link to="/login">haz click en este enlace para ingresar</Link>.</h2>
        </div>
      )
    }

    return (
      <div className="activate-account-page">
        <h1>Activar cuenta</h1>
        <form onSubmit={this.activate}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="form-group">
              <label htmlFor="first-name">Nombre: </label>
              <input type="text" id="first-name" onChange={e => this.setState({ firstName: e.target.value  })} autoFocus />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Apellido: </label>
              <input type="text" id="last-name" onChange={e => this.setState({ lastName: e.target.value  })} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" onChange={e => this.setState({ email: e.target.value })} value={this.state.email} disabled readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña: </label>
            <input type="password" id="password" onChange={e => this.setState({ password: e.target.value  })} />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">Activar</button>
          </div>
        </form>
      </div>
    )
  }

  activate = async e => {
    e.preventDefault()

    this.setState({ loading: true })

    const { email, firstName, lastName, password, token } = this.state
    await authService.signup({ email, firstName, lastName, password, invitationToken: token })

    const sections = curriculumService.getState()
    this.props.history.push(`/curriculum/${sections[0].id}/${sections[0].lessons[0].id}`)
  }
}
