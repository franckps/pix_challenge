import { AddUserModel, AddUserRepository } from '../../../../data/protocols/add-user-repository'

export class UserRepository implements AddUserRepository {
  async add ({ name, phone }: AddUserModel) {
    return Promise.resolve({ id: 'any_id', name, phone })
  }
}
