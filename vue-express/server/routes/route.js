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
router.post('/registe', function (req, res) {
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

export default router
