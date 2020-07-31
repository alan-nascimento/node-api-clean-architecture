
import request from 'supertest'
import { Collection } from 'mongodb'

import app from '../config/app'
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongo-helper'

describe('Survey Routes', () => {
  let surveyCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    it('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_question',
          answers: [
            {
              answer: 'any_answer'
            },
            {
              image: 'http://other-any-image.com',
              answer: 'other_any_answer'
            }
          ]
        })
        .expect(403)
    })
  })
})
