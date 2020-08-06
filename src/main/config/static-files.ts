import { resolve } from 'path'
import express, { Application } from 'express'

export const setupStatic = (app: Application): void => {
  app.use('/static', express.static(resolve(__dirname, '../../static')))
}
