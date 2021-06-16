import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'List',
    component: () => import('../views/PageList.vue')
  },
  {
    path: '/user/:id',
    name: 'userDetail',
    component: () => import('../views/PageUserDetails.vue')
  },

  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
