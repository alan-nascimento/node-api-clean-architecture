import { Controller } from '../../../../../presentation/protocols'
import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { makeSignupValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeSignupController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication())

  return makeLogControllerDecorator(signUpController)
}
