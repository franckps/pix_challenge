import { Connection, createConnection } from 'typeorm'

export const TypeormPostgresHelper = {
  connection: null as Connection,
  url: null as string,

  async connect (url): Promise<void> {
    this.url = url
    this.connection = await createConnection({
      type: 'postgres',
      url
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
