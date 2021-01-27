import Store from '../store'
import axios from '../axios'
import { User } from '../types'

const USER_URI = '/me'
const SIGNUP_URI = '/signup'
const LOGIN_URI = '/login'
const FORGOT_PASSWORD_URI = '/passwords/forgot'
const VALIDATE_TOKEN_URI = '/passwords/validate-token'
const RESET_PASSWORD_URI = '/passwords/reset'

function getNullUser() {
  return { firstName: null, lastName: null, email: null, token: null, loaded: false }
}

class AuthService extends Store<User> {
  async loadUser() {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        await this._doLoadUser(token)
      } catch (e) {
        console.log(e)
        localStorage.removeItem("token")
        this.setState({ token: null, loaded: true })
      }
    } else {
      this.setState({ ...this.getState(), loaded: true })
    }
  }

  async _doLoadUser(token: string) {
    const response = await axios.get(USER_URI)
    const { firstName, lastName, email, admin } = response.data
    this.setState({ firstName, lastName, email, admin, token, loaded: true })
  }

  async signup(user: User) {
    const response = await axios.post(SIGNUP_URI, user)

    const { token } = response.data
    localStorage.setItem("token", token)
    this.setState({ firstName: user.firstName, lastName: user.lastName, email: user.email, token, loaded: true })
  }

  async login(emailArg: string, password: string) {
    const response = await axios.post(LOGIN_URI, { email: emailArg, password })

    const { firstName, lastName, email, admin, token } = response.data
    localStorage.setItem("token", token)
    this.setState({ firstName, lastName, email, admin, token, loaded: true })
  }

  logout() {
    localStorage.removeItem("token")
    this.setState(getNullUser())
  }

  async forgotPassword(email: string) {
    const response = await axios.post(FORGOT_PASSWORD_URI, { email })
    console.log(response)
  }

  async validatePasswordToken(token: string): Promise<any> {
    const response = await axios.get(VALIDATE_TOKEN_URI, { params: { token } })
    return response.data
  }

  async resetPassword(token: string, password: string) {
    const response = await axios.patch(RESET_PASSWORD_URI, { token, password })
    const { status } = response.data

    if (status != "ok") {
      throw new Error("no se puedo reestablecer la contraseña")
    }
  }

  isAuthenticated() {
    return this.state.token != null
  }
}

export default new AuthService(getNullUser())
