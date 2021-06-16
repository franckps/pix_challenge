import { Router } from 'express'
import { makeAddPixKeyController } from '../factories/pix-key/add-pix-key'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/:id/pix', adaptRoute(makeAddPixKeyController()))
}
