import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"
const user = {
  state : sessionStorage.getItem('userState') ? JSON.parse(sessionStorage.getItem('userState')) : {
    userInfo: {
      token: null,
      username: null,
      avatarUrl: null
    },
  },
  /**方法 */
  mutations,
  actions,
  getters,
};
export default user;