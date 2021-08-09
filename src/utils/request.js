import axios from 'axios'
import router from '@/router'

const request = axios.create()

// 映射
const actionMapping = {
  get: 'view',
  post: 'add',
  put: 'edit',
  delete: 'delete'
}

//request.defaults.baseURL = 'http://192.168.0.104:8080/' // 注释掉之后调的接口将是Mock数据

/*
// 请求拦截器
request.interceptors.request.use(req => {
  // console.log(req.url)
  // console.log(req.method)
  if (req.url !== '/login' && req.url !== '/roles') {
    // 不是登录的请求 也不是获取权限的请求 则在请求头中加入token  不知道如何使用Mock来验证请求头中的token 故此处注释
    // req.headers.Authorization = sessionStorage.getItem('token')
    const action = actionMapping[req.method]
    // 判断非权限范围内的请求
    // console.log(router)
    const currentRight = router.currentRoute.meta
    // console.log(currentRight)
    if (currentRight && currentRight.indexOf(action) === -1) {
      // 没有权限
      alert('没有权限')
      return Promise.reject(new Error('没有权限'))
    }
  }
  return req
})
*/

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
　　// 对响应数据的操作
	//暂时没有需要添加的功能
　　return response;
}, function (error) {
　　// 对响应错误的操作
　　// 兼容处理超时时返回的404
　　if (responseError && responseError.response && responseError.response.status === 404) {
　　　　// 跳转到登录页
　　　　//router.push({ name: 'login' })
		alert('404错误！');
　　 }
});

// 响应拦截器
request.interceptors.response.use(res => {
  if (res.data.status === 401) {
	alert('401错误')
    router.push('/login')
    sessionStorage.clear()
    window.location.reload()
  }
  else if (res.data.status === 404){
	  alert('404错误！');
  }
  return res
})

export default request
