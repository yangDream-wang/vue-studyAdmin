/**
 * npm install vue-router --save
 * keepAlive:true:需要缓存 false:不需要缓存
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/login/Login.vue')
const Home = () => import('../components/home/Home.vue')
const Users = () => import('../components/user/users.vue')
const Rights = () => import('../components/roles/Rights.vue')
const Roles = () => import('../components/roles/Role.vue')
const Node = () => import('../components/roles/Node.vue')
const A404 = () => import('../views/404')

Vue.use(VueRouter)

  const routes = [
    { path:'/', redirect:'/Home' },
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
          component:Users,
          meta: {
            title: '用户列表',
            keepAlive: true
          }
        },
        {
          path: '/rights',
          component: Rights,
          meta: {
            title: '权限列表',
            keepAlive: true
          }
        },
        {
          path: '/roles',
          component: Roles,
          meta: {
            title: '角色列表',
            keepAlive: true
          }
        },
        {
          path: '/node',
          component: Node,
          meta: {
            title: '节点列表',
            keepAlive: true
          }
        },
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
/*******路由生效前***** */
router.beforeEach((to, from, next) => {
  // 获取用户登录状态
  const token = sessionStorage.getItem('token')
  if (to.path != '/login'){
    if (!token) {
      next({path:'/login'})
    }
  }
  // 如果请求的是登录页
  if (to.path == '/login') {
    if (token) {
      next({path: '/home'});
    }
  }
  next()
})
/*********************************** */
export default router
