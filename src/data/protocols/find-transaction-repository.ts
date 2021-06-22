import { TransactionModel } from '../../domain/transaction-model'

export interface FindTransactionModel{
    id?: 'uuid'
    amount?: number
    debitorId?: 'uuid'
    creditorId?: 'uuid'
    createdAt?: string,
    where?: FindTransactionModel[]
}

export interface FindTransactionRepository{
    find (findTransactionModel?: FindTransactionModel): Promise<TransactionModel[]>
}
