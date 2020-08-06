import faker from 'faker'
import MockDate from 'mockdate'

import { throwError } from '@/domain/test'
import { LoadSurveysSpy } from '@/presentation/test'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'

import { HttpRequest } from './load-surveys-controller-protocols'
import { LoadSurveysController } from './load-surveys-controller'

const mockRequest = (): HttpRequest => ({ accountId: faker.random.uuid() })

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()

  const sut = new LoadSurveysController(loadSurveysSpy)

  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysSpy } = makeSut()

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(loadSurveysSpy.accountId).toBe(httpRequest.accountId)
  })

  it('should return 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ok(loadSurveysSpy.surveyModels))
  })

  it('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()

    loadSurveysSpy.surveyModels = []

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(noContent())
  })

  it('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()

    jest.spyOn(loadSurveysSpy, 'load').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
