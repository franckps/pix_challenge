import { AddUser, AddUserModel } from '../../../domain/usecases/add-user'
import { UserModel } from '../../../domain/user-model'
import { ok } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
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
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Error> {
      return Promise.resolve(null)
    }
  }
  const addUserStub = new AddUserStub()
  const validationStub = new ValidationStub()
  const sut = new SignUpController(addUserStub, validationStub)
  return { sut }
}

describe('SignUpController', () => {
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
