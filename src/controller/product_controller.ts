import { type Request, type Response } from 'express'

import { logger } from '../utils/logger'
import { addProductValidation, updateProductValidation } from '../validation/product_validation'
import { addProductToDB, getProductById, getProductFromDB, updateProductById } from '../services/product_service'

export async function createProduct(req: Request, res: Response): Promise<Response> {
  const { error, value } = addProductValidation(req.body)
  if (error) {
    logger.error(`ERR: product - create = ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }
  try {
    await addProductToDB(value)
    logger.info('Success add new product')
    return res.status(201).send({ status: true, statusCode: 200, message: 'Add product success' })
  } catch (error) {
    logger.error(`ERR: product - create = ${error}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export async function getProduct(req: Request, res: Response): Promise<Response> {
  const {
    params: { id }
  } = req

  if (id) {
    const product = await getProductById(id)
    if (product) {
      logger.info('Success get product data')
      return res.status(200).send({ status: true, statusCode: 200, data: product })
    } else {
      return res.status(200).send({ status: true, statusCode: 404, message: 'Data Not Found', data: {} })
    }
  } else {
    const products: any = await getProductFromDB()
    logger.info('Success get product data')
    return res.status(200).send({ status: true, statusCode: 200, data: products })
  }
}

export async function updateProduct(req: Request, res: Response): Promise<any> {
  const {
    params: { id }
  } = req

  const { error, value } = updateProductValidation(req.body)
  console.log(typeof error)
  if (error) {
    logger.error(`ERR: product - create = ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    await updateProductById(id, value)
    logger.info('Success update product')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Update product success' })
  } catch (error) {
    logger.error(`ERR: product - create = ${error}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
