import { Validation } from '@/presentation/protocols/validation'
import { mockEmailValidator } from '@/validation/test'
import { ValidationComposite, RequiredFieldValidation, CompareFieldValidation, EmailValidation } from '@/validation/validators'
import { makeSignupValidation } from './signup-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('SignupValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignupValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', mockEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
