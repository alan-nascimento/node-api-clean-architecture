import { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

import config from '@/main/docs'
import { noCache } from '@/main/middlewares/no-cache'

export const swagger = (server: Application): void => {
  server.use('/api-docs', noCache, serve, setup(config))
}
