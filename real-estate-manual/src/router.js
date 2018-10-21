import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Entry from './views/entry/Index.vue'
import Agree from './views/entry/Agree.vue'
import Register from './views/register/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/entry',
      name: 'entry',
      component: Entry,
      meta: { title: '在线预约'}
    },
    {
      path: '/agree',
      name: 'agree',
      component: Agree,
      meta: { title: '在线预约协议'}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { title: '在线预约资料填写'}
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
