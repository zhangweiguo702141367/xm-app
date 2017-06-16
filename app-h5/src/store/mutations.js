import * as types from '@/store/mutation-types'
import {
  setStore
} from '@/config/util/storageutil'

export default {
// 改变标题
  [types.CHANGE_TITLE] (state, title) {
    state.title = title
    setStore('title', title)
  }
}
