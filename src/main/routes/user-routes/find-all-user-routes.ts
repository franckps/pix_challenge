import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeFindAllUserController } from '../../factories/user/find-all-user'

export default (router: Router): void => {
  router.get('/user/', adaptRoute(makeFindAllUserController()))
}
