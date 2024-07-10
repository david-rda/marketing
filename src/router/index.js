import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import conductedView from '../views/auth/conductedView'
import viewView from '../views/auth/viewView'
import customerView from '../views/auth/customerView'
import customerViewParent from '../views/auth/customerViewParent'
import sentView from '@/views/auth/sentView'
import exhibitionsView from '@/views/auth/exhibitionsView'
import addExhibition from "@/views/auth/addExhibition"
import scheduleExhibitionView from '@/views/auth/scheduleExhibitionView'
import emailExhibitionView from '@/views/auth/emailExhibitionView'
import sendingExhibitionView from '@/views/auth/sendingExhibitionView'
import addTemplate from '@/views/auth/addTemplate'
import editTemplate from '@/views/auth/editTemplate'
import massiveSend from '@/views/auth/massiveSend'
import customerEdit from '@/views/auth/customerEdit'

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
    path: '/view/:id/:exhibition_id',
    name: 'viewView',
    component: viewView
  },
  {
    path: '/customer/:id',
    name: 'customerView',
    component: customerView
  },
  {
    path: '/customer/:id/:parent_id',
    name: 'customerViewParent',
    component: customerViewParent
  },
  {
    path: '/customer/edit/:id/',
    name: 'customerEdit',
    component: customerEdit
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
  {
    path: '/template/add/:id/:label',
    name: '/addTemplate',
    component: addTemplate
  },
  {
    path: '/template/edit/:id/:label',
    name: '/editTemplate',
    component: editTemplate
  },
  {
    path: '/massive/send',
    name: '/massiveSend',
    component: massiveSend
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
