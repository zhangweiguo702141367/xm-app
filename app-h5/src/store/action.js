import * as types from '@/store/mutation-types'

export default {
  changeTitile ({commit}, title) {
    commit(types.CHANGE_TITLE, title)
  },
  setLoginUrl ({commit}, nextUrl) {
    commit(types.NEXT_URL, nextUrl)
  }
}
