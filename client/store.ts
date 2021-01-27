import * as _ from 'lodash'

export default class Store<T> {
  listeners: Array<Function> = []
  state: T

  constructor(initialState: T) {
    this.state = initialState
  }

  getState(): T {
    return this.state
  }

  setState(newState: T) {
    const oldState = this.state

    this.state = newState

    if (!_.isEqual(oldState, this.state)) {
      this.listeners.forEach(listener => {
        listener(this.state)
      })
    }
  }

  subscribe(fn: Function) {
    this.listeners.push(fn)
  }

  unsubscribe(fn: Function) {
    this.listeners = this.listeners.filter(listener => listener != fn)
  }
}
