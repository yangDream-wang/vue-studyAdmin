import {
  UPDATA_USER,
} from './final'
export default {
  /**
   * 在组件中是通过 this.$store.commit('updateUser', user);方法来调用, 这是同步操作(不推荐使用)
   * @param {user.state数据} state 
   * @param {携带的userInfo参数} userInfo 
   */
  [UPDATA_USER](state, userInfo) {
    state.userInfo = userInfo;
  }
}