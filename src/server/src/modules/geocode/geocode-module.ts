import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import GeocodeController from './geocode-controller'
import GeocodeService from './geocode-service'
import locationIqConfig from './locationiq-config'

@Module({
    imports: [ConfigModule.forFeature(locationIqConfig)],
    controllers: [GeocodeController],
    providers: [GeocodeService],
    exports: []
})
export class GeocodeModule {}
