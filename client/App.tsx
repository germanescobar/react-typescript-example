import * as React from "react"
import { useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Header from './components/Header'
import Alert from './components/Alert'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import Home from './Home'
import Lesson from './Lesson'
import Login from './Login'
import Register from './Register'
import AdminUsers from './AdminUsers'
import AdminInvitations from './AdminInvitations'
import AdminInvite from './AdminInvite'
import ActivateUser from './ActivateUser'
import ForgotPassword from './ForgotPassword'
import PasswordReset from './PasswordReset'
import NotFound from './NotFound'
import curriculumService from './services/curriculum'
import authService from './services/auth'
import alertService from './services/alert'
import { useStore } from './hooks'
import { AlertType } from './types'
import './styles/application.scss'

const App = () => {
  const alert = useStore<AlertType>(alertService)

  useEffect(() => {
    async function load() {
      await authService.loadUser()
      await curriculumService.load()
    }
    load()
  }, [])

  return (
    <React.Fragment>
      <Router>
        <Header />

        { alert.show ? <Alert variant={alert.variant}>{ alert.message }</Alert> : null }
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/account/activate" component={ActivateUser} />
          <Route exact path="/passwords/forgot" component={ForgotPassword} />
          <Route exact path="/passwords/reset" component={PasswordReset} />
          <PrivateRoute exact path="/curriculum/:sectionId/:lessonId" component={Lesson} />
          <AdminRoute exact path="/admin/users" component={AdminUsers} />
          <AdminRoute exact path="/admin/invitations" component={AdminInvitations} />
          <AdminRoute exact path="/admin/invitations/new" component={AdminInvite} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
