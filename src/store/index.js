import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import business from './modules/business'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: { 
    // this.$store.state.user
    user,
    business
  }
});
