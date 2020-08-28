/** 
 * api接口的统一出口
 */
// 模块接口
import login from './api/login';
import user from './api/user';
import roles from './api/roles'
// 其他模块的接口……

// 导出接口
export default {
  login, user, roles
  // ……
}