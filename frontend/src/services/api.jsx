import axios from 'axios'
import { getToken, logout } from './auth'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => {
    return response
  },
  function(error) {
    // Do something with response error
    if (error.response.status === 401) {
      console.log('unauthorized, logging out ...')
      logout()
      // router.replace('/')
    }
    return Promise.reject(error.response)
  }
)

export default api
