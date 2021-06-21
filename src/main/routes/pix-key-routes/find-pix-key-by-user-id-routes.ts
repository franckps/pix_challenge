import { Router } from 'express'
import { makeFindPixKeyByUserIdController } from '../../factories/pix-key/find-pix-key-by-user-id'
import { adaptRoute } from '../../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/user/:id/pix-key', adaptRoute(makeFindPixKeyByUserIdController()))
}
