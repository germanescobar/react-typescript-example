import axios from '../axios'
import { User } from '../types'

async function list(): Promise<User[]> {
  const response = await axios.get('/admin/users')
  return response.data
}

export default {
  list
}
