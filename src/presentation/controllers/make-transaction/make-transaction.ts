import { AddTransaction } from '../../../domain/usecases/add-transaction'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class MakeTransactionController implements Controller {
    private readonly addTransaction: AddTransaction
    constructor (addTransaction: AddTransaction) {
      this.addTransaction = addTransaction
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const { amount, debitorId, pixKey } = httpRequest.body
        if (!amount) { return badRequest(new MissingParamError('amount')) }
        if (!debitorId) { return badRequest(new MissingParamError('debitorId')) }
        if (!pixKey) { return badRequest(new MissingParamError('pixKey')) }
        const newTransactionData = await this.addTransaction.add({ amount, debitorId, pixKey })
        return ok(newTransactionData)
      } catch (error) {
        return serverError(error)
      }
    }
}
