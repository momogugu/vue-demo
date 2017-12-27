import express from 'express'
import moment from 'moment';
import webtoken, {
  decode
} from 'jsonwebtoken';
import db from '../models/index'

const router = express.Router()
const {
  User,
  Goods,
  Cart
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
      User.getInfo({
        username: username
      }, (err, result) => {
        if (result) {
          let userInfo = result
          let playload = {
            user: userInfo
          };
          let expires = moment().add(7, 'days').valueOf();
          let token = webtoken.sign(playload, 'keys', {
            issuer: userInfo._id.toString(),
            expiresIn: expires
          });
          res.cookie('jwt', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000
          })
          res.status(200).send({
            status: 'success',
            message: '登录成功',
            token,
            userinfo: userInfo
          })
        }
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

// 验证用户信息
router.get('/valid', (req, res) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    webtoken.verify(token, 'keys', (err, decoded) => {
      if (err) {
        res.status(403).send({
          status: 'error',
          message: 'token信息错误，请重新登录'
        })
        return false
      } else {
        if (decoded.exp <= Date.now()) {
          res.status(200).send({
            status: 'outdate',
            message: '登录状态已过期，请重新登录'
          })
          return false
        } else {
          res.status(200).send({
            status: 'success',
            message: '登录成功',
            token,
            userinfo: decoded.user
          })
        }
      }
    })
  } else {
    res.status(403).send({
      status: 'error',
      message: '用户未登录'
    })
  }
})

// 用户退出登录
router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 1
  })
  res.status(200).send({
    status: 'success',
    message: '用户已退出登录'
  })
})

// 获取所有商品信息
router.get('/goods', (req, res) => {
  Goods.getAll((err, result) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: '网络异常，获取商品信息失败'
      })
      return false
    } else {
      if (result) {
        res.status(200).send({
          status: 'success',
          message: '已获取商品信息',
          rows: result,
          total: result.length
        })
        return false
      }
      res.status(200).send({
        status: 'zero',
        message: '暂无商品信息',
        rows: [],
        total: 0
      })
      return false
    }
  })
})

// 获取某商品信息
router.get('/goods/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const query = {
    brand_id: id
  }
  Goods.getDetail(query, (err, result) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: '网络异常，获取商品信息失败'
      })
      return false
    } else {
      if (result) {
        res.status(200).send({
          status: 'success',
          message: '已获取商品信息',
          result
        })
        return false
      }
      res.status(200).send({
        status: 'none',
        message: '未找到该商品'
      })
      return false
    }
  })
})

// 加入购物车
router.post('/addCart', (req, res) => {
  const body = req.body
  const {
    username,
    brand_id
  } = body;
  const query = {
    username: username,
    brand_id: brand_id
  }
  Cart.getOne(query, (err, result) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: '网络异常，加入购物车失败'
      })
      return false
    } else {
      if (!result) {
        body.cart_num = 1
        body.cart_isSelect = false
        Cart.addCart(body, (error, docs) => {
          if (err) {
            res.status(500).send({
              status: 'error',
              message: '网络异常，加入购物车失败'
            })
            return false
          }
          res.status(200).send({
            status: 'success',
            message: '加入购物车成功'
          })
          return false
        })
      } else {
        let num = result.cart_num + 1
        let update = {
          $set: {
            cart_num: num
          }
        }
        Cart.updateOne(query, update, (error, docs) => {
          if (err) {
            res.status(500).send({
              status: 'error',
              message: '网络异常，加入购物车失败'
            })
          }
          res.status(200).send({
            status: 'success',
            message: '加入购物车成功'
          })
          return false
        })
      }
    }
  })
})

// 获取某个用户的购物车信息
router.get('/getCart', (req, res) => {
  const query = req.query
  Cart.getCart(query, (err, result) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: '网络异常，获取购物车信息失败'
      })
    } else {
      res.status(200).send({
        status: 'success',
        message: '已获取购物车信息',
        rows: result
      })
    }
  })
})

export default router
