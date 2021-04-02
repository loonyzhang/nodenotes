import Router from '@koa/router'
import { Context, DefaultState } from 'koa'
import { User } from '../../entity/User'
import { createHash } from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import cache from '../../utils/cache'
import { transformData } from '../../utils/utils'

const router = new Router<DefaultState, Context>()

// 用户登录
router.post('/sessions', async (ctx) => {
  const { username, password } = ctx.request.body
  const mailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
  if (!username || !password) {
    ctx.body = {
      status: 'error',
      data: null,
      msg: '用户名或密码错误'
    }
    return
  }
  let user
  const pass = createHash('md5').update(password).digest('hex')
  if (mailReg.test(username)) {
    user = await ctx.ormManager.findOne(User, { mail: username, password: pass })
  } else {
    user = await ctx.ormManager.findOne(User, { name: username, password: pass })
  }
  if (user) {
    await ctx.ormManager.update(User, user.id, { activated: Math.round(Date.now() / 1000) })
    const token = uuidv4()
    cache.add<User>(token, user)
    ctx.body = {
      status: 'success',
      data: token,
      msg: '用户登录成功'
    }
  } else {
    ctx.body = {
      status: 'error',
      data: null,
      msg: `不存在用户 ${username}`
    }
  }
})
router.get('/sessions', async (ctx) => {
  const token = ctx.request.get('Authentication')
  ctx.body = {
    status: 'success',
    data: cache.get(token),
    msg: '操作成功'
  }
})
// 创建用户
router.post('/users', async (ctx) => {
  const { mail, name, password } = <User>ctx.request.body
  if (!mail || !name || !password) {
    ctx.body = {
      status: 'error',
      data: null,
      msg: '字段信息错误'
    }
    return
  }
  const user = new User()
  user.mail = mail.trim()
  user.name = name.trim()
  user.password = createHash('md5').update(password.trim()).digest('hex')
  user.created = Math.round(Date.now() / 1000)
  try {
    await ctx.ormManager.save(user)
    ctx.body = {
      status: 'success',
      data: transformData(user, 'password'),
      msg: '创建用户成功'
    }
  } catch (error) {
    ctx.body = {
      status: 'error',
      data: null,
      msg: '用户名或邮箱已存在'
    }
  }
})
router.get('/users', async (ctx) => {
  const users = await ctx.ormManager.find(User)
  const transformUsers = users.map((user) => transformData(user, 'password'))
  ctx.body = {
    status: 'success',
    data: transformUsers,
    msg: '操作成功'
  }
})

export default router
