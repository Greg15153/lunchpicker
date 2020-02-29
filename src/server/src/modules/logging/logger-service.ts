import { Injectable, LoggerService as NestLoggerService, Scope } from '@nestjs/common'
import winston, { Logger as WinstonLogger, createLogger } from 'winston'

@Injectable({ scope: Scope.REQUEST })
class LoggerService implements NestLoggerService {
    private logger: WinstonLogger
    private context: string | undefined

    public constructor() {
        this.logger = createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.metadata(),
                winston.format.colorize(),
                winston.format.simple()
            ),
            transports: [new winston.transports.Console()]
        })
    }

    log(message: string, context?: string): void {
        this.logger.info(message, { context: context || this.context })
    }
    exception(error: Error, context?: string): void {
        this.logger.error(error.message, error.stack, { context: context || this.context })
    }
    error(message: string, trace?: string, context?: string): void {
        this.logger.error(message, trace, { context: context || this.context })
    }
    warn(message: string, context?: string): void {
        this.logger.warn(message, { context: context || this.context })
    }
    debug?(message: string, context?: string): void {
        this.logger.debug(message, { context: context || this.context })
    }
    verbose?(message: string, context?: string): void {
        this.logger.verbose(message, { context: context || this.context })
    }

    setContext(context: string): void {
        this.context = context
    }
}

export default LoggerService
