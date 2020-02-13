class ValidationError extends Error {
    public readonly errors: Error[]

    public constructor(errors: Error[]) {
        super('Validation failed')
        this.errors = errors
    }
}

export default ValidationError
