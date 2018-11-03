import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Entry from './views/entry/Index.vue'
import Agree from './views/entry/Agree.vue'
import Register from './views/register/Index.vue'
import Verify from './views/common/Verify.vue'
import PreAudit from './views/preAudit/Index.vue'
import User from './views/preAudit/User.vue'
import Info from './views/preAudit/Info.vue'
import Upload from './views/preAudit/Upload.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
          component: Register
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
      path: '/verify',
      name: 'verify',
      component: Verify,
      meta: { title: '在线预约资料填写'}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { title: '在线预约资料填写'}
    },
    {
      path: '/register/:id',
      name: 'register/:id',
      component: Register,
      meta: { title: '在线预约资料填写'}
    },
    {
      path: '/preAudit',
      name: 'preAudit',
      component: PreAudit,
      meta: { title: '申请登记事由'}
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { title: '申请人情况'}
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
      meta: { title: '证明文件'}
    },
    {
      path: '/info',
      name: 'info',
      component: Info,
      meta: { title: '不动产情况'}
    },
    {
      path: '/list',
      name: 'list',
      // route level code-splitting
      // this generates a separate chunk (list.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "list" */ './views/apply/List.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ './views/process/Search.vue')
    }
  ]
})
