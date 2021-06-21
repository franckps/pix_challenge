import { DBFindPixKeyByUserId } from '../../../data/protocols/usecases/find-pix-key/find-pix-key-by-user-id'
import { PixKeyRepository } from '../../../infra/db/typeorm-postgres/pix-key-repository/pix-key-repository'
import { FindPixKeyByUserIdController } from '../../../presentation/controllers/find-pix-key/find-pix-key-by-user-id'
import { Controller } from '../../../presentation/protocols/controller'
import { makeFindPixKeyByUserIdValidation } from './find-pix-key-by-user-id-validation'

export const makeFindPixKeyByUserIdController = (): Controller => {
  const findPixKeyByUserIdRepository = new PixKeyRepository()
  const dbFindPixKeyByUserId = new DBFindPixKeyByUserId(findPixKeyByUserIdRepository)
  return new FindPixKeyByUserIdController(dbFindPixKeyByUserId, makeFindPixKeyByUserIdValidation())
}
