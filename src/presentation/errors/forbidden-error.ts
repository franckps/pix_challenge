export class ForbiddenError extends Error {
  constructor (message: string = 'Operation not permitted') {
    super('Operation not permitted')
    this.name = 'ForbiddenError'
  }
}
