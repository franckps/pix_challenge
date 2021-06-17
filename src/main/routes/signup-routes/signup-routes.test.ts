import request from 'supertest'
import app from '../../config/app'
import { TypeormPostgresHelper } from '../../../infra/db/typeorm-postgres/helpers/typeorm-postgres-helper'
import env from '../../config/env'
import { User } from '../../../infra/db/typeorm-postgres/entity/user-entity'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await TypeormPostgresHelper.connect(env.dbURL)
  })

  afterAll(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(User)
    const addUsers = await repository.find()
    await repository.remove(addUsers)
    await TypeormPostgresHelper.disconnect()
  })

  beforeEach(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(User)
    const addUsers = await repository.find()
    await repository.remove(addUsers)
  })

  test('Should returns an account on success', async () => {
    const httpResponse = await request(app)
      .post('/api/signup')
      .send({
        name: 'Francisco',
        phone: '89 994353697'
      })

    expect(httpResponse.body).toHaveProperty('id')
  })
})
