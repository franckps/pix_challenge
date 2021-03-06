import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePixKeysTable1623810192250 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(new Table({
      name: 'pix_key',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'key',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'userId',
          type: 'uuid'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pixKey')
  }
}
