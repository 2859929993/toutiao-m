/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

//  JSON.parse()
//  JSON.stringify()

// 上面和下面作用是一样的 区别在于：
// JSONBig可以处理超出 JavaScript 安全整数范围的问题，即可以处理大数字问题
//  JSONBig.parse()  把JSON格式的字符串 转换为 JavaScript对象
//  JSONBig.stringify()  把JavaScript对象 转换为 JSON格式的字符串

const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://ttapi.research.itcast.cn/',
  // baseURL: 'http://toutiao-app.itheima.net/',
  // baseURL: 'http://geek.itheima.net/',

  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }

    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config：本次请求的请求配置对象
  // console.log(config);
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.log(config);
  // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错了（还没有发出去）会进入这里
  return Promise.reject(error)
})

// 响应拦截器

export default request
