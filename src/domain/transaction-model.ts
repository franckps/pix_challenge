import { UserModel } from './user-model'

export interface TransactionModel{
    id: 'uuid'
    amount: number
    debitorId?: 'uuid'
    creditorId?: 'uuid'
    createdAt: string
    debitor?: UserModel
    creditor?: UserModel
}
