import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"
const business = {
  state: sessionStorage.getItem('businessState') ? JSON.parse(sessionStorage.getItem('businessState')) : {
    // userInfo: {
    //   token: null,
    //   username: null,
    //   avatarUrl: null
    // },
  },
  /**方法 */
  mutations,
  actions,
  getters,
};
export default business;