import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database-module'
import HealthCheckController from './healthcheck-controller'
import HealthCheckService from './healthcheck-service'

@Module({
    imports: [DatabaseModule],
    controllers: [HealthCheckController],
    providers: [HealthCheckService]
})
export default class HealthCheckModule {}
