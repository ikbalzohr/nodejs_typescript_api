import { type Request, type Response } from 'express'

import { addUserValidation } from '../validation/auth_validation'
import { logger } from '../utils/logger'
import { hashing } from '../utils/hashing'
import { addUser, getUserByEmail } from '../services/auth_service'

export async function registerUser(req: Request, res: Response): Promise<any> {
  const { error, value } = addUserValidation(req.body)
  if (error) {
    logger.error(`Auth - register = ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  const result = await getUserByEmail(value.email)
  if (result?.email) {
    logger.error('Auth - register = User already exists')
    return res.status(403).send({ status: false, statusCode: 403, message: 'Data already exists' })
  }

  try {
    value.password = `${hashing(value.password)}`
    const { name, email, role } = await addUser(value)
    logger.info('Success register user')
    return res
      .status(201)
      .send({ status: true, statusCode: 200, message: 'Register user success', data: { name, email, role } })
  } catch (error) {
    logger.error(`Auth - register = ${error}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
