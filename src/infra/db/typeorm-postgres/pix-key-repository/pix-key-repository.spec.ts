import { User } from '../entity/user-entity'
import { PixKey } from '../entity/pix-key-entity'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { PixKeyRepository } from './pix-key-repository'
import { UserRepository } from '../user-repository/user-repository'
import { PixKeyModel } from '../../../../domain/pix-key-model'

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

  const getAValidUserId = async (): Promise<'uuid'> => {
    const aUserData = await makeUserRepository().add({
      name: 'any_name',
      phone: 'any_phone'
    })

    return aUserData.id
  }

  const addPixKey = async (): Promise<['uuid', PixKeyModel]> => {
    const validUserId = await getAValidUserId()
    const sut = makeSut()
    return [validUserId, (await sut.add({
      userId: validUserId,
      key: 'any_key'
    }))]
  }

  test('Should return new pix key data on add success', async () => {
    const [validUserId, newPixKeyData] = await addPixKey()
    expect(newPixKeyData.key).toBe('any_key')
    expect(newPixKeyData.userId).toBe(validUserId)
  })

  test('Should return new pix key data list on find', async () => {
    const [validUserId] = await addPixKey()
    const sut = makeSut()
    const allPixKeyData = await sut.find()
    expect(allPixKeyData[0].key).toBe('any_key')
    expect(allPixKeyData[0].userId).toBe(validUserId)
  })
})
