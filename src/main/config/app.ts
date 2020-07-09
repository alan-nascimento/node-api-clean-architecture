import express from 'express'
import { bodyParser } from '../middlewares/body-parser'

class App {
  public server: express.Application = express()

  constructor () {
    this.middlewares()
  }

  private middlewares (): void {
    this.server.use(bodyParser)
  }
}

export default new App().server
