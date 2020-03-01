import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import fastify from 'fastify'

import { AppModule } from './app-module'
import ExceptionFilter from './filters/exception-filter'
import LoggerService from './modules/logging/logger-service'
import { customheaders } from './util/http/header-helpers'

const logger = new LoggerService()
logger.setContext('Main')
;(async (): Promise<void> => {
    const serverOptions: fastify.ServerOptionsAsHttp = {
        ignoreTrailingSlash: true,
        requestIdHeader: customheaders.requestId
    }
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(serverOptions), {
        logger: process.env.NODE_ENV?.toLowerCase() === 'development'
    })

    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, X-Request-Id'
    })

    app.useLogger(logger)
    app.useGlobalFilters(new ExceptionFilter(logger))

    app.listen(5000, '0.0.0.0', async () => {
        logger.log('Ready on http://localhost:5000')
    })
})().catch(ex => {
    logger.error(ex)
})
