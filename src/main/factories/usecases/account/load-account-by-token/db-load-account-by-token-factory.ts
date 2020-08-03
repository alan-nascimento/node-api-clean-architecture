import env from '@/main/config/env'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { AccountMongoRepository } from '@/infra/database/mongodb/account/account-mongo-repository'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
