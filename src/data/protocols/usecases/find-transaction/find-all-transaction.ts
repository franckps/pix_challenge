import { TransactionModel } from '../../../../domain/transaction-model'
import { FindAllTransaction } from '../../../../domain/usecases/find-all-transaction'
import { FindTransactionRepository } from '../../find-transaction-repository'

export class DBFindAllTransaction implements FindAllTransaction {
    private readonly findTransactionRepository: FindTransactionRepository
    constructor (findTransactionRepository: FindTransactionRepository) {
      this.findTransactionRepository = findTransactionRepository
    }

    async find (): Promise<TransactionModel[]> {
      return await this.findTransactionRepository.find()
    }
}
