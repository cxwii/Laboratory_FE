import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入element，全部导入
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入路由
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/ssm_war/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
