import req from './req.js'

const baseApiUrl = '/v1/video/'

export function getPage(data) {
  return req.post(baseApiUrl + 'page', data)
}
