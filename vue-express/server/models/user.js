import UserModel from './schema/User'

const User = {
  getAuth(username, callback) {
    const query = {
      username: username
    }
    return UserModel.findOne(query, (error, docs) => {
      callback(error, docs)
    })
  },
  createUser(body, callback) {
    return UserModel.create(body, (error, docs) => {
      callback(error, docs)
    })
  },
  getInfo(query, callback) {
    return UserModel.findOne(query, {
      username: 1,
      nickname: 1,
      time: 1,
      description: 1
    }, (error, docs) => {
      callback(error, docs)
    })
  }
}

export default User
