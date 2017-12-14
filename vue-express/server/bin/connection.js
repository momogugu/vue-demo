import mongoose from 'mongoose'

// 连接mongodb数据库
export default async() => new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost/shopping', {
    useMongoClient: true
  }, (error) => {
    if (error) {
      reject(error.message)
    }
    resolve()
  })
})
