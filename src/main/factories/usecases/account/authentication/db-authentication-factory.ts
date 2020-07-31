import env from '../../../../config/env'
import { DbAuthentication } from '../../../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../../../infra/database/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { Authentication } from '../../../../../domain/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
