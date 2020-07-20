import jwt from 'jsonwebtoken'

import { JwtAdapter } from './jwt-adapter'

// jest.mock('jwt', () => ({
//   async sign (): Promise<string> {
//     return new Promise(resolve => resolve(null))
//   }
// }))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
  it('should call sign with correct values', async () => {
    const sut = makeSut()

    const signSpy = jest.spyOn(jwt, 'sign')

    await sut.encrypt('any_id')

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
