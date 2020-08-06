import faker from 'faker'
import MockDate from 'mockdate'

import { throwError } from '@/domain/test'
import { LoadSurveyByIdRepositorySpy } from '@/data/test'

import { DbLoadSurveyById } from './db-load-survey-by-id'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()

  const sut = new DbLoadSurveyById(loadSurveyByIdRepositorySpy)

  return {
    sut,
    loadSurveyByIdRepositorySpy
  }
}

let surveyId: string

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    surveyId = faker.random.uuid()
  })

  it('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()

    await sut.loadById(surveyId)

    expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  it('Should return Survey on success', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()

    const survey = await sut.loadById(surveyId)

    expect(survey).toEqual(loadSurveyByIdRepositorySpy.surveyModel)
  })

  it('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()

    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)

    const promise = sut.loadById(surveyId)

    await expect(promise).rejects.toThrow()
  })
})
