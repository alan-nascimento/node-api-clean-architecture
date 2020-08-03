import env from '@/main/config/env'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { Authentication } from '@/domain/usecases/authentication'
import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'
import { AccountMongoRepository } from '@/infra/database/mongodb/account/account-mongo-repository'

export const makeDbAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
