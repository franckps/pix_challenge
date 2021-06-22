import { User } from '../entity/user-entity'
import { PixKey } from '../entity/pix-key-entity'
import { Transaction } from '../entity/transaction-entity'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { TransactionRepository } from './transaction-repository'
import { UserRepository } from '../user-repository/user-repository'
import { PixKeyRepository } from '../pix-key-repository/pix-key-repository'
import { TransactionModel } from '../../../../domain/transaction-model'

describe('Typeorm Postgres Transaction Repository', () => {
  beforeAll(async () => {
    await TypeormPostgresHelper.connect()
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

  const getAValidUserId = async (): Promise<'uuid'> => {
    const aUserData = await makeUserRepository().add({
      name: 'any_name',
      phone: 'any_phone'
    })

    return aUserData.id
  }

  const getAValidDebitorId = async (): Promise<'uuid'> => {
    const aUserData = await makeUserRepository().add({
      name: 'other_name',
      phone: 'other_phone'
    })

    return aUserData.id
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

  const addTransaction = async (): Promise<['uuid', TransactionModel]> => {
    const validPixKey = await getAValidPixKey()
    const validDebitorId = await getAValidDebitorId()
    const sut = makeSut()
    return [validDebitorId, (await sut.add({
      pixKey: validPixKey,
      debitorId: validDebitorId,
      amount: 150
    }))]
  }

  test('Should return new transaction data on add success', async () => {
    const [validDebitorId, newTransactionData] = await addTransaction()
    expect(newTransactionData.amount).toBe(150)
    expect(newTransactionData.debitorId).toBe(validDebitorId)
  })

  test('Should return a transaction list on find', async () => {
    const [validDebitorId] = await addTransaction()
    const sut = makeSut()
    const allTransactionData = await sut.find()
    expect(allTransactionData[0].amount).toBe(150)
    expect(allTransactionData[0].debitorId).toBe(validDebitorId)
  })
})
