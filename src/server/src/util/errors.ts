export class ValidationError<T> extends Error {
    name: string
    message: string
    stack?: string
    attemptedValue: T

    public constructor(msg: string, attemptedValue: T) {
        super(msg)
        this.attemptedValue = attemptedValue
    }
}

export class RequiredStringError extends ValidationError<string> {
    public constructor(name: string) {
        super(`${name} cannot be empty or null`, undefined)
    }
}
