import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000 // 请求超时
})

// request拦截器
// 该拦截器主要在有request时，如果在store中存储有token则在headers中带上x-Token
// 实际这个拦截器中直接return config即可，然后在登录完成后，访问其他页面的时候带上token访问。
service.interceptors.request.use(
  config => {
    // 在 request 发送前做点什么

    if (store.getters.token) {
      // 让每个 request 带着 token
      // ['X-Token'] is a custom headers key
      // 请根据实际情况进行修改
      // 这里用了utils下面的auth.js里面的getToken函数
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理 request 错误
    console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果你想要得到 http 信息，比如 headers 或 status
   * 就return  response => response
  */

  /**
   * 通过自定义代码确定请求状态
   * 这只是个例子
   * 你也可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data

    // 如果自定义代码不是20000，则判断为错误
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 非法token; 50012: 其他客户端已登录; 50014: Token过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm('您已注销，可以取消以停留在此页面，或重新登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: '警告'
        }).then(() => {
          // 然后就要重置token
          store.dispatch('user/resetToken').then(() => {
            // 然后重新加载
            location.reload()
          })
        })
      }
      // 返回错误信息
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 返回结果
      return res
    }
  },
  error => {
    console.log('err' + error) // 用于调试
    Message({
      message: error.message,
      type: 'error',
      // 应该是等待5秒
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
