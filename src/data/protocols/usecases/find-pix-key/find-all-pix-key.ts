import { PixKeyModel } from '../../../../domain/pix-key-model'
import { FindAllPixKey } from '../../../../domain/usecases/find-all-pix-key'
import { FindPixKeyRepository } from '../../find-pix-key-repository'

export class DBFindAllPixKey implements FindAllPixKey {
    private readonly findPixKeyRepository: FindPixKeyRepository
    constructor (findPixKeyRepository: FindPixKeyRepository) {
      this.findPixKeyRepository = findPixKeyRepository
    }

    async find (): Promise<PixKeyModel[]> {
      return await this.findPixKeyRepository.find()
    }
}
