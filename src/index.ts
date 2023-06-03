import express, { type Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { routes } from './routes'

const app: Application = express()
const port: number = 4000

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

routes(app)

app.listen(port, () => {
  console.log(`Server sedang berjalan pada port ${port}`)
})
