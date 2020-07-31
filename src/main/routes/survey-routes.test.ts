
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'

import app from '../config/app'
import env from '../config/env'
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongo-helper'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const account = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    role: 'admin'
  })

  const id = account.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })

  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
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

    it('should return 204 on add survey with valid token', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
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
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    it('should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })
  })

  it('should return 200 on load surveys with valid token', async () => {
    const accessToken = await makeAccessToken()

    await surveyCollection.insertMany([
      {
        id: 'any_id',
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }],
        date: new Date()
      }
    ])

    await request(app)
      .get('/api/surveys')
      .set('x-access-token', accessToken)
      .expect(200)
  })

  it('should return 204 on load surveys with valid token', async () => {
    const accessToken = await makeAccessToken()

    await request(app)
      .get('/api/surveys')
      .set('x-access-token', accessToken)
      .expect(204)
  })
})
