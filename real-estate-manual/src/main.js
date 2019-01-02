import Vue from 'vue'
import storage from 'store'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/base.css'
import weui from 'weui';
Vue.use(weui)
Vue.prototype.weui = weui
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.name==='agree') {
    //   store.state.from = from
    console.log(from)
    
      storage.set('from', from.path)
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
