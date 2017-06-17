import Vue from 'vue'
import Router from 'vue-router'
const hello = r => require.ensure([], () => r(require('@/components/Hello')), 'hello')
const login = r => require.ensure([], () => r(require('@/components/login/Login')), 'login')
const register = r => require.ensure([], () => r(require('@/components/login/Register')), 'register')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/hello',
      name: 'hello',
      component: hello
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
