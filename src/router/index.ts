import Router from '@koa/router'
import { Context, DefaultState } from 'koa'
import usersRouter from './users/index'
import contentsRouter from './contents/index'

const router = new Router<DefaultState, Context>({
  prefix: '/api/v1'
})

router
  .use(usersRouter.routes())
  .use(contentsRouter.routes())

export default router
