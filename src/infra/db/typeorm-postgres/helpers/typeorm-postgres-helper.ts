import { Connection, createConnection } from 'typeorm'
import { User } from '../entity/user-entity'
import { PixKey } from '../entity/pix-key-entity'

export const TypeormPostgresHelper = {
  connection: null as Connection,
  url: null as string,
  entities: [User, PixKey],

  async connect (url): Promise<void> {
    this.url = url
    this.connection = await createConnection({
      type: 'postgres',
      url: this.url,
      entities: this.entities
    })
  },

  async disconnect (): Promise<void> {
    await this.connection.disconnect()
    this.connection = null
  },

  async getConnection (): Promise<Connection> {
    if (!this.connection) { await this.connect(this.config) }
    return this.connection
  }
}
