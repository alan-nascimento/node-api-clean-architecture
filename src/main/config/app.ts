import express from 'express'

import { cors, bodyParser, contentType } from '@/main/middlewares'
import { routes } from './routes'
import { swagger } from './swagger'
import { setupStatic } from './static-files'

class App {
  public server: express.Application = express()

  constructor () {
    this.swagger()
    this.static()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.server.use(contentType)
    this.server.use(bodyParser)
    this.server.use(cors)
  }

  private routes (): void {
    routes(this.server)
  }

  private swagger (): void {
    swagger(this.server)
  }

  private static (): void {
    setupStatic(this.server)
  }
}

export default new App().server
