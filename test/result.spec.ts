import { Ok, Err } from '../src/util/result'

describe('ok', () => {
    test('void', () => {
        const result = new Ok()

        expect(result.isOk).toBeTruthy()
        expect(result.isErr).toBeFalsy()
        expect(result.value).toBeUndefined()
        expect(result.error).toBeUndefined()
    })

    test('object', () => {
        const s = 'Everything is awesome'
        const result = new Ok<string, Error>(s)

        expect(result.isOk).toBeTruthy()
        expect(result.isErr).toBeFalsy()
        expect(result.value).toEqual(s)
        expect(result.error).toBeUndefined()
    })
})

describe('fail', () => {
    test('void', () => {
        const error = new Error('Failed')
        const result = new Err(error)

        expect(result.isOk).toBeFalsy()
        expect(result.isErr).toBeTruthy()
        expect(result.value).toBeUndefined()
        expect(result.error).toEqual(error)
    })

    test('object', () => {
        const error = new Error('Failed')
        const result = new Err<string, Error>(error)

        expect(result.isOk).toBeFalsy()
        expect(result.isErr).toBeTruthy()
        expect(result.value).toBeUndefined()
        expect(result.error).toEqual(error)
    })
})
