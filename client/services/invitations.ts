import axios from '../axios'
import { Invitation } from '../types'

async function list(): Promise<Invitation[]> {
  const response = await axios.get('/admin/invitations')
  return response.data
}

async function resend(id: number): Promise<void> {
  await axios.post(`/admin/invitations/${id}/resend`)
}

async function deleteById(id: number): Promise<void> {
  await axios.delete(`/admin/invitations/${id}`)
}

async function validateToken(token: string) {
  const response = await axios.get('/invitations/validate', { params: { token } })
  return response.data
}

export default {
  list,
  resend,
  deleteById,
  validateToken
}
