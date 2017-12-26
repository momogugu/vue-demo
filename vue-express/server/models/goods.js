import GoodsModel from './schema/Goods'

const Goods = {
  getAll(callback) {
    return GoodsModel.find({}, {
      _id: 0
    }, (error, docs) => {
      callback(error, docs)
    })
  },
  getDetail(query, callback) {
    return GoodsModel.findOne(query, {
      _id: 0
    }, (error, docs) => {
      callback(error, docs)
    })
  }
}


export default Goods
