import { Controller, HttpRequest, HttpResponse, Validation, AddSurvey } from './add-survey-controller-protocols'
import { badRequest, serverError } from '../../helpers/http/http-helper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) return badRequest(error)

      await this.addSurvey.add(httpRequest.body)

      return Promise.resolve(null)
    } catch (err) {
      return serverError(err)
    }
  }
}
