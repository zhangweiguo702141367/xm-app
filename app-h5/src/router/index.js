import Vue from 'vue'
import Router from 'vue-router'
const hello = r => require.ensure([], () => r(require('@/components/Hello')), 'hello')
// 登录
const login = r => require.ensure([], () => r(require('@/components/login/Login')), 'login')
// 注册
const register = r => require.ensure([], () => r(require('@/components/login/Register')), 'register')
// 未登录忘记密码公共页面
const commonforget = r => require.ensure([], () => r(require('@/components/login/forget/Common')), 'commonforget')
// 邮箱找回
const emailforget = r => require.ensure([], () => r(require('@/components/login/forget/Email')), 'emailforget')
// 手机号找回
const phoneforget = r => require.ensure([], () => r(require('@/components/login/forget/Phone')), 'phoneforget')
// 邮箱修改登录密码页
const emailChangePassword = r => require.ensure([], () => r(require('@/components/login/forget/EmailChangePassword')), 'emailChangePassword')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
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
    },
    {
      path: '/commonforget',
      name: 'commonforget',
      component: commonforget
    },
    {
      path: '/emailforget',
      name: 'emailforget',
      component: emailforget
    },
    {
      path: '/phoneforget',
      name: 'phoneforget',
      component: phoneforget
    },
    {
      path: '/emailpwd',
      name: 'emailChangePassword',
      component: emailChangePassword
    }
  ]
})
