import { UserModel } from '../user-model'

export interface FindUserById {
    find (id: 'uuid'): Promise<UserModel>
}
