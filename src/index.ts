import createServer from './server'
import { logger } from './utils/logger'

// connect DB
import './utils/connectToDB'

const app = createServer()
const port: number = 4000

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`)
})
