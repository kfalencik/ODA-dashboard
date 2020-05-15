import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    // Lazy load component on route change
    component: () => import( '../views/History.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    // Lazy load component on route change
    component: () => import( '../views/Statistics.vue')
  },
  {
    path: '/queries',
    name: 'Queries',
    // Lazy load component on route change
    component: () => import( '../views/Queries.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
