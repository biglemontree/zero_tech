import Vue from 'vue'
import Router from 'vue-router'
import Entry from './views/entry/Index.vue'
import Agree from './views/entry/Agree.vue'
import Register from './views/register/Index.vue'
import Verify from './views/common/Verify.vue'
import PreAudit from './views/preAudit/Index.vue'
import User from './views/preAudit/User.vue'
import HouseInfo from './views/houseSearch/Info.vue'
import Upload from './views/preAudit/Upload.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/entry',
        //   component: Register
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
        meta: { title: '协议阅读'}
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify,
        meta: { title: '实名认证'}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { title: '在线预约'}
    },
    {
      path: '/register/:id',
      name: 'register/:id',
      component: Register,
        meta: { title: '预约详情'}
    },
    {
      path: '/preAudit',
      name: 'preAudit',
      component: PreAudit,
        meta: { title: '网上预审'}
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
      path: '/house-info',
        name: 'house-info',
        component: HouseInfo,
      meta: { title: '房产信息'}
    },
    {
      path: '/list',
      name: 'list',
        meta: { title: '我的预约' },
      component: () => import(/* webpackChunkName: "list" */ './views/apply/List.vue')
    },
    {
      path: '/my',
      name: 'my',
        meta: { title: '个人中心' },
      component: () => import(/* webpackChunkName: "center" */ './views/my/Center.vue')
    },
    {
      path: '/myAudit',
      name: 'myAudit',
        meta: { title: '我的预审' },
      component: () => import(/* webpackChunkName: "myAudit" */ './views/my/Audit.vue')
    },
    {
      path: '/search',
      name: 'search',
        meta: { title: '进度查询' },
      component: () => import(/* webpackChunkName: "search" */ './views/process/Search.vue')
    },
      {
          path: '/notice-list',
          name: 'notice-list',
          meta: { title: '通知公告' },
          component: () => import(/* webpackChunkName: "notice-list" */ './views/notice/Index.vue')
      },
      {
          path: '/notice-sec',
          name: 'notice-sec',
        //   meta: { title: '通知公告' },
          component: () => import(/* webpackChunkName: "notice-sec" */ './views/notice/SecType.vue')
      },
      {
          path: '/notice-detail',
          name: 'notice-detail',
        //   meta: { title: '通知公告' },
          component: () => import(/* webpackChunkName: "notice-detail" */ './views/notice/detail.vue')
      },
      {
          path: '/notice-lawyer',
          name: 'notice-lawyer',
          meta: { title: '政策法规' },
          component: () => import(/* webpackChunkName: "notice-lawyer" */ './views/notice/lawyer.vue')
      },
      {
          path: '/qa',
          name: 'qa',
          meta: { title: '业务知识' },
          component: () => import(/* webpackChunkName: "qa" */ './views/notice/qa.vue')
      },
      {
          path: '/house-search',
          name: 'house-search',
          meta: { title: '房产查询' },
          component: () => import(/* webpackChunkName: "house-search" */ './views/houseSearch/Index.vue')
      },
  ]
})
