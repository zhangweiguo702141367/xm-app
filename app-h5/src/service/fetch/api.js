import {fetch} from '@/config/util/fetch'

export default {
  Login (params) {
    return fetch('/inner/member/isPhone', params)
  }
}
