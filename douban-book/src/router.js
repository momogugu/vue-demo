import VueRouter from 'vue-router'
import Index from './components/Index.vue'
import BookDetail from './components/BookDetail.vue'
import Search from './components/Search.vue'
import AnnotationDetail from './components/AnnotationDetail.vue'
import NotFound from './components/NotFound.vue'

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
    path: '/',
    redirect: '/book'
  }, {
    path: '/book',
    component: Index
  }, {
    path: '/book/:id',
    component: BookDetail
  }, {
    path: '/search/:q',
    component: Search
  }, {
    path: 'search/series/:id',
    component: Search
  }, {
    path: '/annotation/:id',
    component: AnnotationDetail
  }, {
    path: '*',
    component: NotFound
  }]
})

export default router
