import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../errors'

describe('RequiredField Validation', () => {
  it('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')

    const error = sut.validate({})

    expect(error).toEqual(new MissingParamError('field'))
  })
})
