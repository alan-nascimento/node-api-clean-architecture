import { readdirSync } from 'fs'
import { Application, Router } from 'express'

export const routes = (server: Application): void => {
  const router = Router()

  server.use('/api', router)

  readdirSync(`${__dirname}/../routes`).map(async file => {
    const include = !file.includes('.test.ts' || '.spec.ts') && !file.endsWith('.map')

    if (include) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
