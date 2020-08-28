/**
 * 权限模块接口列表
 */
import axios from '../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

function getRights(params) {
  return axios.get(`rights/${params.type}`)
}
function getRloes(params) {
  return axios.get(`roles`)
}
function deleteRight(params) {
  return axios.delete(`roles/${params.id}/rights/${params.rightId}`)
}
function setRoles(params){
  return axios.post(`roles/${params.roleId}/rights`, qs.stringify(params))
}
export default {
  getRights, getRloes, deleteRight, setRoles
}