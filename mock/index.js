const Mock = require('mockjs')
// 解析url用的方法
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')

// mock数据，有用户数据和表格数据
const mocks = [
  ...user,
  ...table
]

// 正面模拟
// 请谨慎使用，它将重新定义XMLHttpRequest，
// 这将导致许多第三方库无效（如progress event）
function mockXHR() {
  // 模拟补丁
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }
  // 将response数据重新包装成mock数据
  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      // instanceof运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上
      if (respond instanceof Function) {
        // 获取三大属性
        const { body, type, url } = options
        // 将这次url所求的所有属性存入result中
        result = respond({
          // type就是get或post
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        // 不存在的话就直接从mock里面取
        result = respond
      }
      // 最后把数据包装成mock
      return Mock.mock(result)
    }
  }
  // 把每一个数据包装成mock
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

