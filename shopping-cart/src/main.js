import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './vuex/store'
import App from './App.vue'

Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})