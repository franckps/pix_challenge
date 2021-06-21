import { PixKeyModel } from '../../../../domain/pix-key-model'
import { FindPixKeyByKey } from '../../../../domain/usecases/find-pix-key-by-key'
import { FindPixKeyRepository } from '../../find-pix-key-repository'

export class DBFindPixKeyByKey implements FindPixKeyByKey {
    private readonly findPixKeyRepository: FindPixKeyRepository
    constructor (findPixKeyRepository: FindPixKeyRepository) {
      this.findPixKeyRepository = findPixKeyRepository
    }

    async find (key: string): Promise<PixKeyModel> {
      return (await this.findPixKeyRepository.find({ key }))[0]
    }
}
