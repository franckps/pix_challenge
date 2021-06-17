import { UserModel } from './user-model'

export interface PixKeyModel{
    id: string
    key: string
    userId?: string
    user?: UserModel
}
