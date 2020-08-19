/**
 * 1.安装axios
 * 2.安装qs
 */
import axios from 'axios'; // 引入axios
import base from './base'; // 导入接口域名列表
import router from '../router/index';
import store from '../store/index';

/** 环境的切换 development:开发环境 debug:测试环境 production:线上生产环境*/
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = `${base.dp}`;
}else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = `${base.pt}`;
}


// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 5
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。 
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => res.status == 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    // const {
    //   response
    // } = error;
    // if (response) {
    //   // 请求已发出，但是不在2xx的范围 
    //   errorHandle(response.status, response.data.message);
    //   return Promise.reject(response);
    // } else {
    //   // 处理断网的情况
    //   // eg:请求超时或断网时，更新state的network状态
    //   // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    //   // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    //   if (!window.navigator.onLine) {
    //     store.commit('changeNetwork', false);
    //   } else {
    //     return Promise.reject(error);
    //   }
    // }
  });

export default instance;
