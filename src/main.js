import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

// 给$bus赋值为一个vue实例
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
