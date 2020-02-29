import { IncomingHttpHeaders } from 'http'

import { getRequestId, getRequestIdFromHeaders } from '../../src/util/http/header-helpers'

describe('getRequestId', () => {
    test('gets set value', () => {
        const expectedValue = 'Custom Header ID'
        const headers = {
            'authorization': 'Junk',
            'x-request-id': expectedValue
        }

        const result = getRequestId(headers)

        expect(result).toBe(expectedValue)
    })

    test('creates value if not set', () => {
        const headers = {
            authorization: 'Junk'
        }

        const result = getRequestId(headers)

        expect(result).toBeDefined()
    })
})

describe('getRequestIdFromheaders', () => {
    test('gets set value', () => {
        const expectedValue = 'Custom Header ID'
        const headers: IncomingHttpHeaders = {
            'authorization': 'Junk',
            'x-request-id': expectedValue
        }

        const result = getRequestIdFromHeaders(headers)

        expect(result).toBe(expectedValue)
    })

    test('creates value if not set', () => {
        const headers: IncomingHttpHeaders = {
            authorization: 'Junk'
        }

        const result = getRequestIdFromHeaders(headers)

        expect(result).toBeDefined()
    })
})
