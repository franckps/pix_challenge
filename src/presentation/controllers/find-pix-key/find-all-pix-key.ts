import { FindAllPixKey } from '../../../domain/usecases/find-all-pix-key'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class FindAllPixKeyController implements Controller {
    private readonly findAllPixKey: FindAllPixKey
    constructor (findAllPixKey: FindAllPixKey) {
      this.findAllPixKey = findAllPixKey
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const pixData = await this.findAllPixKey.find()
        return ok(pixData)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
}
