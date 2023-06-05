import { Router } from 'express'

import { createProduct, deleteProduct, getProduct, updateProduct } from '../controller/product_controller'
import { requireUser } from '../middleware/auth_middleware'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', requireUser, createProduct)
ProductRouter.put('/:id', updateProduct)
ProductRouter.delete('/:id', requireUser, deleteProduct)
