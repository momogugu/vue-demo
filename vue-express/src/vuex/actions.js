import axios from 'axios'

const actions = {
  registe({
    commit,
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:3000/cart/123').then(response => {
        console.log(response)
      }).catch(response => {})
      //   axios.post('/api/registe', {
      //     username: obj.username,
      //     nickname: obj.nickname,
      //     password: obj.password,
      //     description: obj.description
      //   }).then(response => {

      //   }).catch(response => {

      //   })
    })
  }
}

export default actions
