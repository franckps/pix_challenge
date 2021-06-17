import { AddTransaction, AddTransactionModel } from '../../../../domain/usecases/add-transaction'
import { TransactionModel } from '../../../../domain/transaction-model'
import { AddTransactionRepository } from '../../add-transaction-repository'

export class DBAddTransaction implements AddTransaction {
    private readonly addTransactionRepository: AddTransactionRepository
    constructor (addTransactionRepository: AddTransactionRepository) {
      this.addTransactionRepository = addTransactionRepository
    }

    async add (addTransactionModel: AddTransactionModel): Promise<TransactionModel> {
      return await this.addTransactionRepository.add(addTransactionModel)
    }
}
