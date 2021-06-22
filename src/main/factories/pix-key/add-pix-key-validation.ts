import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { UserIdValidation } from '../../../presentation/helpers/validators/user-id-validation'
import { DBFindUserById } from '../../../data/protocols/usecases/find-user/find-user-by-id'
import { UserRepository } from '../../../infra/db/typeorm-postgres/user-repository/user-repository'
import { DBFindPixKeyByUserId } from '../../../data/protocols/usecases/find-pix-key/find-pix-key-by-user-id'
import { PixKeyRepository } from '../../../infra/db/typeorm-postgres/pix-key-repository/pix-key-repository'
import { MaxPixKeyPerUserValidation } from '../../../presentation/helpers/validators/max-pix-key-per-user-validation'
import { DBFindPixKeyByKey } from '../../../data/protocols/usecases/find-pix-key/find-pix-key-by-key'
import { NotExistsPixKeyValidation } from '../../../presentation/helpers/validators/not-exists-pix-key-validation'

export const makeAddPixKeyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['key', 'id']) {
    validations.push(new RequiredFieldValidation(field))
  }

  const dbFindPixKeyByKey = new DBFindPixKeyByKey(new PixKeyRepository())
  validations.push(new NotExistsPixKeyValidation('key', dbFindPixKeyByKey))

  const dbFindUserById = new DBFindUserById(new UserRepository())
  validations.push(new UserIdValidation('id', dbFindUserById))

  const maxPixKeysPerUser = 3
  const dbFindPixKeyByUserId = new DBFindPixKeyByUserId(new PixKeyRepository())
  validations.push(new MaxPixKeyPerUserValidation('id', maxPixKeysPerUser, dbFindPixKeyByUserId))

  return new ValidationComposite(validations)
}
