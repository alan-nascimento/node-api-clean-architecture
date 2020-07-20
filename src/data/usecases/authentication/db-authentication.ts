import {
  HashComparer,
  Authentication,
  Encrypter,
  AuthenticationModel,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email, password } = authentication

    const account = await this.loadAccountByEmailRepository.load(email)

    if (account) {
      const isValid = await this.hashComparer.compare(password, account.password)

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)

        await this.updateAccessTokenRepository.update(account.id, accessToken)

        return accessToken
      }
    }

    return null
  }
}
