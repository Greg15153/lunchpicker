import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import register from '@react-ssr/nestjs-express/register'
import LoggerService from 'modules/logging/logger-service'

import { AppModule } from './app-module'

;(async (): Promise<void> => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: process.env.NODE_ENV?.toLowerCase() === 'development'
    })

    const logger = await app.resolve(LoggerService)
    logger.setContext('Main')
    app.useLogger(logger)

    // register `.tsx` as a view template engine
    await register(app)

    app.listen(3000, async () => {
        logger.log('Ready on http://localhost:3000')
    })
})().catch(ex => {
    console.log(ex)
})
