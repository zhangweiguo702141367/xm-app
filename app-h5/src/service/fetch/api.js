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
  },
   // 邮箱方式(发送邮件)修改密码
  emailForgetPassword (params) {
    return fetch('/inner/member/emailForgetPassword', params)
  },
   // 邮箱方式(修改密码)修改密码
  emailChangePassword (params) {
    return fetch('/inner/member/emailChangePassword', params)
  },
  // 获取用户所在地天气情况
  getWeather (params) {
    return fetch('/inner/member/getWeather', params)
  }
}
