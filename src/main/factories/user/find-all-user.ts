import { DBFindAllUser } from '../../../data/protocols/usecases/find-user/find-all-user'
import { UserRepository } from '../../../infra/db/typeorm-postgres/user-repository/user-repository'
import { FindAllUserController } from '../../../presentation/controllers/find-user/find-all-user'
import { Controller } from '../../../presentation/protocols/controller'

export const makeFindAllUserController = (): Controller => {
  const findAllUserRepository = new UserRepository()
  const dbFindAllUser = new DBFindAllUser(findAllUserRepository)
  return new FindAllUserController(dbFindAllUser)
}
