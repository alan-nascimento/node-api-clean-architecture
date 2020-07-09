import request from 'supertest'

import app from '../config/app'

describe('Body Parser Middleware', () => {
  it('should parse body as json', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test-body-parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
