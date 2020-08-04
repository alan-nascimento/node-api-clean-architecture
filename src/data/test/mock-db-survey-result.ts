import { mockSurveyResultModel } from '@/domain/test/mock-survey-result'
import { SaveSurveyResultRepository } from '@/data/protocols/database/survey-result/save-survey-result-repository'
import { SurveyResultModel, SaveSurveyResultParams } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new SaveSurveyResultRepositoryStub()
}
