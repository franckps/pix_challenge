import env from '../../../../main/config/env'
import { User } from '../entity/user-entity'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { UserRepository } from './user-repository'

describe('Typeorm Postgres User Repository', () => {
  beforeAll(async () => {
    await TypeormPostgresHelper.connect(env.dbURL)
  })

  afterAll(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(User)
    const allUsers = await repository.find()
    await repository.remove(allUsers)
    await TypeormPostgresHelper.disconnect()
  })

  beforeEach(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(User)
    const allUsers = await repository.find()
    await repository.remove(allUsers)
  })

  const makeSut = (): UserRepository => {
    return new UserRepository()
  }

  test('Should return a user on add success', async () => {
    const sut = makeSut()
    const addUserData = await sut.add({
      name: 'any_name',
      phone: 'any_phone'
    })
    expect(addUserData.name).toEqual('any_name')
    expect(addUserData.phone).toEqual('any_phone')
  })
})
