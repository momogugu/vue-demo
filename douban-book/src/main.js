import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import router from './router'
import 'iview/dist/styles/iview.css'
import './assets/css/common.css'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

new Vue({
  el: '#body',
  router,
  components: {
    App
  },
  template: '<app></app>'
})
