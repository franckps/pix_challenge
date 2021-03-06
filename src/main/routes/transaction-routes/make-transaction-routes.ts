import { Router } from 'express'
import { makeMakeTransactionController } from '../../factories/transaction/make-transaction'
import { adaptRoute } from '../../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/user/:debitorId/pix', adaptRoute(makeMakeTransactionController()))
}
