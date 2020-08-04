
import request from 'supertest'
// import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'

import app from '@/main/config/app'
// import env from '@/main/config/env'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'

let surveyCollection: Collection
let accountCollection: Collection

// const makeAccessToken = async (): Promise<string> => {
//   const account = await accountCollection.insertOne({
//     name: 'any_name',
//     email: 'any_email@mail.com',
//     password: 'any_password',
//     role: 'admin'
//   })

//   const id = account.ops[0]._id
//   const accessToken = sign({ id }, env.jwtSecret)

//   await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })

//   return accessToken
// }

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

  describe('PUT /surveys/:surveyId/results', () => {
    it('should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({ answer: 'any_answer' })
        .expect(403)
    })
  })
})
