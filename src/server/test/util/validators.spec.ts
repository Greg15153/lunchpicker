import { RequiredStringError } from '../../src/util/error/errors'
import { isRequiredString } from '../../src/util/validators'

describe('isRequiredString', () => {
    test('ok', () => {
        const expectedValue = 'NonEmptyString'
        const result = isRequiredString('OkTest', expectedValue)

        expect(result.isOk).toBeTruthy()
        expect(result.value).toBe(expectedValue)
    })

    test.each([undefined, '', null, '     '])('error', str => {
        const result = isRequiredString('ErrorTest', str)

        expect(result.isErr).toBeTruthy()
        expect(result.error).toBeInstanceOf(RequiredStringError)
        expect(result.error.attemptedValue).toBe(str)
    })
})
