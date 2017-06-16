/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}
// 获取localStorage
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}
// 删除localStorage
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
// 清空数据
export const clearData = () => {
  if (!window.localStorage) return false
  else var storage = window.localStorage
  storage.clear()
}
// 修改数据
export const upDateData = (key, value) => {
  return setStore(key, value)
}
// 查询数据
export const queryData = (key) => {
  if (!window.localStorage) return false
  else var storage = window.localStorage
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
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

