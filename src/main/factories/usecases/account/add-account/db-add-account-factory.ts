import { AddAccount } from '@/domain/usecases/account/add-account'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/database/mongodb/account/account-mongo-repository'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = new BcryptAdapter()
  const accountMongoRepository = new AccountMongoRepository()

  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
