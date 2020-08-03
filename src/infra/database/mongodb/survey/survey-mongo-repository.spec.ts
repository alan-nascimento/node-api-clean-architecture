import { Collection } from 'mongodb'

import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Account Mongo Repository', () => {
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

  describe('add()', () => {
    it('should add a survey on success', async () => {
      const sut = makeSut()

      await sut.add({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          },
          {
            answer: 'other_any_answer'
          }
        ],
        date: new Date()
      })

      const survey = await surveyCollection.findOne({ question: 'any_question' })

      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    it('should load all surveys on success', async () => {
      await surveyCollection.insertMany([
        {
          id: 'any_id',
          question: 'any_question',
          answers: [{
            image: 'any_image',
            answer: 'any_answer'
          }],
          date: new Date()
        },
        {
          id: 'any_other_id',
          question: 'any_other_question',
          answers: [{
            image: 'any_other_image',
            answer: 'any_other_answer'
          }],
          date: new Date()
        }
      ])

      const sut = makeSut()
      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('any_other_question')
    })

    it('should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    it('should load all surveys on success', async () => {
      const result = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }],
        date: new Date()
      })

      const id = result.ops[0]._id

      const sut = makeSut()
      const survey = await sut.loadById(id)

      expect(survey).toBeTruthy()
    })

    it('should load empty list', async () => {
      const sut = makeSut()
      const survey = await sut.loadAll()

      expect(survey.length).toBe(0)
    })
  })
})
