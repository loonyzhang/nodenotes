import Router from '@koa/router'
import { Context, DefaultState } from 'koa'
import { Content } from '../../entity/Content'
import { FindManyOptions, Like } from 'typeorm'
import { PagationRequestConfig } from '../../types/common'

interface ContentQueryConfig extends PagationRequestConfig {
  query: string;
}

const router = new Router<DefaultState, Context>()

router.get('/contents', async (ctx) => {
  const { page = '1', pageSize = '10', query } = ctx.query as unknown as ContentQueryConfig
  const offset = (Number.parseInt(page) - 1) * Number.parseInt(pageSize)
  let options = {
    skip: offset,
    take: Number.parseInt(pageSize),
    order: { created: 'DESC' }
  }
  if (query) {
    options = Object.assign(options, {
      where: { title: Like(`%${query}%`) }
    })
  }
  const [contents, count] = await ctx.ormManager.findAndCount(Content, options as FindManyOptions<Content>)
  ctx.body = {
    status: 'success',
    data: {
      total: count,
      page: Number.parseInt(page),
      pageSize: Number.parseInt(pageSize),
      rows: contents
    },
    msg: '操作成功'
  }
})
router.post('/contents', async (ctx) => {
  const { title } = ctx.request.body
  if (!title) {
    ctx.body = {
      status: 'error',
      data: null,
      msg: '字段信息错误'
    }
    return
  }
  const content = new Content()
  content.title = title
  content.created = Math.round(Date.now() / 1000)
  content.authorId = ctx.state.user.id
  const result = await ctx.ormManager.save(content)
  ctx.body = {
    status: 'success',
    data: result,
    msg: 'content 保存成功'
  }
})

router.put('/contents', async (ctx) => {
  console.log(ctx.request.body)
  ctx.body = '123'
})

export default router
