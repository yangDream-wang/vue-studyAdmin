/**
 * login模块接口列表
 */
import axios from '../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

// post提交 + qs序列化   
function login(params) {
  return axios.post(`login`, qs.stringify(params));
}
export default{
  login,
} 