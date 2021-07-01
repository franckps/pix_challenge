import { TransactionModel } from '../../../../domain/transaction-model'
import { AddTransactionModel } from '../../../../domain/usecases/add-transaction'
import { AddTransactionRepository } from '../../add-transaction-repository'
import { DBAddTransaction } from './db-add-transaction'

describe('DbAddTransaction', () => {
  test('Should call AddTransactionRepository with correct values', () => {
    class AddTransactionRepositoryStub implements AddTransactionRepository {
      async add (addTRansactionModel: AddTransactionModel): Promise<TransactionModel> {
        return Promise.resolve(null)
      }
    }
    const addTransactionRepositoryStub = new AddTransactionRepositoryStub()
    const sut = new DBAddTransaction(addTransactionRepositoryStub)
    const spyAdd = jest.spyOn(addTransactionRepositoryStub, 'add')
    const addTransactionData = {
      amount: 150,
      debitorId: 'any_id' as 'uuid',
      pixKey: 'any_pix_key'
    }
    sut.add(addTransactionData)
    expect(spyAdd).toBeCalledWith(addTransactionData)
  })
})
