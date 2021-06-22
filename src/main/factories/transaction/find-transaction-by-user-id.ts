import { DBFindTransactionByUserId } from '../../../data/protocols/usecases/find-transaction/find-transaction-by-user-id'
import { TransactionRepository } from '../../../infra/db/typeorm-postgres/transaction-repository/transaction-repository'
import { FindTransactionByUserIdController } from '../../../presentation/controllers/find-transaction/find-transaction-by-user-id'
import { Controller } from '../../../presentation/protocols/controller'
import { makeFindTransactionByUserIdValidation } from './find-transaction-by-user-id-validation'

export const makeFindTransactionByUserIdController = (): Controller => {
  const findTransactionByUserIdRepository = new TransactionRepository()
  const dbFindTransactionByUserId = new DBFindTransactionByUserId(findTransactionByUserIdRepository)
  return new FindTransactionByUserIdController(dbFindTransactionByUserId, makeFindTransactionByUserIdValidation())
}
