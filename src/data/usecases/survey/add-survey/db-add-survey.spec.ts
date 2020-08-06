import MockDate from 'mockdate'

import { AddSurveyRepositorySpy } from '@/data/test'
import { throwError, mockAddSurveyParams } from '@/domain/test'

import { DbAddSurvey } from './db-add-survey'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositorySpy: AddSurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()

  const sut = new DbAddSurvey(addSurveyRepositorySpy)

  return {
    sut,
    addSurveyRepositorySpy
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()

    const surveyData = mockAddSurveyParams()

    await sut.add(surveyData)

    expect(addSurveyRepositorySpy.addSurveyParams).toEqual(surveyData)
  })

  it('should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()

    jest.spyOn(addSurveyRepositorySpy, 'add').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddSurveyParams())

    await expect(promise).rejects.toThrow()
  })
})
