import { UserModel } from '../../domain/user-model'
import { AddUserModel } from '../../domain/usecases/add-user'

export interface AddUserRepository{
    add (addUserModel: AddUserModel): Promise<UserModel>
}
