import env from '../../../../main/config/env'
import { User } from '../entity/user-entity'
import { PixKey } from '../entity/pix-key-entity'
import { Transaction } from '../entity/transaction-entity'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { TransactionRepository } from './transaction-repository'
import { UserRepository } from '../user-repository/user-repository'
import { PixKeyRepository } from '../pix-key-repository/pix-key-repository'

describe('Typeorm Postgres Transaction Repository', () => {
  beforeAll(async () => {
    await TypeormPostgresHelper.connect(env.dbURL)
  })

  afterAll(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(Transaction)
    const transactionKeys = await repository.find()
    await repository.remove(transactionKeys)

    const pixKeyRepository = connection.getRepository(PixKey)
    const allPixKeys = await pixKeyRepository.find()
    await pixKeyRepository.remove(allPixKeys)

    const userRepository = connection.getRepository(User)
    const allUsers = await userRepository.find()
    await userRepository.remove(allUsers)
    await TypeormPostgresHelper.disconnect()
  })

  beforeEach(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(Transaction)
    const transactionKeys = await repository.find()
    await repository.remove(transactionKeys)

    const pixKeyRepository = connection.getRepository(PixKey)
    const allPixKeys = await pixKeyRepository.find()
    await pixKeyRepository.remove(allPixKeys)

    const userRepository = connection.getRepository(User)
    const allUsers = await userRepository.find()
    await userRepository.remove(allUsers)
  })

  const makeSut = (): TransactionRepository => {
    return new TransactionRepository()
  }

  const makeUserRepository = (): UserRepository => {
    return new UserRepository()
  }

  const makePixKeyRepository = (): PixKeyRepository => {
    return new PixKeyRepository()
  }

  const getAValidUserId = async (): Promise<string> => {
    const aUserData = await makeUserRepository().add({
      name: 'any_name',
      phone: 'any_phone'
    })

    return aUserData.id
  }

  const getAnInvalidDebitorId = async (): Promise<string> => {
    const aUserData = await makeUserRepository().add({
      name: 'other_name',
      phone: 'other_phone'
    })
    const connection = await TypeormPostgresHelper.getConnection()
    const userRepository = connection.getRepository(User)
    await userRepository.delete({ id: aUserData.id })

    return aUserData.id
  }

  const getAValidDebitorId = async (): Promise<string> => {
    const aUserData = await makeUserRepository().add({
      name: 'other_name',
      phone: 'other_phone'
    })

    return aUserData.id
  }

  const getAnInvalidPixKey = async (): Promise<string> => {
    return Promise.resolve('invalid_pix_key')
  }

  const getAValidPixKey = async (): Promise<string> => {
    const validUserId = await getAValidUserId()
    const pixKeyRepository = makePixKeyRepository()
    const newPixKeyData = await pixKeyRepository.add({
      userId: validUserId,
      key: 'any_key'
    })

    return newPixKeyData.key
  }

  test('Should throw an error if Pix key is not valid', async () => {
    const invalidPixKey = await getAnInvalidPixKey()
    const validDebitorId = await getAValidDebitorId()
    const sut = makeSut()
    const promise = sut.add({
      pixKey: invalidPixKey,
      debitorId: validDebitorId,
      amount: 150
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should throw an error if Debitor id is not valid', async () => {
    const validPixKey = await getAValidPixKey()
    const invalidDebitorId = await getAnInvalidDebitorId()
    const sut = makeSut()
    const promise = sut.add({
      pixKey: validPixKey,
      debitorId: invalidDebitorId,
      amount: 150
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should return new transaction data on add success', async () => {
    const validPixKey = await getAValidPixKey()
    const validDebitorId = await getAValidDebitorId()
    const sut = makeSut()
    const newTransactionData = await sut.add({
      pixKey: validPixKey,
      debitorId: validDebitorId,
      amount: 150
    })
    expect(newTransactionData.amount).toBe('150')
    expect(newTransactionData.debitorId).toBe(validDebitorId)
  })
})
