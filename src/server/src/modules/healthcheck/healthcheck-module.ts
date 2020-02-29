import { Module } from '@nestjs/common'
import { CacheModule } from '../cache/cache-module'

import { DatabaseModule } from '../database/database-module'
import HealthCheckController from './healthcheck-controller'
import HealthCheckService from './healthcheck-service'

@Module({
    imports: [DatabaseModule, CacheModule],
    controllers: [HealthCheckController],
    providers: [HealthCheckService]
})
export default class HealthCheckModule {}
