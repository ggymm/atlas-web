import req from './req.js'

const baseApiUrl = '/task/'

export function postTaskExec(data) {
  return req.post(baseApiUrl + 'post/exec', data)
}

export function postTaskClean(data) {
  return req.post(baseApiUrl + 'post/clean', data)
}

export function queryTaskEvents(data) {
  return req.post(baseApiUrl + 'query/events', data)
}
