import { UserModel } from '../user-model'

export interface FindAllUser {
    find (): Promise<UserModel[]>
}
