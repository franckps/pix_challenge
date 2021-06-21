import { UserModel } from '../../domain/user-model'

export interface FindUserModel{
    id?: 'uuid'
    name?: string
    phone?: string
}

export interface FindUserRepository{
    find (findUserModel?: FindUserModel): Promise<UserModel[]>
}
