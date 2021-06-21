import { AddUser } from '../../../domain/usecases/add-user'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
    private readonly addUser: AddUser
    private readonly validation: Validation
    constructor (addUser: AddUser, validation: Validation) {
      this.addUser = addUser
      this.validation = validation
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const error = await this.validation.validate(httpRequest.body)
        if (error) {
          return badRequest(error)
        }

        const { name, phone } = httpRequest.body
        if (!name) { return badRequest(new MissingParamError('name')) }
        if (!phone) { return badRequest(new MissingParamError('phone')) }
        const newUserData = await this.addUser.add({ name, phone })
        return ok(newUserData)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
}
