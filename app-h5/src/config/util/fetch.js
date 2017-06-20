import axios from 'axios'
import qs from 'qs'
import * as storage from '@/config/util/storageutil'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.baseURL = 'http://www.lxiaomei.com'
axios.defaults.baseURL = 'http://h5jr.jr.baihe.com:20000'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
     // _.toast("错误的传参", 'fail')
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.status === 200) {
// _.toast(res.data.msg)
    if (res.data.status !== 206) {
      storage.setStore('loginstatus', 'ok')
    } else {
      storage.setStore('loginstatus', 'no login')
    }
    return res
  } else {
    return Promise.reject(res)
  }
}, (error) => {
// _.toast("网络异常", 'fail')
  return Promise.reject(error)
})

export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
    .then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
