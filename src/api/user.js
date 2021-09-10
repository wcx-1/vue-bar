import request from '@/utils/request'
// utils中的request.js很重要。该方法创建axios实例、request拦截器、response 拦截器。

// 登录信息的来源
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}
// 用户信息的来源
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}
// 等处信息的来源
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
