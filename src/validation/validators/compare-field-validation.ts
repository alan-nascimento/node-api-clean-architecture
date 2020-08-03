
import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class CompareFieldValidation implements Validation {
  constructor (private readonly field: string, private readonly fieldToCompare: string) {}

  validate (input: any): Error {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare)
    }
  }
}
