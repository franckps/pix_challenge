import { TransactionModel } from '../../domain/transaction-model'

export interface AddTRansactionModel{
    value: number
    debitorId: string
    creditorId: string
}

export interface AddTransactionRepository{
    add (addTRansactionModel: AddTRansactionModel): Promise<TransactionModel>
}
