import Koa from 'koa'
import cache from './cache'
import { User } from '../entity/User'
import unless from 'koa-unless'

interface Middleware extends Koa.Middleware {
  unless(params: any): Koa.Middleware
}

export function Auth (): Middleware {
  const fn = async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next) => {
    const token = ctx.request.get('Authentication')
    const user = cache.get<User>(token)
    if (user?.id) {
      console.log('认证通过')
      ctx.state.user = user
      await next()
    } else {
      console.log('认证失败')
      ctx.status = 401
      ctx.body = {
        status: 'error',
        data: null,
        msg: `${ctx.path} Unauthorized`
      }
    }
  }
  fn.unless = unless
  return fn
}
