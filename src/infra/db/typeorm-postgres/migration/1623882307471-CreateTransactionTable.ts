import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTransactionTable1623882307471 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(new Table({
      name: 'transaction',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'amount',
          type: 'numeric'
        },
        {
          name: 'debitorId',
          type: 'uuid'
        },
        {
          name: 'creditorId',
          type: 'uuid'
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transaction')
  }
}
