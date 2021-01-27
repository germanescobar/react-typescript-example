import * as React from 'react'
import { Link } from 'react-router-dom'
import Loading from './components/Loading'
import { useFetchData } from './hooks'
import invitationsService from './services/invitations'
import { Invitation } from './types'

export default () => {
  const [{ loading, error, data }, setState] = useFetchData<Invitation[]>(async () => {
    return await invitationsService.list()
  })

  if (loading) return <Loading />
  if (error) return <p>Error :(</p>

  async function resend(e, id: number) {
    e.preventDefault()

    try {
      await invitationsService.resend(id)
    } catch (e) {
      console.log(e)
      setState(s => ({ ...s, loading: false, error: e }))
    }
  }

  async function destroy(e, id: number) {
    e.preventDefault()
    try {
      await invitationsService.deleteById(id)
      setState(s => ({ ...s, data: s.data.filter(i => i.id != id) }))
    } catch (e) {
      console.log(e)
      setState(s => ({ ...s, loading: false, error: e }))
    }
  }

  return (
    <div className="admin-invitations-page">
      <Link to="/admin/users">&larr; Usuarios</Link>

      <h1>Invitaciones pendientes</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Fecha Invitación</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { data.map(inv => (
            <tr key={inv.id}>
              <td>{ inv.email }</td>
              <td>{ inv.createdAt }</td>
              <td>
                <a href="#" onClick={e => resend(e, inv.id)}>Reenviar</a>
                <a href="#" onClick={e => destroy(e, inv.id)}>Eliminar</a>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )
}
