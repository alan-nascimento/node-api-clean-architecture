import { readdirSync } from 'fs'
import { Application, Router } from 'express'

export const routes = (server: Application): void => {
  const router = Router()

  server.use('/api', router)

  readdirSync(`${__dirname}/../routes`).map(async file => {
    const exclude = file.includes('.test.ts' || '.spec.ts')

    if (!exclude) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
