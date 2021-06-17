import { TransactionModel } from '../../domain/transaction-model'
import { AddTransactionModel } from '../../domain/usecases/add-transaction'

export interface AddTransactionRepository{
    add (addTRansactionModel: AddTransactionModel): Promise<TransactionModel>
}
