import mongoose from 'mongoose'

/**
 * 用户信息数据结构
 * username 用户名
 * nickname 昵称
 * password 密码
 * time 注册时间
 * description 自述
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  nickname: {
    type: String
  },
  password: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  }
})

export default mongoose.model('User', UserSchema)
