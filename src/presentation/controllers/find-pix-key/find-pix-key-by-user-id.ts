import { FindPixKeyByUserId } from '../../../domain/usecases/find-pix-key-by-user-id'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class FindPixKeyByUserIdController implements Controller {
    private readonly findPixKeyByUserId: FindPixKeyByUserId
    private readonly validation: Validation
    constructor (findPixKeyByUserId: FindPixKeyByUserId, validation: Validation) {
      this.findPixKeyByUserId = findPixKeyByUserId
      this.validation = validation
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const error = await this.validation.validate(httpRequest.body)
        if (error) {
          return badRequest(error)
        }

        const { id: userId } = httpRequest.body
        const pixData = await this.findPixKeyByUserId.find(userId)
        return ok(pixData)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
}
