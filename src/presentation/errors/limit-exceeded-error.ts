export class LimitExceededError extends Error {
  constructor (limit: number, resource: string = 'resource') {
    super(`Max '${resource}' limit '${limit}' exceeded`)
    this.name = 'LimitExceededException'
  }
}
