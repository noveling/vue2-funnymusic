import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import FirstClick from "fastclick"

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

/* eslint-disable no-new */
import "@/assets/css/base.css";
import "@/assets/iconfont/iconfont.css"
/* 导入mint样式 */
import 'mint-ui/lib/style.css'

import "@/mock" //模拟数据

// 使用第三方
import MintUI, { Indicator, Toast } from 'mint-ui'
Vue.use(MintUI)
Vue.prototype.$indicator = Indicator
Vue.prototype.$toast = Toast

// 解决移动端延时
FirstClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

