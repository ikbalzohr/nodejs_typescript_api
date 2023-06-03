import Joi from 'joi'

interface ProductInterface {
  name: string
  price: number
}

export const createProductValidation = (payload: ProductInterface): any => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow('', null)
  })

  return schema.validate(payload)
}
