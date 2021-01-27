export class ValidationError extends Error {
  errors: any
  constructor(message, errors) {
    super(message)
    
    this.name = "ValidationError"
    this.errors = errors
  }
}
