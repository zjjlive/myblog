import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //可以起一个别名
    alias:'/home_page',
    //给路由命名
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  //登录
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('../views/SignIn.vue')
  },
  //动态路由
  {
    path:'/argu/:name',
    name:'Argu',
    component:() => import('../views/Argu.vue')
  },
  // 嵌套路由的方式
  {
    path:'/parent',
    name:'Parent',
    component:() => import('../views/Parent.vue'),
    children:[
      {
        path:'child',
        component:() => import('../views/Child.vue')
      }
    ]
  },
  // 命名路由，加载多个组件
  {
    path:'/named_view',
    components:{
      //加载多个组件
      default:() => import('../views/Child.vue'),
      email:() => import('../views/Email.vue'),
      tel:() => import('../views/Tel.vue')
    }
  },
  //路由的重定向
  {
    path:'/main',
    // redirect:'/'
    // redirect:{
    //   name:'Home'
    // }
    // redirect: to => {
    //   return {
    //     name:'Home'
    //   }
    // }
    // redirect: to => {
    //   return '/'
    // }
    redirect: to => '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
