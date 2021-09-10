/**
 * 将时间解析为字符串后返回
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  // 如果为空的话就直接返回null
  if (arguments.length === 0 || !time) {
    return null
  }
  // 要么指定格式，要么默认格式
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // 支持"1548221490638"类型的时间戳
        time = parseInt(time)
      } else {
        // 支持safari时间格式
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    // 这是个什么奇怪的时间格式？数字类型长度等于10，还要乘以1000？我猜是10位的秒级时间戳，乘以1000变成毫秒级时间戳
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  // 通过上面的操作成功的获取到了格式化的时间，然后将时间转换为下面的对象
  // 年月日时分秒星期
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // 注意：getDay()在星期天返回0，所以一周从周日开始
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  // 返回时间字符串
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  // 强制类型转换成字符串后如果是秒级就改成毫秒级
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    // 一种强制类型转换吗？这是转换成什么类型？
    time = +time
  }
  // 时间戳
  const d = new Date(time)
  const now = Date.now()

  // 变成秒级
  const diff = (now - d) / 1000

  // 少于30秒
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // 少于1小时
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  // 把起始时间转换成字符串
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
// 似乎……是获取url传值时的各个参数
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
