import { Controller, HttpRequest, HttpResponse, EmailValidator } from '../../protocols'
import { badRequest, serverError } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return Promise.resolve(badRequest(new MissingParamError(field)))
        }
      }

      const { email } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return Promise.resolve(badRequest(new InvalidParamError('email')))
      }
    } catch (err) {
      return serverError(err)
    }
  }
}
