import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS重置的现代替代方案

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // 全局CSS

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // 全局引入图标
import '@/permission' // 判断一下用户的权限能够进入哪个页面
/**
*如果您不想使用mock-server
*您想将MockJs用于mockapi
*您可以执行：mockXHR（）
*
*目前，MockJs将用于生产环境，
*请在上网前将其删除！
*/
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// 这里我直接把local给改成中文了，以后想要改回英文回上面改
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
