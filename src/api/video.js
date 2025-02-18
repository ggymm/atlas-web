import req from './req.js'
import { getEnv } from '@/utils/index.js'

const baseApiUrl = '/video/'

export function queryVideoInfo(data) {
  return req.post(baseApiUrl + 'query/info', data)
}

export function queryVideoPage(data) {
  return req.post(baseApiUrl + 'query/page', data)
}

export function queryVideoPaths(data) {
  return req.post(baseApiUrl + 'query/paths', data)
}

export function updateVideoStars(data) {
  return req.post(baseApiUrl + 'update/stars', data)
}

export function videoPlay(id) {
  return req.post(baseApiUrl + `play/${id}`)
}

const { VITE_API_BASE_URL } = getEnv()

export function videoCover(id) {
  return `${VITE_API_BASE_URL}${baseApiUrl}cover/${id}`
}
