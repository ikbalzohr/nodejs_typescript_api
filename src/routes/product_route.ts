import { Router, type Request, type Response, type NextFunction } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validation/product_validation'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get product data')
  res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'Coca-cola', price: 5 }] })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error(`ERR: product - create = , ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }
  logger.info('Success add new product')
  return res.status(200).send({ status: true, statusCode: 200, message: 'Add product success', data: value })
})
