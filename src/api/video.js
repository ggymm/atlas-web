import req from './req.js'
import { getEnv } from '@/utils/index.js'

const baseApiUrl = '/video/'

const { VITE_API_BASE_URL } = getEnv()

export function getPage(data) {
  return req.post(baseApiUrl + 'page', data)
}

export function getCover(id) {
  return `${VITE_API_BASE_URL}${baseApiUrl}cover/${id}`
}
