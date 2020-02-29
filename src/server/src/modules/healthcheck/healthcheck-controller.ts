import { Controller, Get } from '@nestjs/common'

import HealthCheckService from './healthcheck-service'

@Controller()
class HealthCheckController {
    public constructor(private readonly healthCheckService: HealthCheckService) {}

    @Get('healthcheck')
    async getHealthCheck(): Promise<boolean> {
        return this.healthCheckService.healthcheck()
    }
}

export default HealthCheckController
