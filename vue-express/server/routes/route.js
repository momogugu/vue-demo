import express from 'express'
import db from '../models/index'

const router = express.Router()
const {
  User
} = db

router.get('/cart/:username', function (req, res) {
  res.send('Hello World!')
})

// 用户注册
router.post('/registe', (req, res) => {
  const body = req.body
  const {
    username
  } = body
  User.getAuth(username, (err, result) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: '网络异常，注册失败'
      })
      return false
    } else if (result) {
      res.status(401).send({
        status: 'existed',
        message: '该邮箱已被注册'
      })
      return false
    } else {
      User.createUser(body, (err, result) => {
        if (err) {
          res.status(500).send({
            status: 'error',
            message: '网络异常，注册失败'
          })
        }
        res.status(200).send({
          status: 'success',
          message: '注册成功'
        })
      })
    }
  })
})

// 用户登录
router.post('/login', (req, res) => {
  const body = req.body
  const {
    username,
    password
  } = body
  User.getAuth(username, (err, result) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: '网络异常，登录失败'
      })
      return false
    } else {
      if (!result) {
        res.status(401).send({
          status: 'error',
          message: '用户名不存在'
        })
        return false
      }
      if (result.password !== password) {
        res.status(401).send({
          status: 'error',
          message: '密码错误'
        })
        return false
      }
      res.status(200).send({
        status: 'success',
        message: '登录成功'
      })
      return false
    }
  })
})

// 获取用户信息
router.get('/getUserInfo', (req, res) => {
  const query = req.query
  User.getInfo(query, (err, result) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: '网络异常，获取用户信息失败'
      })
      return false
    } else if (result) {
      res.send({
        status: 'success',
        message: '已获取用户信息',
        userinfo: result
      })
    }
  })
})

export default router
