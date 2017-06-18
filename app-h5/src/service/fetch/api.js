import {fetch} from '@/config/util/fetch'

export default {
  isPhone (params) {
    return fetch('/inner/member/isPhone', params)
  },
  isRegister (params) {
    return fetch('/inner/member/isRegister', params)
  },
  login (params) {
    return fetch('/inner/member/phoneLogin', params)
  },
  getRegisterSmsCode (params) {
    return fetch('/inner/member/getRegisterSmsCode', params)
  },
  register (params) {
    return fetch('/inner/member/register', params)
  },
  // 用户手机号方式忘记密码发送短信
  getSmsCode (params) {
    return fetch('/inner/member/getSmsCode', params)
  },
  // 手机修改密码
  forgetPassword (params) {
    return fetch('/inner/member/forgetPassword', params)
  }
}
