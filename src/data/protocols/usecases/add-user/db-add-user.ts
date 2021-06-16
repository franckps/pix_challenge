import { AddUser, AddUserModel } from '../../../../domain/usecases/add-user'
import { UserModel } from '../../../../domain/user-model'
import { AddUserRepository } from '../../add-user-repository'

export class DBAddUser implements AddUser {
    private readonly addUserRepository: AddUserRepository
    constructor (addUserRepository: AddUserRepository) {
      this.addUserRepository = addUserRepository
    }

    async add (addUserModel: AddUserModel): Promise<UserModel> {
      return await this.addUserRepository.add(addUserModel)
    }
}
