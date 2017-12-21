const mutations = {
  ['registe_success'](state, obj) {
    state.user.message = obj.message
  },
  ['registe_failed'](state, obj) {
    state.user.message = obj.message
  },
  ['login_success'](state, obj) {
    state.user.message = obj.message
    state.user.logined = true
  },
  ['login_failed'](state, obj) {
    state.user.message = obj.message
    state.user.logined = false
  }
}

export default mutations
