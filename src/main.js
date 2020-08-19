import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/********************************封装axios*/
/***/import request from './request'/*****/
/***/Vue.prototype.$request = request;/**/
/**********************************    */

/**************************封装filter过滤器********************************/
/***/import filter from './plugins/filter'/******************************/
/***/Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))/**/
/**********************************************************************/

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import './utils/dialog'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
