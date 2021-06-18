import { AddPixKey } from '../../../domain/usecases/add-pix-key'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddPixKeyController implements Controller {
    private readonly addPixKey: AddPixKey
    constructor (addPixKey: AddPixKey) {
      this.addPixKey = addPixKey
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const { key, id } = httpRequest.body
        if (!key) { return badRequest(new MissingParamError('key')) }
        if (!id) { return badRequest(new MissingParamError('id')) }
        const newPixKeyData = await this.addPixKey.add({ key, userId: id })
        return ok(newPixKeyData)
      } catch (error) {
        return serverError(error)
      }
    }
}
