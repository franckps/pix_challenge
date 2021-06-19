import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'

export const makeMakeTransactionValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['amount', 'debitorId', 'pixKey']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
