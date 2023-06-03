import { logger } from '../utils/logger'
import productModel from '../models/product_model'
import type ProductType from '../types/product_type'

export const getProductFromDB = async (): Promise<any> => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Cannot get data from DB')
      logger.error(error)
    })
}

export const getProductById = async (id: string): Promise<any> => {
  return await productModel.findOne({ _id: id })
}

export const addProductToDB = async (payload: ProductType): Promise<any> => {
  return await productModel.create(payload)
}
