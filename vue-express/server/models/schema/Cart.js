import mongoose from 'mongoose'

/**
 * 购物车数据结构模型
 * username 对应用户名
 * brand_id 商品id（唯一标识）
 * brand_name 商品名称
 * brand_class 商品类别
 * brand_price 商品价格
 * brand_desc 商品描述
 * brand_pic 商品图片
 * cart_num 该商品在购物车中的数量
 * cart_isSelected 该商品在购物车中是否选中
 */
const CartSchema = new mongoose.Schema({
  username: String,
  brand_id: Number,
  brand_name: String,
  brand_class: String,
  brand_price: Number,
  brand_desc: String,
  brand_pic: String,
  cart_num: Number,
  cart_isSelect: Boolean
})

export default mongoose.model('Cart', CartSchema)
