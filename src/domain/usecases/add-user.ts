import { UserModel } from '../user-model'

export interface AddUserModel{
    name: string
    phone: string
}

export interface AddUser {
    add (addUserModel: AddUserModel): Promise<UserModel>
}
