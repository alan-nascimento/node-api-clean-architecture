import faker from 'faker'
import { Collection } from 'mongodb'

import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'

import { LogMongoRepository } from './log-mongo-repository'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogMongoRepository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  it('should create an error log on success', async () => {
    const sut = makeSut()

    await sut.logError(faker.random.words())

    const count = await errorCollection.countDocuments()

    expect(count).toBe(1)
  })
})
