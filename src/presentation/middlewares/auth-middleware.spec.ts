import { throwError } from '@/domain/test'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadAccountByTokenSpy } from '@/presentation/test'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'

import { HttpRequest } from './auth-middleware-protocols'
import { AuthMiddleware } from './auth-middleware'

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()

  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)

  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('Auth Middleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'

    const { sut, loadAccountByTokenSpy } = makeSut(role)

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(loadAccountByTokenSpy.accessToken).toBe(httpRequest.headers['x-access-token'])
    expect(loadAccountByTokenSpy.role).toBe(role)
  })

  it('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()

    loadAccountByTokenSpy.accountModel = null

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ok({
      accountId: loadAccountByTokenSpy.accountModel.id
    }))
  })

  it('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()

    jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
