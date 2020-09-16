import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import http from '../http'
import vant, { Toast } from 'vant'

// 将http里面封装的方法挂载到vue的原型上
Vue.prototype.$http = http
Vue.prototype.$msg = Toast

Vue.use(vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
