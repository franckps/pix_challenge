import { AddTransactionRepository } from '../../../../data/protocols/add-transaction-repository'
import { AddTransactionModel } from '../../../../domain/usecases/add-transaction'
import { Transaction } from '../entity/transaction-entity'
import { TypeormPostgresHelper } from '../helpers/typeorm-postgres-helper'
import { User } from '../entity/user-entity'
import { PixKey } from '../entity/pix-key-entity'

export class TransactionRepository implements AddTransactionRepository {
  async add ({ amount, debitorId, pixKey }: AddTransactionModel) {
    const connection = await TypeormPostgresHelper.getConnection()
    const userRepository = connection.getRepository(User)
    const pixKeyRepository = connection.getRepository(PixKey)
    const creditorId = (await pixKeyRepository.findOne({ key: pixKey })).userId
    const debitor = await userRepository.findOne({ id: debitorId })
    const creditor = await userRepository.findOne({ id: creditorId })
    const repository = connection.getRepository(Transaction)
    const newTransaction = new Transaction()
    newTransaction.amount = amount
    newTransaction.debitor = debitor
    newTransaction.creditor = creditor
    const creationTransactionData = (await repository
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values(newTransaction)
      .returning('*')
      .execute()).raw[0]
    return creationTransactionData
  }
}
