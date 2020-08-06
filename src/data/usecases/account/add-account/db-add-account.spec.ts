import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/test'
import { HasherSpy, AddAccountRepositorySpy, LoadAccountByEmailRepositorySpy } from '@/data/test'

import { DbAddAccount } from './db-add-account'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()

  loadAccountByEmailRepositorySpy.accountModel = null

  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()

  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, loadAccountByEmailRepositorySpy)

  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  it('Should call Hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut()

    const addAccountParams = mockAddAccountParams()

    await sut.add(addAccountParams)

    expect(hasherSpy.plaintext).toBe(addAccountParams.password)
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()

    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()

    const addAccountParams = mockAddAccountParams()

    await sut.add(addAccountParams)

    expect(addAccountRepositorySpy.addAccountParams).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hasherSpy.digest
    })
  })

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()

    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow()
  })

  it('Should return an account on success', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()

    const account = await sut.add(mockAddAccountParams())

    expect(account).toEqual(addAccountRepositorySpy.accountModel)
  })

  it('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()

    loadAccountByEmailRepositorySpy.accountModel = mockAccountModel()

    const account = await sut.add(mockAddAccountParams())

    expect(account).toBeNull()
  })

  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()

    const addAccountParams = mockAddAccountParams()

    await sut.add(addAccountParams)

    expect(loadAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })
})
