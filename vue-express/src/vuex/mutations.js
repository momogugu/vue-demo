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
    state.user.nickname = obj.userinfo.nickname
    state.user.username = obj.userinfo.username
    state.user.time = obj.userinfo.time
    state.user.description = obj.userinfo.description
  },
  ['login_failed'](state, obj) {
    state.user.message = obj.message
    state.user.logined = false
  },
  ['logout_success'](state, obj) {
    state.user.message = obj.message
    state.user.logined = false
    state.user.nickname = ''
    state.user.username = ''
    state.user.time = ''
    state.user.description = ''
  },
  ['logout_failed'](state, obj) {
    state.user.message = '网络错误，未能成果退出登录'
    state.user.logined = true
  },
  ['getUserInfo_success'](state, obj) {
    state.user.message = obj.message
    state.user.nickname = obj.userinfo.nickname
    state.user.username = obj.userinfo.username
    state.user.time = obj.userinfo.time
    state.user.description = obj.userinfo.description
  },
  ['getUserInfo_failed'](state, obj) {
    state.user.message = obj.message
  },
}

export default mutations
