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
  valid({
    commit,
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      axios.get('/api/valid', {
        headers: {
          'x-access-token': obj.token
        }
      }).then(response => {
        let data = response.data
        if (data.status === 'success') {
          commit('login_success', data)
          resolve()
        } else {
          commit('login_failed', data)
        }

      }).catch(error => {
        commit('login_failed', error.response.data)
      })
    })
  },
  logout({
    commit,
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      axios.post('/api/logout').then(response => {
        commit('logout_success', response.data)
        resolve()
      }).catch(error => {
        commit('logout_failed', error)
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
      }).catch(error => {
        commit('getUserInfo_failed', error.response.data)
      })
    })
  }
}

export default actions
