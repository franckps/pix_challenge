import { DBFindAllPixKey } from '../../../data/protocols/usecases/find-pix-key/find-all-pix-key'
import { PixKeyRepository } from '../../../infra/db/typeorm-postgres/pix-key-repository/pix-key-repository'
import { FindAllPixKeyController } from '../../../presentation/controllers/find-pix-key/find-all-pix-key'
import { Controller } from '../../../presentation/protocols/controller'

export const makeFindAllPixKeyController = (): Controller => {
  const findPixKeyRepository = new PixKeyRepository()
  const dbFindAllPixKey = new DBFindAllPixKey(findPixKeyRepository)
  return new FindAllPixKeyController(dbFindAllPixKey)
}
