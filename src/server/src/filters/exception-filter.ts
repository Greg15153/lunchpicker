import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Environment, getEnvironment } from 'src/app-config'
import LoggerService from 'src/modules/logging/logger-service'
import ErrorCode from 'src/util/error/error-codes'
import ErrorResponse, { InnerError } from 'src/util/error/error-response'
import { getRequestId } from 'src/util/http/header-helpers'
import { v4 as uuid } from 'uuid'

@Catch()
class AllExceptionsFilter implements ExceptionFilter {
    private readonly environment: Environment
    private readonly logger: LoggerService

    public constructor(logger: LoggerService) {
        this.environment = getEnvironment()
        this.logger = logger
    }

    catch(exception: Error, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response: FastifyReply<Response> = ctx.getResponse()
        const request: FastifyRequest<Request> = ctx.getRequest()

        const httpException = exception instanceof HttpException ? exception : undefined
        const status = httpException ? httpException.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const context = {
            id: uuid(),
            traceId: getRequestId(request.headers),
            path: request.req.url
        }

        const innerError: InnerError =
            this.environment !== Environment.Production
                ? {
                      trace: exception.stack,
                      context
                  }
                : {
                      context
                  }

        const errorResponse: ErrorResponse = {
            error: {
                code: httpException ? ErrorCode.HttpException : ErrorCode.Service,
                message: httpException ? httpException.message : 'Unhandled exception has occured',
                target: request.req.url,
                details: [],
                innerError
            }
        }

        this.logger.error(JSON.stringify(errorResponse))

        response.code(status).send(errorResponse)
    }
}

export default AllExceptionsFilter
