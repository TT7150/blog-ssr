

function getCookie (cookie, key) {
  let cookieList = cookie.split('; ')
  let keyInfo = cookieList.reduce((info, cookieItem) => {
    let [key, value] = cookieItem.split('=')
    info[key] = value
    return info
  }, {})
  return keyInfo[key] || ''
}

export function getToken () {
  if (process.server) {
    return getCookie(process.cookie, 'token')
  } else {
    return getCookie(document.cookie, 'token')
  }
}

export function setToken (token) {
  let date = new Date()
  date.setHours(date.getHours() + 24 * 30)
  document.cookie = `token=${token};expires=${date.toGMTString()}`
}

export function clearToken () {
  let date = new Date()
  date.setSeconds(date.getSeconds() - 1)
  document.cookie = `token='';expires=${date.toGMTString()}`
}

export function formatTime (timestamp, format = 'yyyy-MM-dd HH:mm') {
  const formatNum = num => {
    return String(num).padStart(2, '0')
  }
  const date = new Date(timestamp * 1000)
  return format.replace(/yyyy/g, date.getFullYear())
    .replace(/MM/g, formatNum(date.getMonth() + 1))
    .replace(/dd/g, formatNum(date.getDate()))
    .replace(/HH/g, formatNum(date.getHours()))
    .replace(/mm/g, formatNum(date.getMinutes()))
    .replace(/ss/g, formatNum(date.getSeconds()))
    .replace(/SSS/g, formatNum(date.getMilliseconds()))
}