import { FindAllUser } from '../../../../domain/usecases/find-all-user'
import { UserModel } from '../../../../domain/user-model'
import { FindUserRepository } from '../../find-user-repository'

export class DBFindAllUser implements FindAllUser {
    private readonly findUserRepository: FindUserRepository
    constructor (findUserRepository: FindUserRepository) {
      this.findUserRepository = findUserRepository
    }

    async find (): Promise<UserModel[]> {
      return await this.findUserRepository.find()
    }
}
