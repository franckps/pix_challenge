import request from 'supertest'
import app from '../../config/app'
import { TypeormPostgresHelper } from '../../../infra/db/typeorm-postgres/helpers/typeorm-postgres-helper'
import { User } from '../../../infra/db/typeorm-postgres/entity/user-entity'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await TypeormPostgresHelper.connect()
  })

  afterAll(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(User)
    const allUsers = await repository.find()
    await repository.remove(allUsers)
    await TypeormPostgresHelper.disconnect()
  })

  beforeEach(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(User)
    const allUsers = await repository.find()
    await repository.remove(allUsers)
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
