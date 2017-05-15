import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
  title: '首页'// 标题
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
