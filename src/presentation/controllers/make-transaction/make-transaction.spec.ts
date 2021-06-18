import { AddTransaction, AddTransactionModel } from '../../../domain/usecases/add-transaction'
import { TransactionModel } from '../../../domain/transaction-model'
import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http/http-helper'
import { MakeTransactionController } from './make-transaction'

interface SutTypes{
    sut: MakeTransactionController
}

const makeSut = (): SutTypes => {
  class AddTransactionStub implements AddTransaction {
    async add (addTransactionModel: AddTransactionModel): Promise<TransactionModel> {
      return Promise.resolve({
        id: 'any_id',
        amount: 150,
        creditorId: 'any_id',
        debitorId: 'other_id',
        createdAt: 'any_timestamp'
      })
    }
  }
  const addTransactionStub = new AddTransactionStub()
  const sut = new MakeTransactionController(addTransactionStub)
  return { sut }
}

describe('Make Transaction Controller', () => {
  test('Should return 400 Error if no debitorId is provide', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        amount: 150,
        pixKey: 'any_key'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('debitorId')))
  })

  test('Should return 400 Error if no amount is provide', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        debitorId: 'any_id',
        pixKey: 'any_key'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('amount')))
  })

  test('Should return 400 Error if no pikKey is provide', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        amount: 150,
        debitorId: 'any_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('pixKey')))
  })

  test('Should return 200 if succeeds', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        amount: 150,
        debitorId: 'any_id',
        pixKey: 'any_key'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      amount: 150,
      creditorId: 'any_id',
      debitorId: 'other_id',
      createdAt: 'any_timestamp'
    }))
  })
})
