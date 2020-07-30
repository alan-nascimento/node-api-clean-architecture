import { AccountModel } from '../models/account'

export interface LoadAccountByToken {
  add: (accessToken: string, role?: string) => Promise<AccountModel>
}
