import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import conductedView from '../views/auth/conductedView'
import viewView from '../views/auth/viewView'
import customerView from '../views/auth/customerView'
import sentView from '@/views/auth/sentView'
import exhibitionsView from '@/views/auth/exhibitionsView'
// import resendView from '@/views/auth/resendView'
import addExhibition from "@/views/auth/addExhibition"
import scheduleExhibitionView from '@/views/auth/scheduleExhibitionView'
import emailExhibitionView from '@/views/auth/emailExhibitionView'
import sendingExhibitionView from '@/views/auth/sendingExhibitionView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: login
  },
  {
    path: '/conducted',
    name: 'conductedView',
    component: conductedView
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
  // {
  //   path: '/resend',
  //   name: 'resendView',
  //   component: resendView
  // },
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
  {
    path: '/exhibition/sending/:id/:label',
    name: '/sendingExhibitionsView',
    component: sendingExhibitionView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
