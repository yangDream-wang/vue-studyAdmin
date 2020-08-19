/**
 * npm install vue-router --save
 * keepAlive:true:需要缓存 false:不需要缓存
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/login/Login.vue')
const Home = () => import('../components/home/Home.vue')
const Users = () => import('../components/user/users.vue')
const A404 = () => import('../views/404')

Vue.use(VueRouter)

  const routes = [
    { path:'/', redirect:'/home' },
    // {
    //   path: '/login',
    //   component: Login,
    //   meta: {
    //     keepAlive: true
    //   },
    //   children: [
        
    //   ]
    // },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '请先登录',
        keepAlive: true
      }
    },
    {
      path: '/home',
      component: Home,
      children:[
        {
          path: '/',
          redirect: '/users'
        },
        {
          path:'/users',
          component:Users
        }
      ],
      meta: {
        title: '后台管理系统',
        keepAlive: true
      }
    },
    {
      path: '*',
      component: A404,
      meta: {
        title: '页面找不到了',
        keepAlive: true
      }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
/*******路由发生变化前***** */
// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   // 获取用户登录状态
//   let isLogin = localStorage.getItem("token");
  
//   // 如果请求的是登录页
//   if (to.path == '/login') {
//     if (isLogin != null) {
//       // 跳转到首页
//       next({
//         path: '/index'
//       });
//     }
//   }
//   next()
// })
/*********************************** */
export default router
