import { AddUserModel, AddUserRepository } from '../../../../data/protocols/add-user-repository'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { User } from './user-entity'

export class UserRepository implements AddUserRepository {
  async add ({ name, phone }: AddUserModel) {
    const newUser = new User()
    newUser.id = 'any_id'
    newUser.name = 'Francisco Pereira'
    newUser.phone = '(89) 99435-3697'
    const connection = await TypeormPostgresHelper.getConnection()
    const result = await connection.manager.save(newUser)
    console.log('Result: ', { result })
    return Promise.resolve(result)
  }
}
