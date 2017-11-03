const actions = {
    changeStyle({
        commit,
        state
    }, obj) {
        commit('CHANGE_STYLE', obj)
    },
    addItem({
        commit,
        state
    }) {
        commit('ADD_ITEM')
    },
    changePrice({
        commit,
        state
    }, obj) {
        commit('CHANGE_PRICE', obj)
    },
    removeItem({
        commit,
        state
    }, item) {
        commit('REMOVE_ITEM', item)
    }
}

export default actions