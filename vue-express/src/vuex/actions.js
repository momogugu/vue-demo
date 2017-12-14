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

      }).catch(response => {

      })
    })
  }
}

export default actions
