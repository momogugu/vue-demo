import VueRouter from 'vue-router'
import Index from './components/Index.vue'
import Cart from './components/Cart.vue'

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
        component: Index
    }, {
        path: '/index',
        component: Index
    }, {
        path: '/cart',
        component: Cart
    }]
})

export default router