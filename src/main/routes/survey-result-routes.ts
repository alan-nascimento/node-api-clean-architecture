
import { Router } from 'express'

import { auth } from '@/main/middlewares/auth'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-results/save-survey-result/save-survey-result-controller-factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
