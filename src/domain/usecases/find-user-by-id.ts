import { UserModel } from '../user-model'

export interface FindUserById {
    find (id: string): Promise<UserModel>
}
