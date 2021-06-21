import { FindPixKeyByKey } from '../../../domain/usecases/find-pix-key-by-key'
import { InvalidParamError } from '../../errors'
import { ForbiddenError } from '../../errors/forbidden-error'
import { Validation } from '../../protocols/validation'

export class IsPixKeyOfOtherUserValidation implements Validation {
  private readonly fieldName: string
  private readonly otherFieldName: string
  private readonly findPixKeyByKey: FindPixKeyByKey
  constructor (fieldName: string, otherFieldName: string, findPixKeyByKey: FindPixKeyByKey) {
    this.fieldName = fieldName
    this.otherFieldName = otherFieldName
    this.findPixKeyByKey = findPixKeyByKey
  }

  async validate (input: any): Promise<Error> {
    try {
      const pixKey = await this.findPixKeyByKey.find(input[this.fieldName])
      if (pixKey?.userId === input[this.otherFieldName]) {
        return new ForbiddenError()
      }
    } catch (error) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
