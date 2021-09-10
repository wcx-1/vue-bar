import Cookies from 'js-cookie'
// 操作cookies里面的token，get、set、remove三方法，没啥说的
// TokenKey？干啥的？应该是写在cookie里面的
const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
