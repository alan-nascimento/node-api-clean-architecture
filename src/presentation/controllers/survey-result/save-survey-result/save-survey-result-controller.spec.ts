import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest, SurveyModel, LoadSurveyById } from './save-survey-result-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  },
  body: {
    answer: 'any_answer'
  }
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(makeFakeSurvey())
    }
  }

  return new LoadSurveyByIdStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()

  const sut = new SaveSurveyResultController(loadSurveyByIdStub)

  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('SaveSurveyResult Controller', () => {
  it('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')

    await sut.handle(makeFakeRequest())

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))

    const httpRespose = await sut.handle(makeFakeRequest())

    expect(httpRespose).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()

    const httpRespose = await sut.handle({
      params: {
        surveyId: 'any_id'
      },
      body: {
        answer: 'wrong_answer'
      }
    })

    expect(httpRespose).toEqual(forbidden(new InvalidParamError('answer')))
  })
})
