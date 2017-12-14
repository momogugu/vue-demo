import mongoConnection from './connection.js'
import server from '../server.js'

(async() => {
  try {
    await mongoConnection()
    console.log('数据库连接成功。')
  } catch (error) {
    console.log('error:' + error)
    return
  }
  // 开启http服务
  server.listen(3000, function () {
    console.log('listening on port 3000!');
  });
})()
