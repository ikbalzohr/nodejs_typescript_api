import { Router } from 'express'

import { createProduct, getProduct } from '../controller/product_controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', createProduct)
