import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import dashboardView from '../views/auth/dashboardView'
import viewView from '../views/auth/viewView'
import customerView from '../views/auth/customerView'
import sendingView from '@/views/auth/sendingView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: login
  },
  {
    path: '/dashboard',
    name: 'dashboardView',
    component: dashboardView
  },
  {
    path: '/view/:id',
    name: 'viewView',
    component: viewView
  },
  {
    path: '/customer/:id',
    name: 'customerView',
    component: customerView
  },
  {
    path: '/sending',
    name: 'sendingView',
    component: sendingView
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
