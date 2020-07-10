import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/database/mongodb/account-repository/account'

export const makeSignupController = (): SignUpController => {
  const bcryptAdapter = new BcryptAdapter()
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)

  return signUpController
}
