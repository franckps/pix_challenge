import request from 'supertest'
import app from '../../config/app'
import { TypeormPostgresHelper } from '../../../infra/db/typeorm-postgres/helpers/typeorm-postgres-helper'
import { User } from '../../../infra/db/typeorm-postgres/entity/user-entity'
import { PixKey } from '../../../infra/db/typeorm-postgres/entity/pix-key-entity'

describe('Add Pix Key Routes', () => {
  beforeAll(async () => {
    await TypeormPostgresHelper.connect()
  })

  afterAll(async () => {
    const connection = await TypeormPostgresHelper.getConnection()
    const repository = connection.getRepository(PixKey)
    const addPixKeys = await repository.find()
    await repository.remove(addPixKeys)
    await TypeormPostgresHelper.disconnect()

    const userRepository = connection.getRepository(User)
    const allUsers = await userRepository.find()
    await userRepository.remove(allUsers)
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
      .post(`/api/user/${userData.body.id}/pix-key`)
      .send({
        key: '89 994353697'
      })

    expect(httpResponse.body.key).toBe('89 994353697')
  })
})
