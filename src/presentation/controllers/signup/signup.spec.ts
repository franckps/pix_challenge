import { AddUser, AddUserModel } from '../../../domain/usecases/add-user'
import { UserModel } from '../../../domain/user-model'
import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http/http-helper'
import { SignUpController } from './signup'

interface SutTypes{
    sut: SignUpController
}

const makeSut = (): SutTypes => {
  class AddUserStub implements AddUser {
    async add (addUserModel: AddUserModel): Promise<UserModel> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        phone: '0123456789'
      })
    }
  }
  const addUserStub = new AddUserStub()
  const sut = new SignUpController(addUserStub)
  return { sut }
}

describe('SignUpController', () => {
  test('Should return 400 Error if no name is provide', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        phone: '0133466789'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 Error if no phone is provide', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('phone')))
  })

  test('Should return 200 if succeeds', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        phone: '0133466789'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      name: 'any_name',
      phone: '0123456789'
    }))
  })
})
