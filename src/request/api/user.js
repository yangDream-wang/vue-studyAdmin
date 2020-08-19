/**
 * 用户模块接口列表
 */
import axios from '../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

// post提交 + qs序列化   
function getUsers(params) {
  return axios.get(`users`, { params: params })
}
function getUserInfo(params) {
  return axios.get(`users/${params.id}`)
}
function updateUsers(params) {
  return axios.put(`users/${params.id}`, qs.stringify(params))
}
function updateUsersStatus(params) {
  return axios.put(`users/${params.id}/state/${params.mg_state}`, qs.stringify(params))
}
function addUsers(params) {
  return axios.post(`users`, qs.stringify(params))
}
function deleteUsers(params) {
  return axios.delete(`users/${params.id}`)
}
function getRoles(params) {
  return axios.get(`roles`)
}
function setUserRole(params) {
  return axios.put(`users/${params.id}/role`, qs.stringify(params))
}
export default {
  getUsers, getUserInfo, updateUsers, addUsers, deleteUsers, updateUsersStatus, getRoles, setUserRole
}