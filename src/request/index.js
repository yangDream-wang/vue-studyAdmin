/** 
 * api接口的统一出口
 */
// 模块接口
import course from './api/course';
import mtnhao from './api/mtnhao';
import login from './api/login';
import user from './api/user';
// 其他模块的接口……

// 导出接口
export default {
  course, mtnhao,
  login,user
  // ……
}