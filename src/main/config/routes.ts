import fg from 'fast-glob'
import { Application, Router } from 'express'

export const routes = (server: Application): void => {
  const router = Router()

  server.use('/api', router)

  fg.sync('**/src/main/routes/**routes.ts').map(async file => {
    return (await import(`../../../${file}`)).default(router)
  })
}
