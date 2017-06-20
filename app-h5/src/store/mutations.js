import * as types from '@/store/mutation-types'
import {
  setStore
} from '@/config/util/storageutil'

export default {
// 改变标题
  [types.CHANGE_TITLE] (state, title) {
    state.title = title
    setStore('title', title)
  },
  [types.SET_NEXT_URL] (state, nexturl) {
    state.loginurl = nexturl
    setStore('loginurl', nexturl)
  },
  [types.SET_FORGET_LOGIN_NAME] (state, loginname) {
    state.loginname = loginname
    setStore('loginname', loginname)
  }
}
