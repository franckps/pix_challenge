import { FindPixKeyByUserId } from '../../../domain/usecases/find-pix-key-by-user-id'
import { InvalidParamError } from '../../errors'
import { LimitExceededError } from '../../errors/limit-exceeded-error'
import { Validation } from '../../protocols/validation'

export class MaxPixKeyPerUserValidation implements Validation {
  private readonly fieldName: string
  private readonly maxSize: number
  private readonly findPixKeyByUserId: FindPixKeyByUserId
  constructor (fieldName: string, maxSize: number, findPixKeyByUserId: FindPixKeyByUserId) {
    this.fieldName = fieldName
    this.maxSize = maxSize
    this.findPixKeyByUserId = findPixKeyByUserId
  }

  async validate (input: any): Promise<Error> {
    try {
      const pixKeys = await this.findPixKeyByUserId.find(input[this.fieldName])
      console.log(pixKeys)
      if (pixKeys.length >= this.maxSize) {
        return new LimitExceededError(this.maxSize, 'pix keys')
      }
    } catch (error) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
