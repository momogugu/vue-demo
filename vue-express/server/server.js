import express from 'express'
import cookieParser from 'cookie-parser'
import routes from './routes/route.js'
let app = express();

// 加载cookie-parser中间件
app.use(cookieParser())
routes(app)

export default app
