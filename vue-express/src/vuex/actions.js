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
  }
}

export default actions
