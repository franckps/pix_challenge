import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { DBFindUserById } from '../../../data/protocols/usecases/find-user/find-user-by-id'
import { UserIdValidation } from '../../../presentation/helpers/validators/user-id-validation'
import { UserRepository } from '../../../infra/db/typeorm-postgres/user-repository/user-repository'

export const makeFindTransactionByUserIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field))
  }

  const dbFindUserById = new DBFindUserById(new UserRepository())
  validations.push(new UserIdValidation('id', dbFindUserById))

  return new ValidationComposite(validations)
}
