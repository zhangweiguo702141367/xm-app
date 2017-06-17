// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fetch from '@/service/fetch/api'
import FastClick from 'fastclick'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueStar from 'vue-star'
import CircleMenu from 'vue-circle-menu'

Vue.component('CircleMenu', CircleMenu)
Vue.component('VueStar', VueStar)

Vue.use(MuseUI)
Vue.use(YDUI)
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
Vue.prototype.fetch = fetch
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
