import express from 'express'

import { cors, bodyParser, contentType } from '../middlewares'

class App {
  public server: express.Application = express()

  constructor () {
    this.middlewares()
  }

  private middlewares (): void {
    this.server.use(contentType)
    this.server.use(bodyParser)
    this.server.use(cors)
  }
}

export default new App().server
