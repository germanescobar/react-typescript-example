import * as React from "react";
import { useLocation } from 'react-router-dom'
import { Store } from './types'

export const useFetchData = <T>(fn: Function): [{loading: boolean, error: Error, data: T}, Function] => {
  let location = useLocation()

  const [state, setState] = React.useState({
    loading: true,
    error: null,
    data: null
  });

  React.useEffect(() => {
    async function load() {
      setState({
        loading: false,
        error: null,
        data: await fn()
      })
    }

    load()
  }, [location])

  return [state, setState];
}

export const useStore = <T>(store: Store): T => {
  const [state, setState] = React.useState(store.getState())

  React.useEffect(() => {
    store.subscribe((newState: any) => {
      setState(newState)
    })

    // update the state (state could have changed already)
    setState(store.getState())
  }, [])

  return state
}

export const useScrollTop = ref => {
  let location = useLocation()
  React.useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, 0)
  }, [location])
}
