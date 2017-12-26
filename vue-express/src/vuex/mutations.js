const mutations = {
  ['registe_success'](state, obj) {
    state.user.message = obj.message
  },
  ['registe_failed'](state, obj) {
    state.user.message = obj.message || '网络错误，请重试'
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
    state.user.message = obj.message || '网络错误，请重试'
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
    state.user.message = obj.message || '网络错误，请重试'
  },
  ['getAllGoods_success'](state, obj) {
    state.goods.message = obj.message
    state.goods.rows = [...obj.rows]
    state.goods.total = obj.total
    state.goods.status = obj.status
  },
  ['getAllGoods_failed'](state, obj) {
    state.user.message = obj.message || '网络错误，请重试'
  },
}

export default mutations
