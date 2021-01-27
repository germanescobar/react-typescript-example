import * as React from 'react'
import Loading from './components/Loading'
import { Link } from 'react-router-dom'
import { useFetchData } from './hooks'
import usersService from './services/users'
import { AdminUsersResponse, User } from './types'

export default () => {
  const [{ loading, error, data }] = useFetchData<AdminUsersResponse>(() => {
    return usersService.list()
  })

  if (loading) return <Loading />
  if (error) return <p>Error :(</p>

  return (
    <div className="admin-users-page">
      <header>
        <h1>Usuarios</h1>
        <Link to="/admin/invitations/new" className="btn btn-primary">Invitar</Link>
      </header>

      <div className="table-above">
        <Link to="/admin/invitations">{data.invitationsCount} invitaciones pendientes</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha Registro</th>
            <th>Progreso</th>
          </tr>
        </thead>
        <tbody>
          { data.users.map((u: User) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.createdAt}</td>
              <td>
                <div className="section-progress">
                  <div className="progress-bar" style={{ width: `${u.progress}%` }}></div>
                </div>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )
}
