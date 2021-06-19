import { DBAddPixKey } from '../../../data/protocols/usecases/add-pix-key/db-add-pix-key'
import { PixKeyRepository } from '../../../infra/db/typeorm-postgres/pix-key-repository/pix-key-repository'
import { AddPixKeyController } from '../../../presentation/controllers/add-pix-key/add-pix-key'
import { Controller } from '../../../presentation/protocols/controller'
import { makeAddPixKeyValidation } from './add-pix-key-validation'

export const makeAddPixKeyController = (): Controller => {
  const addPixKeyRepository = new PixKeyRepository()
  const dbAddPixKey = new DBAddPixKey(addPixKeyRepository)
  return new AddPixKeyController(dbAddPixKey, makeAddPixKeyValidation())
}
