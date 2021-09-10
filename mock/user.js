// 用户信息
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  // 原来你就是token啊
  'admin-token': {
    roles: ['admin'], // 应该是权限
    introduction: '我是一名超级管理员', // 介绍，不过没看到在哪里用到
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', // 用户头像
    name: 'Super Admin' // 在dashboard上展示的用户名
  },
  'editor-token': {
    roles: ['editor'], // 应该是权限
    introduction: '我是一名编辑人员', // 介绍，不过没看到在哪里用到
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', // 用户头像
    name: 'Normal Editor' // 在dashboard上展示的用户名
  }
}

module.exports = [
  // 用户登录
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // 模拟错误
      if (!token) {
        return {
          code: 60204,
          message: '帐户和密码不正确'
        }
      }
      // 成功
      return {
        code: 20000,
        data: token
      }
    }
  },

  // 获取用户信息
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // 模拟错误
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获取用户详细信息'
        }
      }
      // 成功
      return {
        code: 20000,
        data: info
      }
    }
  },

  // 用户登出
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      // 成功
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
