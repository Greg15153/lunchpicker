import { Injectable, NestMiddleware, Scope } from '@nestjs/common'

import LoggerService from './logger-service'

Injectable({ scope: Scope.REQUEST })
class LoggerMiddleware<TRequest, TResponse> implements NestMiddleware {
    public constructor(private readonly logger: LoggerService) {}

    use(req: Request, res: Response, next: Function): void {
        const msg = {
            url: req.url,
            headers: req.headers,
            method: req.method
        }
        this.logger.log(JSON.stringify(msg))
        next()
        this.logger.log(JSON.stringify({ ...msg, status: res.status }))
    }
}

export default LoggerMiddleware
