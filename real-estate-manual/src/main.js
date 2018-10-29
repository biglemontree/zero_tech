import Vue from 'vue'
// import 'weui';
// import weui from 'weui.js'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/base.css'

// Vue.use(weui)
// Vue.prototype.weui = weui
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
