import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { DBFindUserById } from '../../../data/protocols/usecases/find-user/find-user-by-id'
import { UserIdValidation } from '../../../presentation/helpers/validators/user-id-validation'
import { UserRepository } from '../../../infra/db/typeorm-postgres/user-repository/user-repository'
import { DBFindPixKeyByKey } from '../../../data/protocols/usecases/find-pix-key/find-pix-key-by-key'
import { PixKeyRepository } from '../../../infra/db/typeorm-postgres/pix-key-repository/pix-key-repository'
import { PixKeyValidation } from '../../../presentation/helpers/validators/pix-key-validation'
import { IsPixKeyOfOtherUserValidation } from '../../../presentation/helpers/validators/is-pix-key-of-other-user-validation'

export const makeMakeTransactionValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['amount', 'debitorId', 'pixKey']) {
    validations.push(new RequiredFieldValidation(field))
  }

  const dbFindUserById = new DBFindUserById(new UserRepository())
  validations.push(new UserIdValidation('debitorId', dbFindUserById))

  const dbFindPixKeyByKey = new DBFindPixKeyByKey(new PixKeyRepository())
  validations.push(new PixKeyValidation('pixKey', dbFindPixKeyByKey))

  validations.push(new IsPixKeyOfOtherUserValidation('pixKey', 'debitorId', dbFindPixKeyByKey))

  return new ValidationComposite(validations)
}
