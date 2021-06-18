import { AddPixKey, AddPixKeyModel } from '../../../domain/usecases/add-pix-key'
import { PixKeyModel } from '../../../domain/pix-key-model'
import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http/http-helper'
import { AddPixKeyController } from './add-pix-key'

interface SutTypes{
    sut: AddPixKeyController
}

const makeSut = (): SutTypes => {
  class AddPixKeyStub implements AddPixKey {
    async add (addPixKeyModel: AddPixKeyModel): Promise<PixKeyModel> {
      return Promise.resolve({
        id: 'any_id',
        key: 'any_key'
      })
    }
  }
  const addPixKeyStub = new AddPixKeyStub()
  const sut = new AddPixKeyController(addPixKeyStub)
  return { sut }
}

describe('Add Pix Key Controller', () => {
  test('Should return 400 Error if no key is provide', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('key')))
  })

  test('Should return 400 Error if no id is provide', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        key: 'any_key'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

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
