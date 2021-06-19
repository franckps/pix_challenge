export class LimitExceededError extends Error {
  constructor (limit: string, resource: string = 'resource') {
    super(`Max '${resource}' limit '${limit}' exceeded limit`)
    this.name = 'LimitExceededError'
  }
}
