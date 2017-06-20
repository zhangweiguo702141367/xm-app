import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import * as storage from '@/config/util/storageutil'
// 首页
const index = r => require.ensure([], () => r(require('@/components/Index')), 'index')
// hello
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
// 页面刷新时，重新赋值token
if (storage.getStore('loginurl')) {
  store.commit('SET_NEXT_URL', storage.getStore('loginurl'))
}
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/hello',
      name: 'hello',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
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
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    store.commit('SET_NEXT_URL', to.fullPath)
    // 如果需要登录的页面用户已登录
    if (storage.getStore('loginstatus') && storage.getStore('loginstatus') === 'ok') {
      next()
    } else { // 没登录则跳转到登录界面
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
export default router

