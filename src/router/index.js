import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views//Register'
import Login from '../views/Login'
import UserInfo from '../views//UserInfo'
import Edit from '../views/Edit'
import Home from '../views/Home'
import Article from '../views/Article'
import EditCategory from '../views/EditCategory'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/userinfo',
    component: UserInfo,
    meta: {
      isToken: true
    }
  },
  {
    path: '/edit',
    component: Edit,
    meta: {
      isToken: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      isKeepAlive: true
    }
  },
  {
    path: '/article/:id',
    component: Article
  },
  {
    path: '/editCategory',
    component: EditCategory
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  if ((!localStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.isToken) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

export default router
