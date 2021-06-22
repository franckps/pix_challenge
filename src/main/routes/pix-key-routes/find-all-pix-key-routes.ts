import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeFindAllPixKeyController } from '../../factories/pix-key/find-all-pix-key'

export default (router: Router): void => {
  router.get('/pix-key', adaptRoute(makeFindAllPixKeyController()))
}
