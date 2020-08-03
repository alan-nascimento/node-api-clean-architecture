import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { LoadSurveyByIdRepository } from '@/data/protocols/database/survey/load-survey-by-id-repository'
import { Controller, HttpRequest, HttpResponse } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { answer } = httpRequest.body
      const { surveyId } = httpRequest.params

      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)

      if (!survey) return forbidden(new InvalidParamError('surveyId'))

      const answers = survey.answers.map(item => item.answer)

      if (!answers.includes(answer)) return forbidden(new InvalidParamError('answer'))
    } catch (err) {
      return serverError(err)
    }
  }
}
