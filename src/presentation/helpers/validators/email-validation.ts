
import { Validation } from './validation'
import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols'

export class EmailValidation implements Validation {
  constructor (private readonly email: string, private readonly emailValidator: EmailValidator) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.email])

    if (!isValid) {
      return new InvalidParamError(this.email)
    }
  }
}
