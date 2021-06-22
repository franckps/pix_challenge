import { TransactionModel } from '../transaction-model'

export interface FindTransactionByUserId {
    find (userId: 'uuid'): Promise<TransactionModel[]>
}
