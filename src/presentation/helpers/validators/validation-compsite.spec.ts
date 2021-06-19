import { MissingParamError } from '../../errors'
import { Validation } from '../../protocols/validation'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
    sut: ValidationComposite,
    validationStubs: Validation[]
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Error> {
      return Promise.resolve(null)
    }
  }

  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('field')))
    const error = await sut.validate({ field: 'any_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one validation fails', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(Promise.resolve(new Error()))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('field')))
    const error = await sut.validate({ field: 'any_field' })
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeeds', async () => {
    const { sut } = makeSut()
    const error = await sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
