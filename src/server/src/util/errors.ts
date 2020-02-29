export class ValidationError<T> extends Error {
    stack?: string
    attemptedValue: T | undefined

    public constructor(msg: string, attemptedValue: T | undefined) {
        super(msg)
        this.attemptedValue = attemptedValue
    }
}

export class RequiredStringError extends ValidationError<string> {
    public constructor(name: string) {
        super(`${name} cannot be empty or null`, undefined)
    }
}
