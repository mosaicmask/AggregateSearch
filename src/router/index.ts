//引入路由对象
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// 使用 nprogress 对路由跳转时做一个伪进度条
import NProgress from 'nprogress'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/index.vue')
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
