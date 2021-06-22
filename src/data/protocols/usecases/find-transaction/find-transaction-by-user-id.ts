import { TransactionModel } from '../../../../domain/transaction-model'
import { FindTransactionByUserId } from '../../../../domain/usecases/find-transaction-by-user-id'
import { FindTransactionRepository } from '../../find-transaction-repository'

export class DBFindTransactionByUserId implements FindTransactionByUserId {
    private readonly findTransactionRepository: FindTransactionRepository
    constructor (findTransactionRepository: FindTransactionRepository) {
      this.findTransactionRepository = findTransactionRepository
    }

    async find (userId: 'uuid'): Promise<TransactionModel[]> {
      return await this.findTransactionRepository.find({
        where: [
          { debitorId: userId },
          { creditorId: userId }
        ]
      })
    }
}
