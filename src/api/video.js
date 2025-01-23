import req from './req.js'
import { getEnv } from '@/utils/index.js'

const baseApiUrl = '/video/'

export function videoInfo(data) {
  return req.post(baseApiUrl + 'query/info', data)
}

export function videoPage(data) {
  return req.post(baseApiUrl + 'query/page', data)
}

const { VITE_API_BASE_URL } = getEnv()

export function videoCover(id) {
  return `${VITE_API_BASE_URL}${baseApiUrl}cover/${id}`
}
