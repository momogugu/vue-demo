import axios from 'axios'

const actions = {
  registe({
    commit,
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      axios.post('/api/registe', {
        username: obj.username,
        nickname: obj.nickname,
        password: obj.password,
        description: obj.description
      }).then(response => {
        commit('registe_success', response.data)
        resolve()
      }).catch(error => {
        commit('registe_failed', error.response.data)
        reject()
      })
    })
  },
  login({
    commit,
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      axios.post('/api/login', {
        username: obj.username,
        password: obj.password
      }).then(response => {
        commit('login_success', response.data)
        resolve()
      }).catch(error => {
        commit('login_failed', error.response.data)
        reject()
      })
    })
  },
  getUserInfo({
    commit,
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      axios.get('/api/getUserInfo?username=' + obj.username).then(response => {
        commit('getUserInfo_success', response.data)
        resolve()
      }).catch(error => {
        commit('getUserInfo_failed', error.response.data)
      })
    })
  }
}

export default actions
