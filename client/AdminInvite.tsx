import * as React from 'react'
import axios from './axios'
import { RouteComponentProps } from 'react-router-dom'
import alertService from './services/alert'

interface State {
  email?: string
  errors?: { email?: any }
}

export default class Invitation extends React.Component<RouteComponentProps, State> {
  constructor(props) {
    super(props)

    this.state = { email: "", errors: {} }
  }

  render() {
    return (
      <div className="invite-user-page">
        <h1>Invitar Usuario</h1>
        <form onSubmit={this.invite}>
          <div className={`form-group ${this.state.errors.email ? 'has-error' : null }`}>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" onChange={e => this.updateField({ email: e.target.value })} />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">Invitar</button>
          </div>
        </form>
      </div>
    )
  }

  updateField = (newState: State) => {
    this.setState(newState)
  }

  invite = async e => {
    e.preventDefault()

    alertService.clear()
    try {
      const response = await axios.post('/admin/invitations', { email: this.state.email })
      this.props.history.push('/admin/invitations')
    } catch (e) {
      console.log(e)
      if (e.response.status == 422) {
        this.setState({ errors: e.response.data })
      } else {
        alertService.error(`Ocurrió un error inesperado: ${e.message}`)
      }
    }
  }
}
