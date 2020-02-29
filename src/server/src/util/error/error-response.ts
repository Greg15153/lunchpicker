import ErrorCode from './error-codes'

export interface InnerError {
    trace?: string[] | string | undefined
    context?: object | undefined
}

export interface ErrorDetails {
    code: string
    message: string
    target: string
}

export interface HttpError {
    code: ErrorCode
    message: string
    target: string
    details: ErrorDetails[]
    innerError?: InnerError | undefined
}

export interface ErrorResponse {
    error: HttpError
}

export default ErrorResponse
