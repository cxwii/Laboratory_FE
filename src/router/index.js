import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import guanyu from '@/components/zhaxiang/guanyu'
import riqi from '@/components/zhaxiang/riqi'
import zuozhe from '@/components/zhaxiang/zuozhe'
import Welcome from '@/components/Welcome'
import Userlist from '@/components/Userlist'
import quanxian from '@/components/quanxian'
import Qicailist from '@/components/Qicailist'
import qicaijieyue from '@/components/qicaijieyue'
import jieyuelist from '@/components/jieyuelist'
import jhsj from '@/components/jhsj'
import htsj from '@/components/htsj'

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
      { path: '/quanxian', component: quanxian },
      { path: '/qicailist', component: Qicailist },
      { path: '/qicaijieyue', component: qicaijieyue },
      { path: '/jieyuelist', component: jieyuelist },
      { path: '/jhsj', component: jhsj },
      { path: '/htsj', component: htsj }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
