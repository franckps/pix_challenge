import { UserModel } from './user-model'

export interface TransactionModel{
    id: string
    amount: number
    debitorId?: string
    creditorId?: string
    createdAt: string
    debitor?: UserModel
    creditor?: UserModel
}
