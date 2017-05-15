import Vue from 'vue'
import Router from 'vue-router'
const hello = r => require.ensure([], () => r(require('@/components/Hello')), 'hello')
const login = r => require.ensure([], () => r(require('@/components/login/Login')), 'login')
const register = r => require.ensure([], () => r(require('@/components/login/Register')), 'register')
const forgetpwd = r => require.ensure([], () => r(require('@/components/login/ForgetPwd')), 'forgetpwd')
const qqlogin = r => require.ensure([], () => r(require('@/components/login/QQLogin')), 'qqlogin')
const vxlogin = r => require.ensure([], () => r(require('@/components/login/VXLogin')), 'vxlogin')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: hello
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/forgetpwd',
      component: forgetpwd
    },
    {
      path: '/qqlogin',
      component: qqlogin
    },
    {
      path: '/vxlogin',
      component: vxlogin
    }
  ]
})
