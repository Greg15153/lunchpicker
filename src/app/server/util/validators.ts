import Result, { Err, Ok } from './result'
import { RequiredStringError } from './errors'

export function isRequiredString(name: string, s: string): Result<string, RequiredStringError> {
    if (!s || s === undefined || s.trim() === '') {
        return new Err(new RequiredStringError(name))
    }

    return new Ok(s)
}
