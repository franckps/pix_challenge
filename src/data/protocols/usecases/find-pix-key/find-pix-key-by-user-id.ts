import { PixKeyModel } from '../../../../domain/pix-key-model'
import { FindPixKeyByUserId } from '../../../../domain/usecases/find-pix-key-by-user-id'
import { FindPixKeyRepository } from '../../find-pix-key-repository'

export class DBFindPixKeyByUserId implements FindPixKeyByUserId {
    private readonly findPixKeyRepository: FindPixKeyRepository
    constructor (findPixKeyRepository: FindPixKeyRepository) {
      this.findPixKeyRepository = findPixKeyRepository
    }

    async find (userId: 'uuid'): Promise<PixKeyModel[]> {
      return await this.findPixKeyRepository.find({ userId })
    }
}
