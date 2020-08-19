/**计算属性 */
export default {
  /**
   * getUser 在组件中是通过 this.$store.getters.getUser 来获取
   * @param {user.state参数} state 
   */
  getUser(state) {
    return state.userInfo;
  }
}