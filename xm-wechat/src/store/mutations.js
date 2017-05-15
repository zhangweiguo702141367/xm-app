import * as types from '@/store/mutation-types'
import {
  setStore
} from '../config/mUtils'

export default {
// 改变标题
  [types.CHANGE_TITLE] (state, title) {
    state.title = title
    setStore('title', title)
  }
}
