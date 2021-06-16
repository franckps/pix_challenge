import { AddUserRepository } from '../../../../data/protocols/add-user-repository'
import { AddUserModel } from '../../../../domain/usecases/add-user'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { User } from '../entity/user-entity'

export class UserRepository implements AddUserRepository {
  async add ({ name, phone }: AddUserModel) {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(User)
    const newUser = new User()
    newUser.name = name
    newUser.phone = phone
    await repository.save(newUser)
    return await repository.findOne(newUser)
  }
}
