import {
  UPDATA_USER
} from './final'
export default {
  /**
   * updataUser 
   * 在组件中是通过 this.$store.dispatch('asyncUpdateUser', user).then(() => {}) 这是个异步操作(推荐使用)
   * @param {上下文} context 
   * @param {携带的参数} playload 
   */
  updataUser(context, playload) { 
    return new Promise((resalve, reject) => {
      context.commit(UPDATA_USER, playload)
      resalve(playload)
    })
  },
}