import { TransactionModel } from '../transaction-model'

export interface FindAllTransaction {
    find (): Promise<TransactionModel[]>
}
