import { AddSurvey, AddSurveyParams, AddSurveyRepository } from './db-add-account-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (
    private readonly addSurveyRepository: AddSurveyRepository
  ) {}

  async add (surveyData: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(surveyData)

    return Promise.resolve()
  }
}
