import req from './req.js'

const baseApiUrl = '/task/'

export function taskExec(data) {
  return req.post(baseApiUrl + 'exec', data)
}

export function taskClean(data) {
  return req.post(baseApiUrl + 'clean', data)
}
