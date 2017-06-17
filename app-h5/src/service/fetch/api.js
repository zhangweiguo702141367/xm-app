import {fetch} from '@/config/util/fetch'

export default {
  isPhone (params) {
    return fetch('/inner/member/isPhone', params)
  },
  login (params) {
    return fetch('/inner/member/phoneLogin', params)
  },
  getRegisterSmsCode (params) {
    return fetch('/inner/member/getRegisterSmsCode', params)
  },
  register (params) {
    return fetch('/inner/member/register', params)
  }
}
