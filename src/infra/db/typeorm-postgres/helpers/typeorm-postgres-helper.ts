import { Connection, createConnection } from 'typeorm'
import { User } from '../entity/user-entity'
import { PixKey } from '../entity/pix-key-entity'
import { Transaction } from '../entity/transaction-entity'

export const TypeormPostgresHelper = {
  connection: null as Connection,
  url: null as string,
  entities: [User, PixKey, Transaction],

  async connect (url?: string): Promise<void> {
    this.url = url
    this.connection = url
      ? await createConnection({
        type: 'postgres',
        url: this.url,
        entities: this.entities
      })
      : await createConnection()
  },

  async disconnect (): Promise<void> {
    await this.connection.disconnect()
    this.connection = null
  },

  async getConnection (): Promise<Connection> {
    if (!this.connection) { await this.connect(this.url) }
    return this.connection
  }
}
