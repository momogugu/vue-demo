import CartModel from './schema/Cart'

const Cart = {
  addCart(body, callback) {
    return CartModel.create(body, (error, docs) => {
      callback(error, docs)
    })
  },
  getOne(query, callback) {
    return CartModel.findOne(query, {
      _id: 0
    }, (error, docs) => {
      callback(error, docs)
    })
  },
  updateOne(condition, update, callback) {
    return CartModel.updateOne(condition, update, (error, docs) => {
      callback(error, docs)
    })
  }
}

export default Cart
