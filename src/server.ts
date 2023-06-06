import express, { type Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { routes } from './routes'
import deserializeToken from './middleware/deserialized_token'

export default function createServer(): Application {
  const app: Application = express()

  // parse body request
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // cors access handler
  app.use(cors())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })

  app.use(deserializeToken)

  routes(app)

  return app
}
