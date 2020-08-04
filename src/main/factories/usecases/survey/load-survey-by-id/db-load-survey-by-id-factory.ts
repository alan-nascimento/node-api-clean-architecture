import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { DbLoadSurveyById } from '@/data/usecases/account/load-account-by-id/db-load-account-by-id'
import { SurveyMongoRepository } from '@/infra/database/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbLoadSurveyById(surveyMongoRepository)
}
