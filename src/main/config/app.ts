import express from 'express'

import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'
import { contentType } from '../middlewares/content-type'

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
