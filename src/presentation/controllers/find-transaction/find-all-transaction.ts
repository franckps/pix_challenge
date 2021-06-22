import { FindAllTransaction } from '../../../domain/usecases/find-all-transaction'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class FindAllTransactionController implements Controller {
    private readonly findAllTransaction: FindAllTransaction
    constructor (findAllTransaction: FindAllTransaction) {
      this.findAllTransaction = findAllTransaction
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const transactionData = await this.findAllTransaction.find()
        return ok(transactionData)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
}
