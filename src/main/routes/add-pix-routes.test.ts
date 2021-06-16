import request from 'supertest'
import app from '../config/app'
import { TypeormPostgresHelper } from '../../infra/db/typeorm-postgres/helpers/typeorm-postgres-helper'
import env from '../config/env'
import { PixKey } from '../../infra/db/typeorm-postgres/entity/pix-key-entity'

describe('SignUp Routes', () => {
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

  test('Should returns a pix key on success', async () => {
    const userData = await request(app)
      .post('/api/signup')
      .send({
        name: 'Francisco',
        phone: '89 994353697'
      })

    const httpResponse = await request(app)
      .post(`/api/${userData.body.id}/pix`)
      .send({
        key: '89 994353697'
      })

    expect(httpResponse.body.key).toBe('89 994353697')
  })
})
