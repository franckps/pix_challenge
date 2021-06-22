import { DBFindAllTransaction } from '../../../data/protocols/usecases/find-transaction/find-all-transaction'
import { TransactionRepository } from '../../../infra/db/typeorm-postgres/transaction-repository/transaction-repository'
import { FindAllTransactionController } from '../../../presentation/controllers/find-transaction/find-all-transaction'
import { Controller } from '../../../presentation/protocols/controller'

export const makeFindAllTransactionController = (): Controller => {
  const findAllTransactionRepository = new TransactionRepository()
  const dbFindAllTransaction = new DBFindAllTransaction(findAllTransactionRepository)
  return new FindAllTransactionController(dbFindAllTransaction)
}
