//引入路由对象
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
    path: '/searchResults',
    name: 'searchResults',
    component: () => import('../views/searchResults/searchResults.vue')
  },
  {
    path: '/personalCenter',
    name: 'personalCenter',
    component: () => import('../views/personalCenter/personalCenter.vue')
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

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
