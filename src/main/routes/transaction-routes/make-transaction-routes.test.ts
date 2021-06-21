import request from 'supertest'
import app from '../../config/app'
import { TypeormPostgresHelper } from '../../../infra/db/typeorm-postgres/helpers/typeorm-postgres-helper'
import { PixKey } from '../../../infra/db/typeorm-postgres/entity/pix-key-entity'
import { User } from '../../../infra/db/typeorm-postgres/entity/user-entity'
import { Transaction } from '../../../infra/db/typeorm-postgres/entity/transaction-entity'

describe('Transaction Routes', () => {
  beforeAll(async () => {
    await TypeormPostgresHelper.connect()
  })

  afterAll(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(Transaction)
    const transactionKeys = await repository.find()
    await repository.remove(transactionKeys)

    const pixKeyRepository = connection.getRepository(PixKey)
    const allPixKeys = await pixKeyRepository.find()
    await pixKeyRepository.remove(allPixKeys)

    const userRepository = connection.getRepository(User)
    const allUsers = await userRepository.find()
    await userRepository.remove(allUsers)
    await TypeormPostgresHelper.disconnect()
  })

  beforeEach(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(Transaction)
    const transactionKeys = await repository.find()
    await repository.remove(transactionKeys)
  })

  test('Should returns a transaction on success', async () => {
    const firstUserData = await request(app)
      .post('/api/signup')
      .send({
        name: 'First User',
        phone: '0123456789'
      })

    const secondUserData = await request(app)
      .post('/api/signup')
      .send({
        name: 'Second User',
        phone: '9876543210'
      })

    const firstUserPixData = await request(app)
      .post(`/api/${firstUserData.body.id}/pix-key`)
      .send({
        key: '0123456789'
      })

    const httpResponse = await request(app)
      .post(`/api/${secondUserData.body.id}/pix`)
      .send({
        pixKey: firstUserPixData.body.key,
        amount: 150
      })

    expect(httpResponse.body).toHaveProperty('id')
    expect(httpResponse.body).toHaveProperty('amount')
    expect(httpResponse.body).toHaveProperty('creditorId')
    expect(httpResponse.body).toHaveProperty('debitorId')
  })
})
