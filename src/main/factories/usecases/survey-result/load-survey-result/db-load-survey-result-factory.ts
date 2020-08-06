import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result'
import { SurveyMongoRepository } from '@/infra/database/mongodb/survey/survey-mongo-repository'
import { SurveyResultMongoRepository } from '@/infra/database/mongodb/survey-result/survey-result-mongo-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
