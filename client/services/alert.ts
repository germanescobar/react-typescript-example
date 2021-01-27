import Store from '../store'
import { AlertType } from '../types'

class AlertService extends Store<AlertType> {
  info(message: string) {
    this.setState({ show: true, variant: "info", message })
  }

  error(message: string) {
    this.setState({ show: true, variant: "error", message })
  }

  clear() {
    this.setState({ show: false, variant: null, message: "" })
  }
}

export default new AlertService({ show: false, variant: null, message: "" })
