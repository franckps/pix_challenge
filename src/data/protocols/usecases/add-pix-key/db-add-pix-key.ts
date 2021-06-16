import { AddPixKey, AddPixKeyModel } from '../../../../domain/usecases/add-pix-key'
import { PixKeyModel } from '../../../../domain/pix-key-model'
import { AddPixKeyRepository } from '../../add-pix-key-repository'

export class DBAddPixKey implements AddPixKey {
    private readonly addUserRepository: AddPixKeyRepository
    constructor (addUserRepository: AddPixKeyRepository) {
      this.addUserRepository = addUserRepository
    }

    async add (addUserModel: AddPixKeyModel): Promise<PixKeyModel> {
      return await this.addUserRepository.add(addUserModel)
    }
}
