import { Validation } from '../../presentation/helpers/validators/validation'
import { makeSignupValidation } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-field-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignupValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignupValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
