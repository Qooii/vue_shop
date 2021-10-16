import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 表示将要访问的路径
  // from 表示从那个路径跳转而来
  // nest 是一个函数，表示放行
  // next的两种用法：1.next() 放行 2.next('指定路径') 强制跳转到指定路径
  if(to.path === '/login'){
    return next()
  }
  else{
    // 获取 token
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr){
      return next('/login')
    }
    else{
      return next()
    }
  }

})

export default router