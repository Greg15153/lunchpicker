interface BaseResult<T, E> {
    isOk: boolean
    isErr: boolean
    value?: T
    error?: E
}

export class Ok<T, E> implements BaseResult<T, E> {
    public readonly isOk: boolean
    public readonly isErr: boolean
    public readonly error?: E | undefined
    public readonly value: T | undefined

    constructor(v?: T) {
        this.isOk = true
        this.isErr = false
        this.error = undefined
        this.value = v
    }
}

export class Err<T, E> implements BaseResult<T, E> {
    public readonly isOk: boolean
    public readonly isErr: boolean
    public readonly error?: E
    public readonly value: T | undefined

    constructor(error: E) {
        this.isOk = false
        this.isErr = true
        this.error = error
        this.value = undefined
    }
}

type Result<T, E> = Ok<T, E> | Err<T, E>

export default Result
