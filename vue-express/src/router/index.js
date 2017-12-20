import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Registe from '@/components/Registe'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'List',
    component: List
  }, {
    path: '/registe',
    name: 'Registe',
    component: Registe
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '*',
    name: 'NotFound',
    component: List
  }]
})
