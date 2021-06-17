import { DBAddTransaction } from '../../../data/protocols/usecases/add-transaction/db-add-transaction'
import { TransactionRepository } from '../../../infra/db/typeorm-postgres/transaction-repository/transaction-repository'
import { AddTransactionController } from '../../../presentation/controllers/make-transaction/make-transaction'
import { Controller } from '../../../presentation/protocols/controller'

export const makeMakeTransactionController = (): Controller => {
  const addTransactionRepository = new TransactionRepository()
  const dbAddTransaction = new DBAddTransaction(addTransactionRepository)
  return new AddTransactionController(dbAddTransaction)
}
