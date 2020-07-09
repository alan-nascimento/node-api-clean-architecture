import request from 'supertest'

import app from '../config/app'

describe('CORS Middleware', () => {
  it('should enable CORS', async () => {
    app.post('/test-cors', (req, res) => {
      res.send()
    })

    await request(app)
      .post('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
