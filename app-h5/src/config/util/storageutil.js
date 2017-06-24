/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}
// 获取localStorage
export const getStore = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}
// 删除localStorage
export const removeStore = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}
// 清空数据
export const clearData = () => {
  if (!window.sessionStorage) return false
  else var storage = window.sessionStorage
  storage.clear()
}
// 修改数据
export const upDateData = (key, value) => {
  return setStore(key, value)
}
// 查询数据
export const queryData = (key) => {
  if (!window.sessionStorage) return false
  else var storage = window.sessionStorage
  return JSON.parse(storage.getItem(key))
}
export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
// 获取时分秒
export const hm = (date) => {
  let dateTime = new Date(date * 1000)
  let H = dateTime.getHours()
  let m = dateTime.getMinutes()
  if (m < 10) {
    m = '0' + m
  }
  if (H < 10) {
    H = '0' + H
  }
  return H.toString() + ':' + m.toString()
}
export const monthday = () => {
  let dateTime = new Date()
  let M = dateTime.getMonth() + 1
  let d = dateTime.getDate()
  if (M < 10) {
    M = '0' + M
  }
  if (d < 10) {
    d = '0' + d
  }
  return M + '月' + d + '日'
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

