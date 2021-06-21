import { FindUserById } from '../../../../domain/usecases/find-user-by-id'
import { UserModel } from '../../../../domain/user-model'
import { FindUserRepository } from '../../find-user-repository'

export class DBFindUserById implements FindUserById {
    private readonly findUserRepository: FindUserRepository
    constructor (findUserRepository: FindUserRepository) {
      this.findUserRepository = findUserRepository
    }

    async find (id: string): Promise<UserModel> {
      return (await this.findUserRepository.find({ id }))[0]
    }
}
