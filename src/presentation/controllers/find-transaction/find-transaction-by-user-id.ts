import { FindTransactionByUserId } from '../../../domain/usecases/find-transaction-by-user-id'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class FindTransactionByUserIdController implements Controller {
    private readonly findTransactionByUserId: FindTransactionByUserId
    private readonly validation: Validation
    constructor (findTransactionByUserId: FindTransactionByUserId, validation: Validation) {
      this.findTransactionByUserId = findTransactionByUserId
      this.validation = validation
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const error = await this.validation.validate(httpRequest.body)
        if (error) {
          return badRequest(error)
        }

        const { id: userId } = httpRequest.body
        const transactionData = await this.findTransactionByUserId.find(userId)
        return ok(transactionData)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
}
