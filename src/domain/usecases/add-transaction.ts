import { TransactionModel } from '../transaction-model'

export interface AddTransactionModel{
    amount: number
    debitorId: 'uuid'
    pixKey: string
}

export interface AddTransaction {
    add (addTransactionModel: AddTransactionModel): Promise<TransactionModel>
}
