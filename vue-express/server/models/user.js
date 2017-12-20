import UserModel from './schema/User'

const User = {
  getAuth(username, callback) {
    const query = {
      username: username
    }
    return UserModel.findOne(query, function (error, docs) {
      callback(error, docs)
    })
  },
  createUser(body, callback) {
    return UserModel.create(body, function (error, docs) {
      callback(error, docs)
    })
  }
}

export default User
