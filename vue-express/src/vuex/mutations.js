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
  },
  ['getUserInfo_success'](state, obj) {
    state.user.message = obj.message
    state.user.nickname = obj.userinfo.nickname
    state.user.username = obj.userinfo.username
    state.user.time = obj.userinfo.time
    state.user.description = obj.userinfo.description
  },
  ['login_failed'](state, obj) {
    state.user.message = obj.message
  },
}

export default mutations
