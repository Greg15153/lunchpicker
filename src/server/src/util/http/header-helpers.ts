import { IncomingHttpHeaders } from 'http'

import { v4 as uuid } from 'uuid'

export const customheaders = {
    requestId: 'x-request-id'
}

export function getRequestId(headers: { [k: string]: unknown }): string {
    return (headers[customheaders.requestId] as string) ?? uuid()
}

export function getRequestIdFromHeaders(headers: IncomingHttpHeaders): string {
    return (headers[customheaders.requestId] as string) ?? uuid()
}
