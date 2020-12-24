import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/entry',
    name: 'entry',
    component: () => import(/* webpackChunkName: "entry" */ '../views/entry/Agree.vue'),
    meta: { title: '在线预约'}
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import(/* webpackChunkName: "Verify" */ '../views/Verify.vue'),
    meta: { title: '在线预约'}
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import(/* webpackChunkName: "upload" */ '../views/Upload.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
