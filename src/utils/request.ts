/**
 *
 * http配置
 */

 import axios from 'axios'
//  import Toast from 'vant/lib/toast'
//  import 'vant/lib/toast/style'
//  Toast.setDefaultOptions({
//    duration: 3000
//  })
 /** 创建拦截器实例 */
 const service = axios.create({
   baseURL: '',//process.env.VUE_APP_BASE_API, // url = base url + request url
   timeout: 60000,
   withCredentials: true
 })
 
 let Indicator = {}
 // http request 拦截器
 service.interceptors.request.use(
   config => {
    if(!config){
      config = {}
      ;return};
     const Authorization = localStorage.getItem('attend_Authorization')
     const userId = sessionStorage.getItem('userId')
    //  config.headers.version = 'dingtalk'
    //  if (Authorization && config.url.indexOf('/login') === -1) {
    //    config.headers.Authorization = Authorization
    //  }
    //  config.headers.userId = userId
    //  if (config.method === 'delete') {
    //    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    //    config.headers['Authorization'] = Authorization
    //  }
 
     if (config.headers&&config.headers['Content-Type'] && (config.headers['Content-Type']+'').indexOf('application/json') === 0) {
    //    Indicator = Toast.loading({
    //      message: '加载中...',
    //      forbidClick: true,
    //      duration: 0
    //    })
       return config
     }
     // console.log('config.url', config.url)
     if (Authorization && config.url&& config.url.indexOf('/login') === -1) {
       if (config.data !== '') {
         config.data += '&Authorization=' + Authorization
       } else {
         config.data += 'Authorization=' + Authorization
       }
     }
     // if (Authorization) {
     //   if (config.method === 'get') {
     //     config.params.Authorization = Authorization
     //   }
     // }
    //  Indicator = Toast.loading({
    //    message: '加载中...',
    //    forbidClick: true,
    //    duration: 0
    //  })
     return config
   },
   err => {
     return Promise.reject(err)
   })
 
 // http response 拦截器
 service.interceptors.response.use(
   response => {
    //  Indicator.clear && Indicator.clear() // loading 结束
     if (typeof response.data === 'string') {
       document.write(response.data)
     }
     // eslint-disable-next-line
     if (response.data && response.data.hasOwnProperty('errorCode') && response.data.errorCode == 1) {
       // eslint-disable-next-line
       if (response.data.hasOwnProperty('errorMessage')) {
        //  Toast(response.data.errorMessage)
         // 出错后抛出异常
         return Promise.reject(response.data.errorMessage)
       }
       return response
     }
     return response
   },
   err => {
    //  Indicator.clear && Indicator.clear() // 结束loading加载
     if (err && err.response) {
       switch (err.response.status) {
         case 400:
        //    Toast('请求错误(400)')
           // response.data.errorMessage
           break
 
         case 401:
        //    Toast('未授权，请登录(401)')
           break
 
         case 403:
        //    Toast('拒绝访问(403)')
           break
 
         case 404:
        //    Toast(`请求地址出错 ${err.response.config.url}`)
           break
 
         case 408:
        //    Toast('请求超时(408)')
           break
 
         case 500:
        //    Toast('服务器内部错误(500)')
           break
 
         case 501:
        //    Toast('服务未实现(501)')
           break
 
         case 502:
        //    Toast('网关错误(502)')
           break
 
         case 503:
        //    Toast('服务不可用(503)')
           break
 
         case 504:
        //    Toast('网关超时(504)')
           break
 
         case 505:
        //    Toast('HTTP版本不受支持(505)')
           break
 
         default:
       }
     }
 
     return Promise.reject(err)
   })
 
 export default service