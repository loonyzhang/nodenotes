import { EntityManager } from 'typeorm'

declare module 'koa' {
  // eslint-disable-next-line no-unused-vars
  interface Context {
    ormManager: EntityManager
  }
}
