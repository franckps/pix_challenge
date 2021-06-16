import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest } from '../../presentation/protocols/http'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: { ...req.body, ...req.params }
    }

    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode) {
      res.status(httpResponse.statusCode)
        .json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode)
        .json({
          error: httpResponse.body.message
        })
    }
  }
}
