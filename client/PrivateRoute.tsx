import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import Loading from './components/Loading'
import { useStore } from './hooks'
import authService from "./services/auth";
import { User } from './types'

export default ({ component: Component, ...rest }) => {
  const user = useStore<User>(authService)

  return (
    <Route
      {...rest}
      render={props =>
        user.loaded ? (
          authService.isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        ) : (
          <Loading />
        )
      }
    />
  );
}
