export const urlParamObj = strParame => {
  // 获取url中"?"符后的字串
  let url = decodeURI(window.location.href)
  let theRequest = {}
  if (url.indexOf('?') !== -1) {
    let idx = url.indexOf('?') + 1
    let str = url.substr(idx)
    let strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1])
    }
  }
  return theRequest[strParame]
}
