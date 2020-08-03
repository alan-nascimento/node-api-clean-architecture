import { SurveyMongoRepository } from '@/infra/database/mongodb/survey/survey-mongo-repository'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbLoadSurveys(surveyMongoRepository)
}
