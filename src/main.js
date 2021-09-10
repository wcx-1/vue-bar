import Vue from 'vue'
// CSS重置的现代替代方案
import 'normalize.css/normalize.css'

// 引入element和element的css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 设定element-ui的语言
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
// 引入全局CSS
import '@/styles/index.scss'
// 引入App根组件
import App from './App'
// 引入Vuex
import store from './store'
// 引入路由
import router from './router'
// 全局引入图标
import '@/icons'
// 判断一下用户的权限能够进入哪个页面
import '@/permission'
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
// 这里是全局导入，以后可以改成按需导入，会小很多
Vue.use(ElementUI, { locale })
// 阻止显示生产模式的消息
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
