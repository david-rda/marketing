import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import dashboardView from '../views/auth/dashboardView'
import viewView from '../views/auth/viewView'
import customerView from '../views/auth/customerView'
import sendingView from '@/views/auth/sendingView'
import sentView from '@/views/auth/sentView'
import exhibitionsView from '@/views/auth/exhibitionsView'
import resendView from '@/views/auth/resendView'
import addExhibition from "@/views/auth/addExhibition"
import scheduleExhibitionView from '@/views/auth/scheduleExhibitionView'
import emailExhibitionView from '@/views/auth/emailExhibitionView'

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
    name: 'addview',
    component: 'addView'
  },
  {
    path: '/exhibitions',
    name: 'exhibitionsView',
    component: exhibitionsView
  },
  {
    path: '/exhibitions/add',
    name: 'addExhibitions',
    component: addExhibition
  },
  {
    path: '/resend',
    name: 'resendView',
    component: resendView
  },
  {
    path: '/exhibition/schedule/:id/:label',
    name: '/scheduleExhibitionView',
    component: scheduleExhibitionView
  },
  {
    path: '/exhibition/email/:id/:label',
    name: '/emailExhibitionView',
    component: emailExhibitionView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
