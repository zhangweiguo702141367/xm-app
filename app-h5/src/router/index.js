import Vue from 'vue'
import Router from 'vue-router'
const hello = r => require.ensure([], () => r(require('@/components/Hello')), 'hello')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: hello
    }
  ]
})
