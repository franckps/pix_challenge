import { UserModel } from '../user-model'

export interface AddUserByPixKey {
    find (pixKey: string): Promise<UserModel>
}
