import { UserModel } from './user-model'

export interface PixKeyModel{
    id: 'uuid'
    key: string
    userId?: 'uuid'
    user?: UserModel
}
