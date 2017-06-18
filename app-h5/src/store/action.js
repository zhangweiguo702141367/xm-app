import * as types from '@/store/mutation-types'

export default {
  changeTitile ({commit}, title) {
    commit(types.CHANGE_TITLE, title)
  },
  setLoginUrl ({commit}, nextUrl) {
    commit(types.SET_NEXT_URL, nextUrl)
  },
  setLoginName ({commit}, loginname) {
    commit(types.SET_FORGET_LOGIN_NAME, loginname)
  }
}
