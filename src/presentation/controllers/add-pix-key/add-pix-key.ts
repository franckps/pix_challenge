import { AddPixKey } from '../../../domain/usecases/add-pix-key'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class AddPixKeyController implements Controller {
    private readonly addPixKey: AddPixKey
    private readonly validation: Validation
    constructor (addPixKey: AddPixKey, validation: Validation) {
      this.addPixKey = addPixKey
      this.validation = validation
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const error = await this.validation.validate(httpRequest.body)
        if (error) {
          return badRequest(error)
        }

        const { key, id } = httpRequest.body
        const newPixKeyData = await this.addPixKey.add({ key, userId: id })
        return ok(newPixKeyData)
      } catch (error) {
        return serverError(error)
      }
    }
}
