import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true
    },
    price: {
      type: Number
    },
    name: {
      type: String
    },
    size: {
      type: String
    }
  },
  { timestamps: true }
)

const productModel = mongoose.model('products', productSchema)

export default productModel
