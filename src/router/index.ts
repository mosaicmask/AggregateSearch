//引入路由对象
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { loginStatus } from '@/stores/loginStateStore'
// 使用 nprogress 对路由跳转时做一个伪进度条
import NProgress from 'nprogress'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/index.vue')
  },
  {
    path: '/concern',
    name: 'concern',
    component: () => import('../views/concern/concern.vue')
  },
  {
    path: '/concerning',
    name: 'concerning',
    component: () => import('../views/concerning/concerning.vue')
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('../views/landing/landing.vue')
  },
  {
    path: '/donation',
    name: 'donation',
    component: () => import('../views/donation/donation.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/register.vue')
  },
  {
    path: '/searchResults/:keyword',
    name: 'searchResults',
    component: () => import('../views/searchResults/searchResults.vue')
  },
  {
    path: '/personalCenter',
    name: 'personalCenter',
    component: () => import('../views/personalCenter/personalCenter.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/chat/chat.vue')
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: () => import('../views/issues/forgotPassword.vue')
  },
  {
    path: '/pricingTables',
    name: 'pricingTables',
    component: () => import('../views/pricingTables/pricingTables.vue')
  },
  {
    path: '/:catchAll(.*)', // 不识别的path自动匹配404
    component: () => import('../views/notFound.vue')
    // redirect: '/404',
    // children: [{ path: '/404', name: 'error', component: () => import('../views/notFound.vue') }]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // 1.如果访问的不是个人中心页面（无需权限），直接放行
  if (to.path !== '/personalCenter') return next()
  // 2.如果访问的是个人中心页面，先要获取isLogin
  const isLogin = loginStatus.isLogin
  // 2.1如果isLogin为空，强制跳转到登录页面；否则，直接放行
  if (!isLogin) {
    alert('请登录')
    return next('/landing')
  }
  next()
  await NProgress.start()
})

router.afterEach(async () => {
  await NProgress.done()
})

export default router
