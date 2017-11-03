import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './acticons'

Vue.use(Vuex)

import {
    CHANGE_STYLE,
    CHANGE_PRICE,
    ADD_ITEM,
    REMOVE_ITEM
} from './mutation-types'

// mutations
const mutations = {
    [CHANGE_PRICE](state, obj) {
        state.iPhone6s.price = obj.price
        state.iPhone6s.activeStorage = obj.storage
        state.iPhone6s.isSelected = false
    },
    [CHANGE_STYLE](state, obj) {
        state.iPhone6s.activeStyleUrl = obj.styleUrl
        state.iPhone6s.activeStyle = obj.styleName
    },
    [ADD_ITEM](state) {
        const activeStyle = state.iPhone6s.activeStyle == undefined ? '银色' : state.iPhone6s.activeStyle
        const type = activeStyle + ',' + state.iPhone6s.activeStorage
        const cartInfo = {
            type: type,
            count: 1,
            price: state.iPhone6s.price
        }
        state.cart.push(cartInfo)
    },
    [REMOVE_ITEM](state, item) {
        let index = state.cart.indexOf(item)
        state.cart.splice(index, 1)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})