import { PixKeyModel } from './pix-key-model'
import { TransactionModel } from './transaction-model'

export interface UserModel{
    id: 'uuid'
    name: string
    phone: string
    debitorTransactions?: TransactionModel[];
    creditorTransactions?: TransactionModel[];
    pixKeys?: PixKeyModel[];
}
