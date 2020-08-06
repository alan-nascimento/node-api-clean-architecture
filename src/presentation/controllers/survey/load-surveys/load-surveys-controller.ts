import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'

import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId)

      return surveys.length ? ok(surveys) : noContent()
    } catch (err) {
      return serverError(err)
    }
  }
}
