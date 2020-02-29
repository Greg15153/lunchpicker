import { IncomingMessage, ServerResponse } from 'http'

import { Injectable, NestMiddleware, Scope } from '@nestjs/common'
import { getRequestIdFromHeaders } from 'src/util/http/header-helpers'

import LoggerService from './logger-service'

interface FastifyRequest extends IncomingMessage {
    id: number
    ip: string
}

@Injectable({ scope: Scope.REQUEST })
class LoggerMiddleware<TRequest, TResponse> implements NestMiddleware {
    public constructor(private readonly logger: LoggerService) {}

    async use(req: FastifyRequest, res: ServerResponse, next: Function): Promise<void> {
        const start = new Date().getTime()
        const msg = {
            url: req.url,
            method: req.method,
            id: req.id,
            ip: req.ip,
            traceId: getRequestIdFromHeaders(req.headers)
        }
        this.logger.log(JSON.stringify(msg))

        await next()
        this.logger.log(
            JSON.stringify({
                ...msg,
                status: res.statusCode || req.statusCode,
                elapsed: new Date().getTime() - start
            })
        )
    }
}

export default LoggerMiddleware
