import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import dashboardView from '../views/auth/dashboardView'
import viewView from '../views/auth/viewView'
import customerView from '../views/auth/customerView'
import sendingView from '@/views/auth/sendingView'
import sentView from '@/views/auth/sentView'
import addView from '@/views/auth/addView'

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
  {
    path: '/sent',
    name: 'sentView',
    component: sentView
    
  },
  {
    path: '/add',
    name: 'addView',
    component: 'addView'
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
