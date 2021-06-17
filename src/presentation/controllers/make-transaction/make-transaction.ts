import { AddTransaction } from '../../../domain/usecases/add-transaction'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddTransactionController implements Controller {
    private readonly addTransaction: AddTransaction
    constructor (addTransaction: AddTransaction) {
      this.addTransaction = addTransaction
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const { amount, id: debitorId, pixKey } = httpRequest.body
        const newTransactionData = await this.addTransaction.add({ amount, debitorId, pixKey })
        return ok(newTransactionData)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
}
