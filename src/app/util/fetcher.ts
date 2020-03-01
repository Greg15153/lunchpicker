import ky from 'ky-universal'
import { v4 as uuid } from 'uuid'

const api = ky.create({
    prefixUrl: 'http://localhost:5000',
    retry: 0,
    timeout: false,
    hooks: {
        beforeRequest: [
            (request): Request => {
                request.headers.set('x-request-id', uuid())
                request.headers.set('Accept', 'application/json')
                return request
            }
        ]
    }
})

export const get = api.get
export const post = api.post
