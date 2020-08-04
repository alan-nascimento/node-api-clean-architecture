import { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

import config from '@/main/docs'

export const swagger = (server: Application): void => {
  server.use('/api-docs', serve, setup(config))
}
