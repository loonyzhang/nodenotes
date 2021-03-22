import 'reflect-metadata'
import Koa from 'koa'
import { createConnection } from 'typeorm'
import logger from './utils/logger'
import { User } from './entity/User'
import { a } from './router/test'

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [
    User
  ],
  synchronize: true,
  logging: false
}).then(() => {
  const app = new Koa()
  app.use(async (ctx) => {
    logger.info(a)
    ctx.body = 'Hello World'
  })
  app.listen(3000, () => {
    logger.info('Server running at http://localhost:3000')
  })
}).catch((error) => {
  logger.error(`Typeorm connection error: ${error}`)
})
