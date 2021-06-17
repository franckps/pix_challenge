import { AddPixKeyRepository } from '../../../../data/protocols/add-pix-key-repository'
import { AddPixKeyModel } from '../../../../domain/usecases/add-pix-key'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { User } from '../entity/user-entity'
import { PixKey } from '../entity/pix-key-entity'

export class PixKeyRepository implements AddPixKeyRepository {
  async add ({ key, userId }: AddPixKeyModel) {
    const connection = await TypeormPostgresHelper.getConnection()
    const userRepository = connection.getRepository(User)
    const userToAddPix = await userRepository.findOne({ id: userId })
    const repository = connection.getRepository(PixKey)
    const newPixKey = new PixKey()
    newPixKey.key = key
    newPixKey.user = userToAddPix
    await repository.save(newPixKey)
    return await repository.findOne(newPixKey)
  }
}
