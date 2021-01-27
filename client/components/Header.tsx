import * as React from 'react'
import { withRouter, RouteComponentProps } from "react-router";
import authService from '../services/auth'
import { User } from '../types'

class Header extends React.Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = { isAuthenticated: authService.isAuthenticated() }
    authService.subscribe((_: User) => {
      this.setState({ isAuthenticated: authService.isAuthenticated() })
    })
  }

  render() {
    return (
      <header className="main">
        <div className="brand">
          <img src="/images/horizontal-white.png" />
        </div>
        { authService.isAuthenticated() ? <a onClick={this.logout} href="#">Salir</a> : <a onClick={this.login} href="#">Ingresar</a> }
      </header>
    )
  }

  login = (e) => {
    this.props.history.push('/login')
  }

  logout = (e) => {
    e.preventDefault()

    authService.logout()
    this.props.history.push('/login')
  }
}

export default withRouter(Header)
