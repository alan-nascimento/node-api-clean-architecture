import { SurveyResultModel, SaveSurveyResultRepository, SaveSurveyResult, SaveSurveyResultParams } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const survey = await this.saveSurveyResultRepository.save(data)

    return survey
  }
}
