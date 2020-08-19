import axios from '../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const index = {
  /**banner图 */
  bannerList() {
    return axios.get(`/banner?type=0`);
  },
  /**推荐新歌 */
  newSong(limit= 10,page) {
    return axios.get(`/personalized/privatecontent/list?limit=${limit}&offset=${page}`);
  },
  mvAll() {
    return axios.get(`/personalized/mv`);
  },
  personalized(limit = 10, page) {
    return axios.get(`/personalized?limit=${limit}&offset=${page}`);
  },
}
const detail = {
  /**歌曲详情 */
  songDetail(id){
    return axios.get(`/song/detail?ids=347230`);
  }
}
export default {
  index, detail
};