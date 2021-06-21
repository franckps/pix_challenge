import { User } from '../entity/user-entity'
import { PixKey } from '../entity/pix-key-entity'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { PixKeyRepository } from './pix-key-repository'
import { UserRepository } from '../user-repository/user-repository'

describe('Typeorm Postgres Pix Key Repository', () => {
  beforeAll(async () => {
    await TypeormPostgresHelper.connect()
  })

  afterAll(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(PixKey)
    const addPixKeys = await repository.find()
    await repository.remove(addPixKeys)

    const userRepository = connection.getRepository(User)
    const allUsers = await userRepository.find()
    await userRepository.remove(allUsers)
    await TypeormPostgresHelper.disconnect()
  })

  beforeEach(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(PixKey)
    const addPixKeys = await repository.find()
    await repository.remove(addPixKeys)

    const userRepository = connection.getRepository(User)
    const allUsers = await userRepository.find()
    await userRepository.remove(allUsers)
  })

  const makeSut = (): PixKeyRepository => {
    return new PixKeyRepository()
  }

  const makeUserRepository = (): UserRepository => {
    return new UserRepository()
  }

  const getAnInvalidUserId = async (): Promise<string> => {
    const aUserData = await makeUserRepository().add({
      name: 'any_name',
      phone: 'any_phone'
    })
    const connection = await TypeormPostgresHelper.getConnection()
    const userRepository = connection.getRepository(User)
    await userRepository.delete({ id: aUserData.id })

    return aUserData.id
  }

  const getAValidUserId = async (): Promise<string> => {
    const aUserData = await makeUserRepository().add({
      name: 'any_name',
      phone: 'any_phone'
    })

    return aUserData.id
  }

  test('Should throw an error if User id is not valid', async () => {
    const invalidUserId = await getAnInvalidUserId()
    const sut = makeSut()
    const promise = sut.add({
      userId: invalidUserId,
      key: 'any_key'
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should return new pix key data on add success', async () => {
    const validUserId = await getAValidUserId()
    const sut = makeSut()
    const newPixKeyData = await sut.add({
      userId: validUserId,
      key: 'any_key'
    })
    expect(newPixKeyData.key).toBe('any_key')
    expect(newPixKeyData.userId).toBe(validUserId)
  })
})
