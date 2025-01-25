export * from './is'
export * from './dom'
export * from './icon'
export * from './color'

/**
 * @desc  函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout
  return function (...args) {
    let context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        func.apply(context, args)
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}

export const convertPathsToTree = (paths) => {
  const result = []
  const level = { result }

  paths.forEach((path) => {
    path.split('/').reduce((r, name, i, a) => {
      if (!r[name]) {
        r[name] = { result: [] }
        r.result.push({
          label: name,
          key: a.slice(0, i + 1).join('/'),
          children: r[name].result
        })
      }
      return r[name]
    }, level)
  })

  // 清理空的 children 数组
  const cleanEmptyChildren = (items) => {
    items.forEach((item) => {
      if (item.children.length === 0) {
        delete item.children
      } else {
        cleanEmptyChildren(item.children)
      }
    })
  }

  cleanEmptyChildren(result)
  return result
}
