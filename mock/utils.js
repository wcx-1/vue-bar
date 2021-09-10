/**
 * 解析url用的
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  // 如果？后没有啥的话，就直接返回个空
  if (!search) {
    return {}
  }
  const obj = {}
  // 通过&来分割参数
  const searchArr = search.split('&')
  // 读出一个一个url里面的参数
  searchArr.forEach(v => {
    // indexOf() 方法对大小写敏感
    // 如果要检索的字符串值没有出现，则该方法返回-1
    const index = v.indexOf('=')
    // 如果里面确实有=
    if (index !== -1) {
      // 依据=分割字符串，name为参数名，val为参数值
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      // 按照key-value的形式放入obj
      obj[name] = val
    }
  })
  return obj
}

module.exports = {
  param2Obj
}
