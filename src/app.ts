import 'reflect-metadata'
import { resolve } from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import error from 'koa-json-error'
import router from './router/index'
import { createConnection, getManager } from 'typeorm'
import logger from './utils/logger'
import { Auth } from './utils/middlewares'

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nodenotes',
  entities: [resolve(__dirname, './entity/*.js')],
  synchronize: false,
  logging: false
}).then(() => {
  const app = new Koa()

  app
    .use(error())
    .use(Auth().unless({
      custom: function (ctx: any) {
        const noAuth = ['/api/v1/users', '/api/v1/sessions']
        if (noAuth.indexOf(ctx.originalUrl) > -1 && ctx.method === 'POST') {
          return true
        }
        return false
      }
    }))
    .use(async (ctx, next) => {
      ctx.ormManager = getManager()
      await next()
    })
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(4000, () => {
    logger.info('Server running at http://localhost:4000')
  })
}).catch((error) => {
  logger.error(`Typeorm connection error: ${error}`)
})
