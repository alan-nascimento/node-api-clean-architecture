import request from 'supertest'

import app from '@/main/config/app'
import { noCache } from './no-cache'

describe('NoCache Middleware', () => {
  it('should disable cache', async () => {
    app.post('/test-no-cache', noCache, (req, res) => {
      res.send()
    })

    await request(app)
      .post('/test-no-cache')
      .expect('cache-control', 'no-cache, no-store, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
