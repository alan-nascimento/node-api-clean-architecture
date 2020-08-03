import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { answer } = httpRequest.body
      const { surveyId } = httpRequest.params
      const { accountId } = httpRequest

      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) return forbidden(new InvalidParamError('surveyId'))

      const answers = survey.answers.map(item => item.answer)

      if (!answers.includes(answer)) return forbidden(new InvalidParamError('answer'))

      await this.saveSurveyResult.save({ accountId, surveyId , answer, date: new Date() })
    } catch (err) {
      return serverError(err)
    }
  }
}
