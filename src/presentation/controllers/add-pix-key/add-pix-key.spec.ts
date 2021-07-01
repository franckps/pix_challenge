import { AddPixKey, AddPixKeyModel } from '../../../domain/usecases/add-pix-key'
import { PixKeyModel } from '../../../domain/pix-key-model'
import { ok } from '../../helpers/http/http-helper'
import { AddPixKeyController } from './add-pix-key'
import { Validation } from '../../protocols/validation'

interface SutTypes{
    sut: AddPixKeyController
}

const makeSut = (): SutTypes => {
  class AddPixKeyStub implements AddPixKey {
    async add (addPixKeyModel: AddPixKeyModel): Promise<PixKeyModel> {
      return Promise.resolve({
        id: 'any_id' as 'uuid',
        key: 'any_key'
      })
    }
  }
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Error> {
      return Promise.resolve(null)
    }
  }
  const addPixKeyStub = new AddPixKeyStub()
  const validationStub = new ValidationStub()
  const sut = new AddPixKeyController(addPixKeyStub, validationStub)
  return { sut }
}

describe('Add Pix Key Controller', () => {
  test('Should return 200 if succeeds', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'any_id',
        key: 'any_key'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      key: 'any_key'
    }))
  })
})
