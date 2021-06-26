import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import guanyu from '@/components/zhaxiang/guanyu'
import riqi from '@/components/zhaxiang/riqi'
import zuozhe from '@/components/zhaxiang/zuozhe'
import Welcome from '@/components/Welcome'
import Userlist from '@/components/Userlist'
import Qicailist from '@/components/Qicailist'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/guanyu', component: guanyu },
  { path: '/riqi', component: riqi },
  { path: '/zuozhe', component: zuozhe },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/userlist', component: Userlist },
      { path: '/qicailist', component: Qicailist }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
