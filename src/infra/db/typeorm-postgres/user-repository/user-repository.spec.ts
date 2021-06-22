import { UserModel } from '../../../../domain/user-model'
import { User } from '../entity/user-entity'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { UserRepository } from './user-repository'

describe('Typeorm Postgres User Repository', () => {
  beforeAll(async () => {
    await TypeormPostgresHelper.connect()
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

  const addUser = async (): Promise<UserModel> => {
    const sut = makeSut()
    return await sut.add({
      name: 'any_name',
      phone: 'any_phone'
    })
  }

  test('Should return a user on add success', async () => {
    const addUserData = await addUser()
    expect(addUserData.name).toEqual('any_name')
    expect(addUserData.phone).toEqual('any_phone')
  })

  test('Should return a user list on find', async () => {
    await addUser()
    const sut = makeSut()
    const allUserData = await sut.find()
    expect(allUserData[0].name).toEqual('any_name')
    expect(allUserData[0].phone).toEqual('any_phone')
  })
})
