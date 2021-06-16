import { AddPixKeyRepository } from '../../../../data/protocols/add-pix-key-repository'
import { AddPixKeyModel } from '../../../../domain/usecases/add-pix-key'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { PixKey } from '../entity/pix-key-entity'

export class PixKeyRepository implements AddPixKeyRepository {
  async add ({ key, userId }: AddPixKeyModel) {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(PixKey)
    const newPixKey = new PixKey()
    newPixKey.key = key
    newPixKey.userId = userId
    const result = await repository.save(newPixKey)
    return Promise.resolve(result)
  }
}
