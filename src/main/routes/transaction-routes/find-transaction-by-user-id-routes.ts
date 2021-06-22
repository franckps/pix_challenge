import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeFindTransactionByUserIdController } from '../../factories/transaction/find-transaction-by-user-id'

export default (router: Router): void => {
  router.get('/user/:id/transaction', adaptRoute(makeFindTransactionByUserIdController()))
}
