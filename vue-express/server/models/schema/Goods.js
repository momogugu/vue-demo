import mongoose from 'mongoose'

/**
 * 商品的数据结构模型
 * brand_id 商品id（唯一标识）
 * brand_class 商品类别
 * brand_className 商品类别名称
 * brand_status 商品所属状态
 * brand_name 商品名称
 * brand_price 商品价格
 * brand_desc 商品描述
 * brand_pic 商品图片
 */
const GoodsSchema = new mongoose.Schema({
  brand_id: Number,
  brand_class: String,
  brand_className: String,
  brand_status: String,
  brand_name: String,
  brand_price: Number,
  brand_desc: String,
  brand_pic: String
})

export default mongoose.model('Goods', GoodsSchema)
