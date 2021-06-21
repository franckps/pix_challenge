import { FindAllUser } from '../../../domain/usecases/find-all-user'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class FindAllUserController implements Controller {
    private readonly findAllUser: FindAllUser
    constructor (findAllUser: FindAllUser) {
      this.findAllUser = findAllUser
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const userData = await this.findAllUser.find()
        return ok(userData)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
}
