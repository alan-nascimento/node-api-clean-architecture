import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-account-protocols'
import { AddSurveyRepository } from '@/data/protocols/database/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/data/protocols/database/survey/load-surveys-repository'
import { SurveyModel, LoadSurveyByIdRepository } from '@/data/usecases/account/load-account-by-id/db-load-account-by-id-protocols'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysRepositoryStub()
}
