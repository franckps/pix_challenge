import { AddTransaction } from '../../../domain/usecases/add-transaction'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class MakeTransactionController implements Controller {
    private readonly addTransaction: AddTransaction
    private readonly validation: Validation
    constructor (addTransaction: AddTransaction, validation: Validation) {
      this.addTransaction = addTransaction
      this.validation = validation
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const error = await this.validation.validate(httpRequest.body)
        if (error) {
          return badRequest(error)
        }

        const { amount, debitorId, pixKey } = httpRequest.body
        const newTransactionData = await this.addTransaction.add({ amount, debitorId, pixKey })
        return ok(newTransactionData)
      } catch (error) {
        return serverError(error)
      }
    }
}
