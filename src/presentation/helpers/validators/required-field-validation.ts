import { MissingParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string
  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  async validate (input: any): Promise<Error> {
    if (!input[this.fieldName]) {
      return Promise.resolve(new MissingParamError(this.fieldName))
    }
  }
}
