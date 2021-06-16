import { DBAddUser } from '../../../data/protocols/usecases/add-user/db-add-user'
import { UserRepository } from '../../../infra/db/typeorm-postgres/user-repository/user-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols/controller'

export const makeSignUpController = (): Controller => {
  const addUserRepository = new UserRepository()
  const dbAddUser = new DBAddUser(addUserRepository)
  return new SignUpController(dbAddUser)
}
