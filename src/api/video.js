import req from './req.js'
import { getEnv } from '@/utils/index.js'

const baseApiUrl = '/video/'

const { VITE_API_BASE_URL } = getEnv()

export function cover(id) {
  return `${VITE_API_BASE_URL}${baseApiUrl}cover/${id}`
}

export function queryPage(data) {
  return req.post(baseApiUrl + 'query/page', data)
}

export function queryStats(data) {
  return req.post(baseApiUrl + 'query/stats', data)
}
