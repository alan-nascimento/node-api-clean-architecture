import faker from 'faker'

import { throwError } from '@/domain/test'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '@/data/test'

import { DbLoadAccountByToken } from './db-load-account-by-token'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()

  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)

  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}

let token: string
let role: string

describe('DbLoadAccountByToken Usecase', () => {
  beforeEach(() => {
    token = faker.random.uuid()
    role = faker.random.word()
  })

  it('should call Decrypter with correct ciphertext', async () => {
    const { sut, decrypterSpy } = makeSut()

    await sut.load(token, role)

    expect(decrypterSpy.ciphertext).toBe(token)
  })

  it('should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()

    decrypterSpy.plaintext = null

    const account = await sut.load(token, role)

    expect(account).toBeNull()
  })

  it('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()

    await sut.load(token, role)

    expect(loadAccountByTokenRepositorySpy.token).toBe(token)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  it('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()

    loadAccountByTokenRepositorySpy.accountModel = null

    const account = await sut.load(token, role)

    expect(account).toBeNull()
  })

  it('should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()

    const account = await sut.load(token, role)

    expect(account).toEqual(loadAccountByTokenRepositorySpy.accountModel)
  })

  it('should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()

    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)

    const account = await sut.load(token, role)

    expect(account).toBeNull()
  })

  it('should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()

    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)

    const promise = sut.load(token, role)

    await expect(promise).rejects.toThrow()
  })
})
