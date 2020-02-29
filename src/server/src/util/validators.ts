import { RequiredStringError } from './error/errors'
import Result, { Err, Ok } from './result'

export function isRequiredString(name: string, s: string): Result<string, RequiredStringError> {
    if (!s || s === undefined || s.trim() === '') {
        return new Err(new RequiredStringError(name, s))
    }

    return new Ok(s)
}
