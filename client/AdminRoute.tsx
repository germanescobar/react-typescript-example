import * as React from "react";
import { Route } from "react-router-dom";
import Loading from './components/Loading'
import NotFound from './NotFound'
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
          authService.isAuthenticated() && user.admin ? (
            <Component {...props} />
          ) : (
            <NotFound />
          )
        ) : (
          <Loading />
        )
      }
    />
  );
}
