import { AddSurvey, AddSurveyModel, AddSurveyRepository } from './db-add-account-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (
    private readonly addSurveyRepository: AddSurveyRepository
  ) {}

  async add (surveyData: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(surveyData)

    return Promise.resolve()
  }
}
