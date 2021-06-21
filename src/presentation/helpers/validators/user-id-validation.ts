import { FindUserById } from '../../../domain/usecases/find-user-by-id'
import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class UserIdValidation implements Validation {
  private readonly fieldName: string
  private readonly findUserById: FindUserById
  constructor (fieldName: string, findUserById: FindUserById) {
    this.fieldName = fieldName
    this.findUserById = findUserById
  }

  async validate (input: any): Promise<Error> {
    try {
      const user = await this.findUserById.find(input[this.fieldName])
      if (!user) {
        return new InvalidParamError(this.fieldName)
      }
    } catch (error) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
