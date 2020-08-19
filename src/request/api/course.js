/**
 * course模块接口列表
 */
import axios from '../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const index = {
  // get 无参数   
  // articleList() {
  //   return axios.get(`${base.dm}/topics`);
  // },
  // get 有参数
  // articleDetail(id, params) {
  //   return axios.get(`${base.dm}/topic/${id}`, {
  //     params: params
  //   });
  // },
  // post提交 + qs序列化   
  // login(params) {
  //   return axios.post(`${base.dm}/accesstoken`, qs.stringify(params));
  // }


  // 其他接口…………
}
const detail = {
  banner_list(params){
    return axios.get(`/api/index/index`);
  }
}

export default {index,detail};