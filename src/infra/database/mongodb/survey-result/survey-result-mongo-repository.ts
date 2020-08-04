import { SaveSurveyResultRepository } from '@/data/protocols/database/survey-result/save-survey-result-repository'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')

    const { surveyId, accountId, answer, date } = data

    const result = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId,
        accountId
      },
      {
        $set: {
          answer,
          date
        }
      },
      {
        upsert: true,
        returnOriginal: false
      }
    )

    return result.value && MongoHelper.map(result.value)
  }
}
