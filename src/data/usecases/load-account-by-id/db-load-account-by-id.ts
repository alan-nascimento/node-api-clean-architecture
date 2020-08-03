import { SurveyModel, LoadSurveyByIdRepository, LoadSurveyById } from './db-load-account-by-id-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadByIdRepository.loadById(id)

    return survey
  }
}
