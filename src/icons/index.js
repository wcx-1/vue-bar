import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// 全局注册
Vue.component('svg-icon', SvgIcon)

// require.context 是 Webpack 提供的 API，三个参数的含义分别是：引入资源的目录、是否需要遍历子目录、匹配文件的规则
const req = require.context('./svg', false, /\.svg$/)
// map(requireContext) 意思是每次遍历调用 requireContext 这个函数，并把数组中的第一项传递给 requireContext 函数中
const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req) 得到的是一个解析完毕后的数组，不过这里这个数组并没有被使用到！
requireAll(req)

// 以上两行代码等价于
// req.keys().forEach(key => req(key))
