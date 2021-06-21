import { UserModel } from '../../domain/user-model'

export interface FindUserModel{
    id?: string
    name?: string
    phone?: string
}

export interface FindUserRepository{
    find (findUserModel: FindUserModel): Promise<UserModel[]>
}
