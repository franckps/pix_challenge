import { AddUser } from '../../../domain/usecases/add-user'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class SignUpController implements Controller {
    private readonly addUser: AddUser
    constructor (addUser: AddUser) {
      this.addUser = addUser
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const { name, phone } = httpRequest.body
        if (!name) { return badRequest(new MissingParamError('name')) }
        if (!phone) { return badRequest(new MissingParamError('phone')) }
        const newUserData = await this.addUser.add({ name, phone })
        return ok(newUserData)
      } catch (error) {
        return serverError(error)
      }
    }
}
