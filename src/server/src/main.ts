import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import fastify from 'fastify'

import { AppModule } from './app-module'
import LoggerService from './modules/logging/logger-service'

const logger = new LoggerService()
logger.setContext('Main')
;(async (): Promise<void> => {
    const serverOptions: fastify.ServerOptionsAsHttp = {
        ignoreTrailingSlash: true,
        requestIdHeader: 'X-Request-Id'
    }
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(serverOptions), {
        logger: process.env.NODE_ENV?.toLowerCase() === 'development'
    })
    app.useLogger(logger)

    app.listen(3000, '0.0.0.0', async () => {
        logger.log('Ready on http://localhost:3000')
    })
})().catch(ex => {
    logger.error(ex)
})
