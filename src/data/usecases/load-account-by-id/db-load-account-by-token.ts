import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import { LoadSurveyByIdRepository } from '@/data/protocols/database/survey/load-survey-by-id-repository'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadByIdRepository.loadById(id)

    return survey
  }
}
