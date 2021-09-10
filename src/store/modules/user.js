import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// 存着当前的状态
const getDefaultState = () => {
  return {
    token: getToken(),
    // 下面这俩我怀疑是token里面的两个值，因为在下面有把token的值赋给这俩变量
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  // 整体重置
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 只改变token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 只改变name，应该是token的名字
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 只改变……化身？这是个啥？应该是token后面的值
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    // 在new Promise中，通过login调用了src\api的user.js中的login方法
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败，请重新登录')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户注销
  // 被layout里面的Navbar.vue调用
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 必须先删除token
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 必须先删除token
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // vuex中的store分模块管理，需要在store的index.js中引入各个模块，为了解决不同模块命名冲突的问题，
  // 将不同模块的namespaced: true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  namespaced: true,
  state,
  mutations,
  actions
}

