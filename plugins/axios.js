import { Notify } from 'vant'
import Cookies from 'js-cookie'

const config = require('../base.config.js').default
const ERRORS = new Map([
  [400,'請求參數錯誤'],
  [401, '權限不足, 請重新登錄'],
  [403,'服務器拒絕本次訪問'],
  [404, '未找到對映的資源'],
  [500, '服務器異常...'],
  [501,'服務器不支持該請求中使用的方法'],
  [502,'網路錯誤'],
  [504,'網路異常']
])

export default function ({ $axios, redirect, store }, inject) {
  const timelinkerApi = $axios.create({
    headers: { Accept: 'application/json' }
  })

  timelinkerApi.timeout = 10000

  // const token = store.state.user.token
  const token = config.apiToken
  timelinkerApi.setToken(token, 'Bearer')

  timelinkerApi.onRequest(config => {
    const { baseURL, url, params, data, method } = config
    console.log(baseURL + url + (method === 'get' ? params : ''))
    if(method==='post'){
      console.log(data)
    }
    return config
  })

  timelinkerApi.onResponse((response) => {
    const { config, data, headers } = response
    const { token, errcode, errmsg } = data
    if (~config.url.indexOf('/login') && token) {
      Cookies.set('token',token , { expires: 7 })
    }
    if (errcode && errmsg) {
      Notify(errmsg)
    }
    return response
  })

  timelinkerApi.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (ERRORS.has(code)) {
      Notify('請求失敗-' + ERRORS.get(code) + error.response.statusText)
    } else {
      Notify(error.response.statusText)
    }
    return Promise.reject(error.response)
  })

  inject('timelinkerApi', timelinkerApi)
}