import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeFindAllTransactionController } from '../../factories/transaction/find-all-transaction'

export default (router: Router): void => {
  router.get('/transaction', adaptRoute(makeFindAllTransactionController()))
}
