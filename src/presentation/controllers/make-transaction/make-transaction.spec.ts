import { AddTransaction, AddTransactionModel } from '../../../domain/usecases/add-transaction'
import { TransactionModel } from '../../../domain/transaction-model'
import { ok } from '../../helpers/http/http-helper'
import { MakeTransactionController } from './make-transaction'
import { Validation } from '../../protocols/validation'

interface SutTypes{
    sut: MakeTransactionController
}

const makeSut = (): SutTypes => {
  class AddTransactionStub implements AddTransaction {
    async add (addTransactionModel: AddTransactionModel): Promise<TransactionModel> {
      return Promise.resolve({
        id: 'any_id' as 'uuid',
        amount: 150,
        creditorId: 'any_id' as 'uuid',
        debitorId: 'other_id' as 'uuid',
        createdAt: 'any_timestamp'
      })
    }
  }
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Error> {
      return Promise.resolve(null)
    }
  }
  const addTransactionStub = new AddTransactionStub()
  const validationStub = new ValidationStub()
  const sut = new MakeTransactionController(addTransactionStub, validationStub)
  return { sut }
}

describe('Make Transaction Controller', () => {
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
