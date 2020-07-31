import { AddSurvey } from '../../../../../domain/usecases/add-survey'
import { DbAddSurvey } from '../../../../../data/usecases/add-survey/db-add-survey'
import { SurveyMongoRepository } from '../../../../../infra/database/mongodb/survey/mongo-survey-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbAddSurvey(surveyMongoRepository)
}
