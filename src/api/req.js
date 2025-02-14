import axios from 'axios'
import { getEnv } from '@/utils'

axios.defaults.withCredentials = true

const { VITE_API_BASE_URL } = getEnv()
const service = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: VITE_API_BASE_URL,
  timeout: 30 * 60 * 1000 // 30 分钟
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log('req error', error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { status } = response
    if (status === 401) {
      return Promise.reject('Unauthorized')
    }
    return response.data
  },
  (error) => {
    console.log('resp error', error)
    const { response } = error
    if (response) {
      const { status } = response
      if (status === 401) {
        return Promise.reject('Unauthorized')
      }
    }
    return Promise.reject(error)
  }
)

export default service
