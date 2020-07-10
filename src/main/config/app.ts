import express from 'express'

import { cors, bodyParser, contentType } from '../middlewares'
import { routes } from './routes'

class App {
  public server: express.Application = express()

  constructor () {
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
}

export default new App().server
