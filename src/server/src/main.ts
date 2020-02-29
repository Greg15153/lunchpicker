import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import LoggerService from 'src/modules/logging/logger-service'

import { AppModule } from './app-module'

;(async (): Promise<void> => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: process.env.NODE_ENV?.toLowerCase() === 'development'
    })

    const logger = await app.resolve(LoggerService)
    logger.setContext('Main')
    app.useLogger(logger)

    const port = 3001

    app.listen(port, async () => {
        logger.log(`Ready on http://localhost:${port}`)
    })
})().catch(ex => {
    console.log(ex)
})
