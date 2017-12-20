import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import routes from './routes/route.js'
let app = express();

// 加载cookie-parser中间件
app.use(cookieParser())
// 加载logger中间件，log访问记录
app.use(logger('dev'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())
// 路由配置
app.use('/api', routes)

export default app
