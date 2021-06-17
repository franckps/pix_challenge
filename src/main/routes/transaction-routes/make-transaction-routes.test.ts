import request from 'supertest'
import app from '../../config/app'
import { TypeormPostgresHelper } from '../../../infra/db/typeorm-postgres/helpers/typeorm-postgres-helper'
import env from '../../config/env'
import { PixKey } from '../../../infra/db/typeorm-postgres/entity/pix-key-entity'

describe('Transaction Routes', () => {
  beforeAll(async () => {
    await TypeormPostgresHelper.connect(env.dbURL)
  })

  afterAll(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(PixKey)
    const addPixKeys = await repository.find()
    await repository.remove(addPixKeys)
    await TypeormPostgresHelper.disconnect()
  })

  beforeEach(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(PixKey)
    const addPixKeys = await repository.find()
    await repository.remove(addPixKeys)
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
