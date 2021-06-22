import { FindPixKeyByKey } from '../../../domain/usecases/find-pix-key-by-key'
import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class NotExistsPixKeyValidation implements Validation {
  private readonly fieldName: string
  private readonly findPixKeyByKey: FindPixKeyByKey
  constructor (fieldName: string, findPixKeyByKey: FindPixKeyByKey) {
    this.fieldName = fieldName
    this.findPixKeyByKey = findPixKeyByKey
  }

  async validate (input: any): Promise<Error> {
    try {
      const pixKey = await this.findPixKeyByKey.find(input[this.fieldName])
      if (pixKey) {
        return new InvalidParamError(this.fieldName)
      }
    } catch (error) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
