import { UserModel } from '../../domain/user-model'

export interface AddUserModel{
    name: string
    phone: string
}

export interface AddUserRepository{
    add (addUserModel: AddUserModel): Promise<UserModel>
}
