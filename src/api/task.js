import req from './req.js'

const baseApiUrl = '/task/'

export function postTaskExec(data) {
  return req.post(baseApiUrl + 'exec', data)
}

export function postTaskClean(data) {
  return req.post(baseApiUrl + 'clean', data)
}

export function queryTaskEvents(data) {
  return req.post(baseApiUrl + 'events', data)
}
